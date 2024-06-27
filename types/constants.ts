import { z } from "zod";
import { TweetSchema } from "./TweetSchema";
export const COMP_NAME = "Main";

export type TweetSchemaType = z.infer<typeof TweetSchema>;

export type TweetDefinitelyExists = {
  tweet: z.infer<typeof TweetSchema>
}


export const CompositionProps = z.object({
  tweet: TweetSchema.nullable()
});

export const defaultMainProps: z.infer<typeof CompositionProps> = {
  tweet: {
    id: '1800884147705315751',
    user: {
      id_str: '122453931',
      name: 'Imran Khan',
      profile_image_url_https: 'https://pbs.twimg.com/profile_images/1548735070030204929/SE6zZzFV_normal.jpg',
      screen_name: 'ImranKhanPTI',
      verified: false,
      is_blue_verified: true,
      profile_image_shape: 'Circle'
    },
    url: 'https://twitter.com/ImranKhanPTI/status/1800884147705315751',
    textHtml: 'عمران خان صاحب نے علامہ اقبال کا یہ پیغام دوبارہ قوم تک پہنچانے کا کہا ہے:\n' +
      '“ہے جرم ضعیفی کی سزا مرگ مفاجات” https://t.co/ullT4N77Nf',
    created_at: '2024-06-12T13:33:34.000Z',
    media: [
      {
        type: 'video',
        poster: 'https://pbs.twimg.com/ext_tw_video_thumb/1801669623437303808/pu/img/hTyfL8s59g-IOokF.jpg',
        size: { height: 360, width: 638 },
        video: {
          bitrate: 832000,
          url: 'https://video.twimg.com/ext_tw_video/1801669623437303808/pu/vid/avc1/638x360/ULquA_AccQ0SPoC7.mp4?tag=12',
          duration_millis: 19904
        }
      },
      {
        type: 'video',
        poster: 'https://pbs.twimg.com/ext_tw_video_thumb/1801669633981734912/pu/img/qbwsdKcL4z42kxJq.jpg',
        size: { height: 360, width: 638 },
        video: {
          bitrate: 832000,
          url: 'https://video.twimg.com/ext_tw_video/1801669633981734912/pu/vid/avc1/638x360/1vZIcSwo2cTpAueo.mp4?tag=12',
          duration_millis: 14442
        }
      },
      {
        type: 'video',
        poster: 'https://pbs.twimg.com/ext_tw_video_thumb/1801669660775010304/pu/img/-aNdDBe2iYAEZam2.jpg',
        size: { height: 228, width: 636 },
        video: {
          bitrate: 256000,
          url: 'https://video.twimg.com/ext_tw_video/1801669660775010304/pu/vid/avc1/636x228/tvakl3PIlYwvIJxN.mp4?tag=12',
          duration_millis: 3041
        }
      }
    ],
  }
};

export const DEFAULT_DURATION_IN_FRAMES = 150;
export const DEFAULT_VIDEO_WIDTH = 1080;
export const DEFAULT_VIDEO_HEIGHT = 1400;
export const VIDEO_FPS = 30;
export const OUTRO_DURATION_IN_FRAMES = 1 * VIDEO_FPS;