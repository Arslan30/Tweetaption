import { Video } from "remotion";
import { TweetDefinitelyExists } from "../../../../../types/constants";

const VIDEO_STYLES = { borderRadius: "3%", overflow: "hidden", height: "auto", width: "100%", minHeight: 10 }

export const PureTweetVideo = ({ tweet }: TweetDefinitelyExists) => {
  if (tweet.media![0].type !== "video") {
    throw new Error("Tweet's first media must be a video.")
  }

  return (
    <div className="flex h-fit mt-[1em]">
      <video
        style={{ ...VIDEO_STYLES }}
        src={tweet.media![0].video.url}
      />
    </div>
  )
}

const TweetVideo = ({ tweet }: TweetDefinitelyExists) => {
  if (tweet.media![0].type !== "video") {
    throw new Error("Tweet's first media must be a video.")
  }
  
  return (
    <div className="flex h-fit mt-[1em]">
      <Video
        style={{ ...VIDEO_STYLES }}
        src={tweet.media![0].video.url}
      />
    </div>
  )
}

export default TweetVideo;