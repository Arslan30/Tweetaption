import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import TweetHeader from "./TweetHeader/TweetHeader";
import { TweetDefinitelyExists } from "../../../../types/constants";
import TweetText from "./TweetText";
import TweetVideo from "./TweetHeader/TweetVideo";

const Tweet = ({tweet}: TweetDefinitelyExists)  => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const end = durationInFrames - (fps * 1);

  return (
    <Sequence durationInFrames={end}>
      <AbsoluteFill className="p-8">
        <div className="flex flex-col h-full">
          <TweetHeader tweet={tweet} />
          <TweetText tweet={tweet}/>
          <TweetVideo tweet={tweet} />
        </div>
      </AbsoluteFill>
    </Sequence>

  )
}

export default Tweet;