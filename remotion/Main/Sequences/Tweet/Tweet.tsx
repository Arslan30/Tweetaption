import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import TweetHeader from "./TweetHeader/TweetHeader";
import { TweetDefinitelyExists } from "../../../../types/constants";
import TweetText from "./TweetText";
import TweetVideo from "./TweetHeader/TweetVideo";
import { useRef } from "react";

const Tweet = ({tweet}: TweetDefinitelyExists)  => {
  const { fps, durationInFrames } = useVideoConfig();
  const end = durationInFrames - (fps * 1);

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Sequence durationInFrames={end}>
      <AbsoluteFill>
        <div className="flex flex-col h-fit p-8" ref={containerRef}>
          <TweetHeader tweet={tweet} />
          <TweetText tweet={tweet}/>
          <TweetVideo tweet={tweet} containerRef={containerRef} />
        </div>
      </AbsoluteFill>
    </Sequence>

  )
}

export default Tweet;