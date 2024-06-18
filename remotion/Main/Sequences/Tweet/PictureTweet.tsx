import { TweetDefinitelyExists } from "../../../../types/constants"
import TweetFooter from "./components/TweetFooter"
import TweetHeader from "./components/TweetHeader/TweetHeader"
import TweetText from "./components/TweetText"

const PictureTweet = ({tweet}: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col h-fit p-9">
      <TweetHeader tweet={tweet} />
      <TweetText tweet={tweet} />
      <div className="flex h-fit">
        <video
        style={{ borderRadius: "3%", overflow: "hidden", height: "fit-content", width: "100%" }}
        src={tweet.videos[0].download_url}
        />
      </div>
      <TweetFooter tweet={tweet} />
    </div>
  )
}

export default PictureTweet