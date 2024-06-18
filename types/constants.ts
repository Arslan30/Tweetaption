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
    poster: z.string().url(),
    download_url: z.string().url(),
  })),
  likes: z.number(),
  quotes: z.number(),
  retweets: z.number(),
  replies: z.number(),
  datetime: z.string(), // You might want to use z.date() if you plan to convert strings to Date objects
  index: z.number()
});

export type TweetDefinitelyExists = {
  tweet: z.infer<typeof TweetSchema>
}


export const CompositionProps = z.object({
  tweet: TweetSchema.nullable()
});

export const defaultMainProps: z.infer<typeof CompositionProps> = {
  tweet: {
    "id": "1800884147705315751",
    "nameHtml": "Imran Khan",
    "handler": "@ImranKhanPTI",
    "avatarUrl": "https://pbs.twimg.com/profile_images/1548735070030204929/SE6zZzFV.jpg",
    "textHtml": "عمران خان صاحب نے علامہ اقبال کا یہ پیغام دوبارہ قوم تک پہنچانے کا کہا ہے:\n“ہے جرم ضعیفی کی سزا مرگ مفاجات” <a href=\"https://twitter.com/ImranKhanPTI/status/1800884147705315751/video/1\">pic.twitter.com/ullT4N77Nf</a>",
    "verified": true,
    "url": "https://twitter.com/ImranKhanPTI/status/1800884147705315751",
    "photos": [],
    "videos": [
        {
            "poster": "https://pbs.twimg.com/amplify_video_thumb/1800884084370993152/img/EnpLom96qv8Ef1Za.jpg",
            "download_url": "https://video.twimg.com/amplify_video/1800884084370993152/vid/avc1/1080x1080/kS1Ce-q3QJFf0PA1.mp4?tag=16"
        }
    ],
    "likes": 42145,
    "quotes": 0,
    "retweets": 21092,
    "replies": 0,
    "datetime": "2024-06-12T13:33:34.000Z",
    "index": 0
}
};

export const DEFAULT_DURATION_IN_FRAMES = 150;
export const DEFAULT_VIDEO_WIDTH = 1080;
export const DEFAULT_VIDEO_HEIGHT = 1400;
export const VIDEO_FPS = 30;
export const OUTRO_DURATION_IN_FRAMES = 1 * VIDEO_FPS;