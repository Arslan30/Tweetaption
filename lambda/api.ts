import { z } from "zod";
import type { RenderMediaOnLambdaOutput } from "@remotion/lambda/client";
import {
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
}: {
  id: string
  tweetId: string
}) => {
  const body: z.infer<typeof RenderRequest> = {
    id,
    tweetId,
  };

  return makeRequest<RenderMediaOnLambdaOutput>("/api/lambda/render", body);
};

export const getProgress = async ({
  id,
  bucketName,
}: {
  id: string;
  bucketName: string;
}) => {
  const body: z.infer<typeof ProgressRequest> = {
    id,
    bucketName,
  };

  return makeRequest<ProgressResponse>("/api/lambda/progress", body);
};

export const fetchTweet = async (tweetId: string) => {
  const body = {
    tweetId,
  };

  return makeRequest<FetchTweetResponse>("/api/twitter/fetch-tweet", body);
}