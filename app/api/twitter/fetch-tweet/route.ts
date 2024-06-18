import { z } from "zod";
import { executeApi } from "../../../../helpers/api-response";
import { TweetSchema } from "../../../../types/constants";
import { FetchTweetRequest, FetchTweetResponse } from "../../../../types/schema";
import { parse } from 'node-html-parser';

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
      // Load video URLs
      await fetch("https://info.tweeload.site/result/" + tweet.id, {
        method: "POST"
      })
      .then(response => response.text())
      .then(text => {
        console.log(`✅ Successfully fetched video URL ${body.tweetId}!`)
        const virtualDoc = parse(text)

        virtualDoc.querySelectorAll(".video").forEach((video, i) => {
          tweet.videos[i].download_url = video.getAttribute("video-url") ?? ""
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
