import { Composition } from "remotion";
import { Main } from "./Main/Main";
import {
  COMP_NAME,
  defaultMainProps,
  VIDEO_FPS,
} from "../types/constants";
import { CALCULATE_COMPONENT_METADATA } from "./Main/CALCULATE_RENDER_DIMENSIONS";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id={COMP_NAME}
        component={Main}
        fps={VIDEO_FPS}
        calculateMetadata={CALCULATE_COMPONENT_METADATA}
        defaultProps={defaultMainProps}
      />
    </>
  );
};
