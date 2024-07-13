import { AbsoluteFill, Freeze, Sequence, useVideoConfig } from "remotion";
import TweetHeader from "./components/TweetHeader/TweetHeader";
import { TweetDefinitelyExists } from "../../../../types/constants";
import TweetText from "./components/TweetText";
import TweetFooter from "./components/TweetFooter";
import { PureTweetVideo, TweetVideo } from "./components/TweetVideo";
import { PureTweetPhoto, TweetPhoto } from "./components/TweetPhoto";
import { TweetCard } from "./components/TweetCard";

const VideoTweetMediaSwitch = (props: TweetDefinitelyExists & {
  isPure: boolean
}) => {
  const media = props.tweet.media[props.renderSettings.mediaIndex]
  if (!media) {
    return null;
  }

  if (media.type === "video" || media.type === "animated_gif") {
    if (props.isPure) {
      return <PureTweetVideo {...props} />
    } else {
      return <TweetVideo {...props} />
    }
  } else if (media.type === "card") {
    return <TweetCard {...props} isPure={props.isPure} />
  } else if (media.type === "photo") {
    if (props.isPure) {
      return <PureTweetPhoto {...props} />
    } else {
      return <TweetPhoto {...props} />
    }
  } else {
    throw new Error("Unsupported media type: " + media.type)
  }
}


export const PureVideoTweet = (props: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col h-fit p-6 bg-white w-full">
      <TweetHeader {...props} />
      <TweetText {...props} />
      <VideoTweetMediaSwitch {...props} isPure={true} />
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
          <Freeze frame={fps} >
            <TweetHeader {...props} />
            <TweetText {...props} />
          </Freeze>
          <VideoTweetMediaSwitch {...props} isPure={false} />
          <Freeze frame={fps}>
            <TweetFooter {...props} />
          </Freeze>
        </div>
      </AbsoluteFill>
    </Sequence>

  )
}

export default VideoTweet;