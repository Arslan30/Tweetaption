import { z } from 'zod';

const userSchema = z.object({
  id_str: z.string(),
  is_blue_verified: z.boolean(),
  name: z.string(),
  profile_image_shape: z.string(),
  profile_image_url_https: z.string().url(),
  screen_name: z.string(),
  verified: z.boolean(),
  verified_type: z.union([
    z.literal("Business"),
    z.literal("Government"),
  ]).optional()
});

const mediaSizeSchema = z.object({
  height: z.number(),
  width: z.number(),
});

const videoSchema = z.object({
  bitrate: z.number().nullable(),
  url: z.string().url(),
  duration_millis: z.number(),
});

export const TweetMediaIsVideo = z.object({
  type: z.literal('video'),
  poster: z.string().url(),
  size: mediaSizeSchema,
  video: videoSchema,
})

export const TweetMediaIsPhoto = z.object({
  type: z.literal('photo'),
  url: z.string().url(),
  size: mediaSizeSchema,
})

export const TweetMediaIsAnimatedGif = z.object({
  type: z.literal('animated_gif'),
  url: z.string().url(),
  size: mediaSizeSchema,
})

export const TweetMediaIsCard = z.object({
  type: z.literal('card'),
  poster: z.string().url(),
  size: mediaSizeSchema,
  title: z.string(),
  vanity_url: z.string(),
})

export const TweetMediaSchema = z.discriminatedUnion('type', [
  TweetMediaIsVideo,
  TweetMediaIsPhoto,
  TweetMediaIsAnimatedGif,
  TweetMediaIsCard,
]);

const baseTweetSchema = z.object({
  id: z.string(),
  user: userSchema, // Adjust this according to the actual user schema
  url: z.string().url(),
  textHtml: z.string(),
  created_at: z.string(), // Adjust to date type if needed
  media: z.array(TweetMediaSchema),
});

export const TweetSchema = baseTweetSchema.extend({
  parent: baseTweetSchema.optional(),
  quoted_tweet: baseTweetSchema.optional(),
})

