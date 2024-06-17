import { Video } from "remotion";
import { TweetDefinitelyExists } from "../../../../../types/constants";

const TweetVideo = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div style={{ display: "flex", overflow: "hidden", flex: 1}}>
      <Video
      style={{borderRadius: "3%", overflow: "hidden", height: "fit-content", maxHeight: "100%", width: "100%", objectFit: "cover"}}
        src={tweet.videos[0].download_url}
        onLoadedData={function (e) {
          
        }} />
    </div>
  )
}

export default TweetVideo;