"use client";

import { Player, PlayerRef } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useRef, useState } from "react";
import { Main } from "../remotion/Main/Main";
import {
  CompositionProps,
  TweetSchema,
  VIDEO_FPS,
  TweetDefinitelyExists,
} from "../types/constants";
import { z } from "zod";
import { TweetInput } from "../components/TweetInput";
import Image from 'next/image'
import { CALCULATE_METADATA } from "../remotion/Main/COMP_METADATA";
import useAsyncRefresh from "../helpers/useAsyncRefresh";
import { RenderControls } from "../components/RenderControls";


const RenderPlayer = ({ tweet }: TweetDefinitelyExists) => {
  const player = useRef<PlayerRef>(null)

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    player.current?.seekTo(0)

    return {
      tweet,
    };
  }, [tweet.id]);

  const { value: metadata, loading: metadataLoading } = useAsyncRefresh(async () => {
    return await CALCULATE_METADATA({ tweet });
  }, [tweet.id]);

  if (!metadata || metadataLoading) {
    return <div className="flex mb-8 mt-8 items-center animate-pulse justify-center w-full bg-gray-200 overflow-hidden rounded-lg" style={{ height: 600, width: "100%" }}></div>
  }

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-lg border mb-8 mt-8">
        <Player
          ref={player}
          component={Main}
          inputProps={inputProps}
          durationInFrames={metadata.durationInFrames}
          fps={VIDEO_FPS}
          compositionHeight={metadata.height}
          compositionWidth={metadata.width}
          style={{
            // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
            // but not over inline styles
            width: "100%",
          }}
          controls
          autoPlay
        />
      </div>
      <RenderControls tweet={tweet} />
    </div>
  )
}


const Home: NextPage = () => {
  const [tweet, setTweet] = useState<z.infer<typeof TweetSchema> | null>(null);

  return (
    <div className="flex flex-col py-3 mb-5 px-4 w-full gap-6">
      <div className="flex mb-6 mt-2 mx-auto w-full" style={{ maxWidth: "var(--max-frame-width)" }}>
        <a href="/">
         <Image src="/logo.png" alt="logo" width={120} height={120} />
        </a>
      </div>
      <div style={{ maxWidth: "var(--max-frame-width)" }} className="text-5xl font-geist text-amber-500 font-bold mx-auto">{"Grab any tweet's video, without losing context."}</div>
      <div className="flex flex-col w-full mx-auto" style={{ maxWidth: "var(--max-frame-width)" }}>
        <TweetInput
          tweet={tweet}
          setTweet={setTweet}
        ></TweetInput>
        {tweet !== null && (
          <RenderPlayer tweet={tweet} />
        )}
      </div>
      {tweet === null && (
        <div className="flex w-full mx-auto max-w-screen-lg mt-4">
          <img src="/demo.gif" className="w-full" style={{ objectFit: "cover" }}></img>
        </div>
      )}
    </div>
  );
};

export default Home;
