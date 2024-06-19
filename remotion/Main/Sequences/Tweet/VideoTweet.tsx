import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import TweetHeader from "./components/TweetHeader/TweetHeader";
import { TweetDefinitelyExists } from "../../../../types/constants";
import TweetText from "./components/TweetText";
import TweetVideo from "./components/TweetVideo";
import TweetFooter from "./components/TweetFooter";

const VideoTweet = ({tweet}: TweetDefinitelyExists)  => {
  const { fps, durationInFrames } = useVideoConfig();
  const end = durationInFrames - (fps * 1);

  return (
    <Sequence durationInFrames={end}>
      <AbsoluteFill>
        <div className="flex flex-col h-fit p-6 bg-white">
          <TweetHeader tweet={tweet} />
          <TweetText tweet={tweet}/>
          <TweetVideo tweet={tweet}/>
          <TweetFooter tweet={tweet} />
        </div>
      </AbsoluteFill>
    </Sequence>

  )
}

export default VideoTweet;