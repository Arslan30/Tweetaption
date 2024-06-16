import { executeApi } from "../../../../helpers/api-response";
import { FetchTweetRequest, FetchTweetResponse } from "../../../../types/schema";

export const POST = executeApi<FetchTweetResponse, typeof FetchTweetRequest>(
  FetchTweetRequest,
  async (req, body) => {
    const tweet = await fetch(`https://tweethunter.io/api/thread?tweetId=${body.tweetId}`, {
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

    if (tweet.error || tweet.length === 0) {
      throw new Error("Couldn't find tweet, maybe it got deleted?")
    }

    return tweet[0];
  }
);
