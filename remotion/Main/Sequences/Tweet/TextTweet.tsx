import { TweetDefinitelyExists } from "../../../../types/constants"
import TweetFooter from "./components/TweetFooter"
import TweetHeader from "./components/TweetHeader/TweetHeader"
import TweetText from "./components/TweetText"

const TextTweet = (props: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col h-fit p-6 bg-white w-full">
      <TweetHeader {...props} />
      <TweetText {...props} />
      <TweetFooter {...props} />
    </div>

  )
}

export default TextTweet