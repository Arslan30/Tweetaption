import { executeApi } from "../../../../helpers/api-response";
import { FetchTweetRequest, FetchTweetResponse } from "../../../../types/schema";
import { getTweetById } from "./getTweetById";

export const POST = executeApi<FetchTweetResponse, typeof FetchTweetRequest>(
  FetchTweetRequest,
  async (req, body) => {
    console.log(`🔍 Fetching tweet ${body.tweetId}...`)

    const tweet = await getTweetById(body.tweetId)

    console.log(`✅ Successfully fetched tweet ${body.tweetId}!`)

    return tweet;
  }
);
