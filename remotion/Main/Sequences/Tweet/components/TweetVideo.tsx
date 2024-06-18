import { Video } from "remotion";
import { TweetDefinitelyExists } from "../../../../../types/constants";
import { RefObject } from "react";

const TweetVideo = ({ tweet, containerRef }: TweetDefinitelyExists & {
  containerRef: RefObject<HTMLDivElement>
}) => {
  return (
    <div className="flex h-fit mt-[1em]">
      <Video
      style={{borderRadius: "3%", overflow: "hidden", height: "fit-content", width: "100%"}}
        src={tweet.videos[0].download_url}
        />
    </div>
  )
}

export default TweetVideo;