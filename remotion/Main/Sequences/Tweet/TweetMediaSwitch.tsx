import { TweetDefinitelyExists } from "../../../../types/constants";
import { TweetCard } from "./components/TweetCard";
import { PureTweetPhoto, TweetPhoto } from "./components/TweetPhoto";
import { PureTweetVideo, TweetVideo } from "./components/TweetVideo";

const TweetMediaSwitch = (props: TweetDefinitelyExists & {
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

export default TweetMediaSwitch;