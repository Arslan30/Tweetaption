import { RenderSettingsSchemaType, TweetSchemaType } from "../types/constants";
import { TweetMediaSchema } from "../types/TweetSchema";
import { z } from "zod";

type TweetMedia = z.infer<typeof TweetMediaSchema>;

export const hasMotionMedia = (tweet: TweetSchemaType | undefined | null) => {
  if (!tweet) {
    return false;
  }

  return tweet.media.some((media) => media.type === "video" || media.type === "animated_gif");
};

export const normalizeRenderSettings = (
  tweet: TweetSchemaType,
  settings: RenderSettingsSchemaType,
): RenderSettingsSchemaType => {
  const hasTopLevelMedia = tweet.media.length > 0;
  const quotedHasMotion = hasMotionMedia(tweet.quoted_tweet);
  const parentHasMotion = hasMotionMedia(tweet.parent);

  return {
    ...settings,
    includeQuoted: settings.includeQuoted || (!hasTopLevelMedia && quotedHasMotion),
    includeParent: settings.includeParent || (!hasTopLevelMedia && !quotedHasMotion && parentHasMotion),
    includeAudio: settings.includeAudio,
  };
};

export const getPrimaryDisplayedMedia = (
  tweet: TweetSchemaType,
  settings: RenderSettingsSchemaType,
): TweetMedia | null => {
  return (
    tweet.media[settings.mediaIndex] ??
    (settings.includeQuoted ? tweet.quoted_tweet?.media[0] : null) ??
    (settings.includeParent ? tweet.parent?.media[0] : null) ??
    null
  );
};
