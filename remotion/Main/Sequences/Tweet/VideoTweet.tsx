import { AbsoluteFill, Sequence, useVideoConfig } from "remotion";
import TweetHeader from "./components/TweetHeader/TweetHeader";
import { TweetDefinitelyExists } from "../../../../types/constants";
import TweetText from "./components/TweetText";
import TweetVideo from "./components/TweetVideo";
import { useRef } from "react";
import TweetFooter from "./components/TweetFooter";

const VideoTweet = ({tweet}: TweetDefinitelyExists)  => {
  const { fps, durationInFrames } = useVideoConfig();
  const end = durationInFrames - (fps * 1);

  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <Sequence durationInFrames={end}>
      <AbsoluteFill>
        <div className="flex flex-col h-fit p-6" ref={containerRef}>
          <TweetHeader tweet={tweet} />
          <TweetText tweet={tweet}/>
          <TweetVideo tweet={tweet} containerRef={containerRef} />
          <TweetFooter tweet={tweet} />
        </div>
      </AbsoluteFill>
    </Sequence>

  )
}

export default VideoTweet;