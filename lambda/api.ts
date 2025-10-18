import { z } from "zod";
import type { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import {
  FetchTweetRequest,
  FetchTweetResponse,
  ProgressRequest,
  ProgressResponse,
  RenderRequest,
} from "../types/schema";
import { ApiResponse } from "../helpers/api-response";

const makeRequest = async <Res>(
  endpoint: string,
  body: unknown,
): Promise<Res> => {
  const result = await fetch(endpoint, {
    method: "post",
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
    },
  });
  const json = (await result.json()) as ApiResponse<Res>;
  if (json.type === "error") {
    throw new Error(json.message);
  }

  return json.data;
};

export const renderVideo = async ({
  id,
  tweetId,
  renderSettings
}: z.infer<typeof RenderRequest>) => {
  return makeRequest<RenderMediaOnLambdaOutput>("/api/lambda/render", {
    id,
    tweetId,
    renderSettings
  });
};

export const getProgress = async ({
  id,
  bucketName,
}: z.infer<typeof ProgressRequest>) => {
  return makeRequest<ProgressResponse>("/api/lambda/progress", {
    id,
    bucketName
  });
};

export const fetchTweet = async ({tweetId}: z.infer<typeof FetchTweetRequest>) => {
  return makeRequest<FetchTweetResponse>("/api/twitter/fetch-tweet", {
    tweetId
  });
}

