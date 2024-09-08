import TweetMediaSwitch from "../TweetMediaSwitch";
import TweetText from "../components/TweetText";
import { TweetDefinitelyExists, TweetSchemaType } from "../../../../../types/constants";
import ParentTweetHeader from "./ParentTweetHeader";
import QuotedTweet from "../QuotedTweet/QuotedTweet";

const ParentTweet = (props: TweetDefinitelyExists & {
  isPure: boolean
}) => {
  const GAP_BETWEEN_AVATAR_AND_TEXT = '0.6em'
  const GAP_BETWEEN_NAME_AND_HANDLE = '0.4em'
  const AVATAR_SIZE = `calc(1em * 2 + ${GAP_BETWEEN_NAME_AND_HANDLE} + 0.5em)`

  return (
    <div className="flex h-fit bg-white w-full mb-6"  style={{ gap: GAP_BETWEEN_AVATAR_AND_TEXT }}>
      <div className="flex flex-col items-center">
        <img
          src={props.tweet.user.profile_image_url_https}
          alt="User Avatar"
          className="border"
          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, minWidth: AVATAR_SIZE, minHeight: AVATAR_SIZE, borderRadius: '9999px' }}
        />
        <div className="flex-1 rounded-full" style={{backgroundColor: "rgb(207, 217, 222)", width: "2px", minHeight: "calc(100% - 22px)", marginTop: 0}} ></div>
      </div>
      <div>
        <ParentTweetHeader {...props} tweet={props.tweet} />
        <TweetText {...props} />
        {(props.renderSettings.includeQuoted && props.tweet.quoted_tweet) && (
          <QuotedTweet {...props} tweet={props.tweet.quoted_tweet as TweetSchemaType} isPure={props.isPure} />
        )}
        <TweetMediaSwitch {...props} isPure={props.isPure} />
      </div>
    </div>

  )
}

export default ParentTweet;