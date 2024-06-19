import { z } from "zod";
import { executeApi } from "../../../../helpers/api-response";
import { TweetSchema } from "../../../../types/constants";
import { FetchTweetRequest, FetchTweetResponse } from "../../../../types/schema";
import { MediaVideo, getTweet } from 'react-tweet/api'

export const POST = executeApi<FetchTweetResponse, typeof FetchTweetRequest>(
  FetchTweetRequest,
  async (req, body) => {
    console.log(`🔍 Fetching tweet ${body.tweetId}...`)

    const tweetApiResponse = await fetch(`https://tweethunter.io/api/thread?tweetId=${body.tweetId}`, {
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

    console.log(`✅ Successfully fetched tweet ${body.tweetId}!`)

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

      // Trim twitter video URLs from text
      tweet.textHtml = tweet.textHtml.replaceAll(/<a href="[\s\S]+\/video\/\d">[\s\S]+<\/a>/g, "").trim()
    } else {
      throw new Error("Couldn't find video in tweet.")
    }

    return tweet;
  }
);
