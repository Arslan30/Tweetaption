import { Composition } from "remotion";
import { Main } from "./Main/Main";
import {
  COMP_NAME,
  defaultMainProps,
  DEFAULT_DURATION_IN_FRAMES,
  VIDEO_FPS,
  DEFAULT_VIDEO_HEIGHT,
  DEFAULT_VIDEO_WIDTH,
} from "../types/constants";
import { CALCULATE_COMPONENT_METADATA } from "./Main/CALCULATE_RENDER_DIMENSIONS";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        durationInFrames={DEFAULT_DURATION_IN_FRAMES}
        fps={VIDEO_FPS}
        width={DEFAULT_VIDEO_WIDTH}
        height={DEFAULT_VIDEO_HEIGHT}
        calculateMetadata={CALCULATE_COMPONENT_METADATA}
        defaultProps={defaultMainProps}
      />
    </>
  );
};
