"use client";

import { CalculateMetadataFunction } from "remotion";
import { CompositionProps, DEFAULT_DURATION_IN_FRAMES, DEFAULT_VIDEO_HEIGHT, DEFAULT_VIDEO_WIDTH, TweetDefinitelyExists, VIDEO_FPS, defaultMainProps } from "../../types/constants";
import { z } from "zod";
import { createRoot } from 'react-dom/client';
import { PureVideoTweet } from "./Sequences/Tweet/VideoTweet";

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

const DEFAULT_DURATION_IN_SECONDS_FOR_TEXT_TWEET = 5;
const DEFAULT_DURATION_IN_SECONDS_FOR_PHOTO_TWEET = 5;

export const CALCULATE_RENDER_DIMENSIONS = async ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  console.log("calculating dimensions...")

  const media = tweet.media[renderSettings.mediaIndex]
  const duration = !media ? DEFAULT_DURATION_IN_SECONDS_FOR_TEXT_TWEET : (
    media.type === "video" ? media.video.duration_millis / 1000 : DEFAULT_DURATION_IN_SECONDS_FOR_PHOTO_TWEET
  )

  const OUTRO_LENGTH = 1 * VIDEO_FPS;
  const VIDEO_LENGTH = Math.ceil(duration) * VIDEO_FPS;

  const container = oneTimeRender(<PureVideoTweet tweet={tweet} renderSettings={renderSettings} />)
  
  await new Promise((resolve) => {
    const intervalId = setInterval(() => {
      if (media?.type === "video")  {
        const video = container.querySelector("video")
        console.log("Waiting for pure video to mount...")
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
      } else {
        console.log("Waiting for pure component to mount...")
        if (container.clientHeight > 0) {
          setTimeout(() => {
            console.log("Component mounted,", `${container.clientWidth}x${container.clientHeight}`)
            clearInterval(intervalId)
            resolve(true)  
          })
        }
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

export const CALCULATE_COMPONENT_METADATA: CalculateMetadataFunction<z.infer<typeof CompositionProps>> = async ({ props }) => {
  if (!props.tweet) {
    return {
      durationInFrames: DEFAULT_DURATION_IN_FRAMES,
      height: DEFAULT_VIDEO_HEIGHT,
      width: DEFAULT_VIDEO_WIDTH
    };
  }

  return await CALCULATE_RENDER_DIMENSIONS({
    renderSettings: props.renderSettings ?? defaultMainProps.renderSettings,
    tweet: props.tweet,
  });
}