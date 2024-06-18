import TweetHeader from "./TweetHeader/TweetHeader"
import TweetText from "./TweetText"
import { TweetDefinitelyExists } from "../../../../types/constants"

const PureTweet = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col h-fit p-8">
      <TweetHeader tweet={tweet} />
      <TweetText tweet={tweet} />
      <div className="flex h-fit">
        <video
        style={{ borderRadius: "3%", overflow: "hidden", height: "fit-content", width: "100%" }}
        src={tweet.videos[0].download_url}
        />
      </div>
    </div>
  )
}

export default PureTweet