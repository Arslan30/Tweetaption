import { Video } from "remotion";
import { TweetDefinitelyExists } from "../../../../../types/constants";

const TweetVideo = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div className="flex">
      <Video
      style={{borderRadius: "3%", overflow: "hidden", height: "fit-content", width: "100%"}}
        src={"https://video.twimg.com/amplify_video/1800884084370993152/vid/avc1/1080x1080/kS1Ce-q3QJFf0PA1.mp4?tag=16"}
        onLoadedData={function (e) {
          
        }}
        onLoadedMetadata={function (meta) {
          console.log(meta.currentTarget.duration)
        }}/>
    </div>
  )
}

export default TweetVideo;