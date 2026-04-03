import { AbsoluteFill, Freeze, Sequence, useVideoConfig } from "remotion";
import TweetHeader from "./components/TweetHeader/TweetHeader";
import { TweetDefinitelyExists, TweetSchemaType } from "../../../../types/constants";
import TweetText from "./components/TweetText";
import TweetFooter from "./components/TweetFooter";
import TweetMediaSwitch from "./TweetMediaSwitch";
import QuotedTweet from "./QuotedTweet/QuotedTweet";
import ParentTweet from "./ParentTweet/ParentTweet";
import { hasMotionMedia } from "../../../../lib/tweet-render";

export const PureVideoTweet = (props: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col h-fit p-6 bg-white w-full">
      {props.renderSettings.includeParent && props.tweet.parent && (
        <ParentTweet {...props} tweet={props.tweet.parent as TweetSchemaType} isPure={true} />
      )}
      <TweetHeader {...props} />
      <TweetText {...props} />
      <TweetMediaSwitch {...props} isPure={true} />
      {props.renderSettings.includeQuoted && props.tweet.quoted_tweet && (
        <QuotedTweet {...props} tweet={props.tweet.quoted_tweet as TweetSchemaType} isPure={true} />
      )}
      <TweetFooter {...props} />
    </div>
  )
}

const VideoTweet = (props: TweetDefinitelyExists) => {
  const { fps, durationInFrames } = useVideoConfig();
  const end = durationInFrames - (fps * 1);

  return (
    <Sequence durationInFrames={end}>
      <AbsoluteFill>
        <div className="flex flex-col h-fit p-6 bg-white w-full">
          {props.renderSettings.includeParent && props.tweet.parent && (
            hasMotionMedia(props.tweet.parent as TweetSchemaType) ? (
              <ParentTweet {...props} tweet={props.tweet.parent as TweetSchemaType} isPure={false} />
            ) : (
              <Freeze frame={fps}>
                <ParentTweet {...props} tweet={props.tweet.parent as TweetSchemaType} isPure={false} />
              </Freeze>
            )
          )}
          <Freeze frame={fps} >
            <TweetHeader {...props} />
            <TweetText {...props} />
          </Freeze>
          <TweetMediaSwitch {...props} isPure={false} />
          {props.renderSettings.includeQuoted && props.tweet.quoted_tweet && (
            hasMotionMedia(props.tweet.quoted_tweet as TweetSchemaType) ? (
              <QuotedTweet {...props} tweet={props.tweet.quoted_tweet as TweetSchemaType} isPure={false} />
            ) : (
              <Freeze frame={fps} >
                <QuotedTweet {...props} tweet={props.tweet.quoted_tweet as TweetSchemaType} isPure={false} />
              </Freeze>
            )
          )}
          <Freeze frame={fps}>
            <TweetFooter {...props} />
          </Freeze>
        </div>
      </AbsoluteFill>
    </Sequence>

  )
}

export default VideoTweet;
