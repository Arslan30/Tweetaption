"use client";

import { CalculateMetadataFunction } from "remotion";
import { CompositionProps, DEFAULT_DURATION_IN_FRAMES, DEFAULT_VIDEO_HEIGHT, DEFAULT_VIDEO_WIDTH, TweetDefinitelyExists, VIDEO_FPS } from "../../types/constants";
import { z } from "zod";
import { getVideoMetadata } from "@remotion/media-utils";
import { createRoot } from 'react-dom/client';
import PureTweet from "./Sequences/Tweet/PureVideoTweet";

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

  if (tweet.media![0].type !== "video") {
    throw new Error("Tweet's first media must be a video.")
  }

  const data = await getVideoMetadata(tweet.media![0].video.url);

  const OUTRO_LENGTH = 1 * VIDEO_FPS;
  const VIDEO_LENGTH = Math.ceil(data.durationInSeconds) * VIDEO_FPS;

  const container = oneTimeRender(<PureTweet tweet={tweet}/>)
  
  await new Promise((resolve) => {
    const intervalId = setInterval(() => {
      const video = container.querySelector("video")
      console.log("Waiting for video to mount...")
      if (video) {
        setTimeout(() => {
          video.onloadedmetadata = () => {
            console.warn("onloadedmetadata still available")
          }
          video.onloadeddata = () => {
            console.warn("onloadeddata still available")
          }

          console.log("Video mounted,", `${video.clientWidth}x${video.clientHeight}`)
          clearInterval(intervalId)
          resolve(true)  
        }, 500)
      }
    }, 200)
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