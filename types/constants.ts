import { z } from "zod";
export const COMP_NAME = "Main";

export const TweetSchema = z.object({
  id: z.string(),
  nameHtml: z.string(),
  handler: z.string(),
  avatarUrl: z.string().url(),
  textHtml: z.string(),
  verified: z.boolean(),
  url: z.string().url(),
  photos: z.array(z.string().url()), // Assuming photos URLs are stored as strings
  videos: z.array(z.object({
    poster: z.string().url()
  })),
  likes: z.number(),
  quotes: z.number(),
  retweets: z.number(),
  replies: z.number(),
  datetime: z.string(), // You might want to use z.date() if you plan to convert strings to Date objects
  index: z.number()
});


export const CompositionProps = z.object({
  tweet: TweetSchema.nullable()
});

export const defaultMainProps: z.infer<typeof CompositionProps> = {
  tweet: null
};

export const DURATION_IN_FRAMES = 120;
export const VIDEO_WIDTH = 1280;
export const VIDEO_HEIGHT = 720;
export const VIDEO_FPS = 30;
