"use client";

import { CalculateMetadataFunction } from "remotion";
import { CompositionProps, DEFAULT_DURATION_IN_FRAMES, DEFAULT_VIDEO_HEIGHT, DEFAULT_VIDEO_WIDTH, TweetDefinitelyExists, VIDEO_FPS } from "../../types/constants";
import { z } from "zod";
import { getVideoMetadata } from "@remotion/media-utils";
import { createRoot } from 'react-dom/client';
import Tweet from "./Sequences/Tweet/VideoTweet";
import PureTweet from "./Sequences/Tweet/PureVideoTweet";
import { resolve } from "path";

const oneTimeRender = (jsx: React.ReactNode) => {
  const body = document.querySelector("body")
  if (!body) {
    throw new Error("No body element found");
  }
  
  const oneTimeRenderRoot = document.createElement("div");
  oneTimeRenderRoot.style.visibility = "hidden";
  oneTimeRenderRoot.style.display = "flex";
  oneTimeRenderRoot.style.position = "absolute";
  oneTimeRenderRoot.style.top = "0";
  oneTimeRenderRoot.style.left = "0";
  oneTimeRenderRoot.style.width = "100%";
  oneTimeRenderRoot.style.maxWidth = "var(--max-frame-width)";

  body.appendChild(oneTimeRenderRoot);
  
  const root = createRoot(oneTimeRenderRoot);
  root.render(jsx);

  return oneTimeRenderRoot

}

const makeEven = (num: number) => {
  return num % 2 === 0 ? num : num + 1
}

export const CALCULATE_METADATA = async ({ tweet }: TweetDefinitelyExists) => {
  console.log("calculating metadata...")

  const data = await getVideoMetadata(tweet.videos[0].download_url);

  const OUTRO_LENGTH = 1 * VIDEO_FPS;
  const VIDEO_LENGTH = Math.ceil(data.durationInSeconds) * VIDEO_FPS;

  const container = oneTimeRender(<PureTweet tweet={tweet}/>)
  await new Promise((resolve) => {
    setTimeout(() => {
      setTimeout(() => {
        container.querySelector("video")!.onloadedmetadata = (event) => {
          console.log(container.clientHeight)
          resolve(true)
        }  
      })
    })  
  })
  const [height, width] = [makeEven(container.clientHeight), makeEven(container.clientWidth)]
  container.remove()

  return {
    durationInFrames: VIDEO_LENGTH + OUTRO_LENGTH,
    height,
    width,
  };

}

export const COMP_METADATA: CalculateMetadataFunction<z.infer<typeof CompositionProps>> = async ({ props }) => {
  if (!props.tweet) {
    return {
      durationInFrames: DEFAULT_DURATION_IN_FRAMES,
      height: DEFAULT_VIDEO_HEIGHT,
      width: DEFAULT_VIDEO_WIDTH
    };
  }

  return await CALCULATE_METADATA({
    tweet: props.tweet
  })
}