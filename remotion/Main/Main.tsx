import { z } from "zod";
import {
  AbsoluteFill,
} from "remotion";
import { CompositionProps } from "../../types/constants";
import { loadFont } from "@remotion/google-fonts/IndieFlower";
import React from "react";
import ClosingSeq from "./Sequences/ClosingSeq/ClosingSeq";
import Tweet from "./Sequences/Tweet/Tweet";

loadFont();

export const Main = ({ tweet }: z.infer<typeof CompositionProps>) => {
  if (tweet === null) {
    return
  }
  return (
    <AbsoluteFill className="bg-white">
      <ClosingSeq/>
      <Tweet tweet={tweet} />
    </AbsoluteFill>
  );
};
