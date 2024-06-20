import TweetHeader from "./components/TweetHeader/TweetHeader"
import TweetText from "./components/TweetText"
import { TweetDefinitelyExists } from "../../../../types/constants"
import TweetFooter from "./components/TweetFooter"
import { PureTweetVideo } from "./components/TweetVideo"

const PureVideoTweet = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col h-fit p-6 bg-white w-full">
      <TweetHeader tweet={tweet} />
      <TweetText tweet={tweet} />
      <PureTweetVideo tweet={tweet} />
      <TweetFooter tweet={tweet} />
    </div>
  )
}

export default PureVideoTweet