import TweetMediaSwitch from "../TweetMediaSwitch";
import TweetText from "../components/TweetText";
import { TweetDefinitelyExists } from "../../../../../types/constants";
import SummarizedTweetHeader from "./SummarizedTweetHeader";

const QuotedTweet = (props: TweetDefinitelyExists & {
  isPure: boolean
}) => {
  return (
    <div className="flex flex-col h-fit p-3 mt-2 rounded-md border bg-white w-full">
      <SummarizedTweetHeader {...props} tweet={props.tweet} />
      <TweetText {...props} />
      <TweetMediaSwitch {...props} isPure={props.isPure} />
    </div>

  )
}

export default QuotedTweet;