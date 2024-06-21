import { MediaVideo, getTweet } from "react-tweet/api"
import { TweetSchema } from "../../../../types/constants";
import { z } from "zod";
import parse from "node-html-parser";

export const getTweetById = async (tweetId: string) => {
  const tweetApiResponse = await fetch(`https://tweethunter.io/api/thread?tweetId=${tweetId}`, {
    method: 'GET',
    headers: {
      'referer': 'https://tweethunter.io/tweetpik',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
    }
  })
    .then(response => response.json())
    .catch(error => {
      console.error(error)
      throw error
    })

  if (tweetApiResponse.error || tweetApiResponse.length === 0) {
    throw new Error("Couldn't find tweet, maybe it got deleted?")
  }

  console.log((await getTweet(tweetApiResponse[0].id))?.entities.media)

  const tweet = tweetApiResponse[0] as z.infer<typeof TweetSchema>

  if (tweet.videos.length > 0) {
    await getTweet(tweet.id)
      .then(tweetX => {
        tweetX?.mediaDetails?.filter(media => media.type === "video").forEach((video, i) => {
          const variants = (video as MediaVideo).video_info.variants.filter(variant => variant.content_type === "video/mp4")
          const best_bitrate = Math.max(...variants.map(variant => variant.bitrate ?? 0))

          tweet.videos[i].download_url = variants.find(variant => variant.bitrate === best_bitrate)!.url
        })
      })

      const doc = parse(tweet.textHtml)
      doc.querySelectorAll('a').forEach(a => {
        if (a.getAttribute('href')!.match(/https:\/\/((twitter)|x).com\/[A-Za-z0-9_]+\/status\/[\d]+\/video\/\d/g)) {
          a.remove()
        } else {
          a.setAttribute('dir', 'auto')
        }
      })
      tweet.textHtml = doc.innerHTML.trim()
  } else {
    throw new Error("Couldn't find video in tweet.")
  }

  return tweet
}