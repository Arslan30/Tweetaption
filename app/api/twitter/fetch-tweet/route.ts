import { z } from "zod";
import { executeApi } from "../../../../helpers/api-response";
import { TweetSchema } from "../../../../types/constants";
import { FetchTweetRequest, FetchTweetResponse } from "../../../../types/schema";
import { parse } from 'node-html-parser';

export const POST = executeApi<FetchTweetResponse, typeof FetchTweetRequest>(
  FetchTweetRequest,
  async (req, body) => {
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

    if (tweetApiResponse.tweetApiResponse || tweetApiResponse.length === 0) {
      throw new Error("Couldn't find tweet, maybe it got deleted?")
    }

    const tweet = tweetApiResponse[0] as z.infer<typeof TweetSchema>


    if (tweet.videos.length > 0) {
      await fetch("https://twitsave.com/info?url=" + tweet.url).then(response => response.text()).then(text => {
        const virtualDoc = parse(text)

        virtualDoc.querySelectorAll("tbody > tr").forEach(row => {
          row.querySelectorAll("ul > li:first-child a").forEach((a, i) => {
            tweet.videos[i].download_url = a.getAttribute("href") as string
          })
        })
      })
    }

    return tweet;
  }
);
