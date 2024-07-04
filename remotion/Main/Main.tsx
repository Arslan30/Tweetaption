import { z } from "zod";
import {
  AbsoluteFill,
} from "remotion";
import { CompositionProps, defaultMainProps } from "../../types/constants";
import { loadFont } from "@remotion/google-fonts/IndieFlower";
import React from "react";
import ClosingSeq from "./Sequences/ClosingSeq/ClosingSeq";
import VideoTweet from "./Sequences/Tweet/VideoTweet";

loadFont();

export const Main = ({ tweet, renderSettings }: z.infer<typeof CompositionProps>) => {
  if (tweet === null) {
    return
  }
  
  return (
    <AbsoluteFill className="bg-white">
      <ClosingSeq/>
      <VideoTweet
      tweet={tweet}
      renderSettings={renderSettings ?? defaultMainProps.renderSettings}
      />
    </AbsoluteFill>
  );
};
