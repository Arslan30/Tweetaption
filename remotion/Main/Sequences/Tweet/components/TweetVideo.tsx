import { Video } from "remotion";
import { TweetDefinitelyExists } from "../../../../../types/constants";

const VIDEO_STYLES = { borderRadius: "3%", overflow: "hidden", height: "auto", width: "100%", minHeight: 10 }

export const PureTweetVideo = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div className="flex h-fit mt-[1em]">
      <video
        style={{ ...VIDEO_STYLES }}
        src={tweet.videos[0].download_url}
      />
    </div>
  )
}

const TweetVideo = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div className="flex h-fit mt-[1em]">
      <Video
        style={{ ...VIDEO_STYLES }}
        src={tweet.videos[0].download_url}
      />
    </div>
  )
}

export default TweetVideo;