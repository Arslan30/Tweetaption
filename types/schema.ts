import { z } from "zod";
import { TweetSchema } from "./constants";

export const RenderRequest = z.object({
  id: z.string(),
  tweetId: z.string(),
});

export const ProgressRequest = z.object({
  bucketName: z.string(),
  id: z.string(),
});

export type ProgressResponse =
  | {
      type: "error";
      message: string;
    }
  | {
      type: "progress";
      progress: number;
    }
  | {
      type: "done";
      url: string;
      size: number;
    };

    export const FetchTweetRequest = z.object({
      tweetId: z.string(),
    });

    export type FetchTweetResponse = z.infer<typeof TweetSchema>