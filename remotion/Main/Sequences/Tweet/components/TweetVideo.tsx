import { useState } from "react";
import { OffthreadVideo } from "remotion";
import { TweetDefinitelyExists } from "../../../../../types/constants";
import { getAssetSrc } from "../../../../../lib/remotion-asset-src";

const VIDEO_STYLES = { borderRadius: "3%", overflow: "hidden", height: "auto", width: "100%", minHeight: 10 }

const VideoPlaceholder = ({ width, height }: { width: number; height: number }) => {
  return (
    <div
      aria-hidden
      style={{
        ...VIDEO_STYLES,
        aspectRatio: `${width} / ${height}`,
        backgroundColor: "#f5f5f5",
      }}
    />
  )
}

const getVideoMedia = ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  const media = tweet.media[renderSettings.mediaIndex]
  if (media.type !== "video" && media.type !== "animated_gif") {
    throw new Error("Tweet's first media must be a video/animated_gif.")
  }

  return media;
}

const TweetVideoBase = ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  const media = getVideoMedia({ tweet, renderSettings });
  const [hasError, setHasError] = useState(false);
  const videoUrl = getAssetSrc(media.video.url);

  return (
    <div className="flex h-fit mt-[1em]">
      {hasError ? (
        <VideoPlaceholder width={media.size.width} height={media.size.height} />
      ) : (
        <OffthreadVideo
          style={{ ...VIDEO_STYLES }}
          src={videoUrl}
          muted={!renderSettings.includeAudio}
          onError={(err) => {
            console.error("Video failed to load:", err);
            setHasError(true);
          }}
        />
      )}
    </div>
  )
}

export const PureTweetVideo = (props: TweetDefinitelyExists) => {
  const media = getVideoMedia(props);

  return (
    <div className="flex h-fit mt-[1em]">
      <VideoPlaceholder width={media.size.width} height={media.size.height} />
    </div>
  )
}

export const TweetVideo = ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  return <TweetVideoBase tweet={tweet} renderSettings={renderSettings} />
}
