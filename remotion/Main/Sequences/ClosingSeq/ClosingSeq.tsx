import { AbsoluteFill, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Rings } from "./Rings";
import { TweetoLogo } from "./TweetoLogo";
import { OUTRO_DURATION_IN_FRAMES } from "../../../../types/constants";
import { Audio } from "remotion";

const ClosingSeq = ()  => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const start = durationInFrames - OUTRO_DURATION_IN_FRAMES;

  const logoOut = spring({
    fps,
    frame,
    config: {
      damping: 200,
    },
    delay: start,
  });
  
  return (
    <Sequence from={start}>
      <Rings outProgress={logoOut}></Rings>
      <AbsoluteFill className="justify-center items-center">
        <Audio src={staticFile("outro.mp3")} />
        <TweetoLogo></TweetoLogo>
      </AbsoluteFill>
    </Sequence>

  )
}

export default ClosingSeq;