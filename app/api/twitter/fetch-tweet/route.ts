import { assert } from "console";
import { executeApi } from "../../../../helpers/api-response";
import { FetchTweetRequest, FetchTweetResponse } from "../../../../types/schema";
import { getTweetById } from "./getTweetById";

export const POST = executeApi<FetchTweetResponse, typeof FetchTweetRequest>(
  FetchTweetRequest,
  async (req, body) => {
    console.log(`🔍 Fetching tweet ${body.tweetId}...`)

    const tweet = await getTweetById(body.tweetId)

    assert(tweet.media![0].type === "video", "Tweet must have a video media type.")

    console.log(`✅ Successfully fetched tweet ${body.tweetId}!`)

    return tweet;
  }
);
