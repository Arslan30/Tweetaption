import { z } from "zod";
import { RenderSettingsSchema, TweetSchemaType } from "./constants";

export const RenderRequest = z.object({
  id: z.string(),
  tweetId: z.string(),
  renderSettings: RenderSettingsSchema
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

    export type FetchTweetResponse = TweetSchemaType
