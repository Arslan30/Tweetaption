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


const RenderPlayerUnmemoized = ({ tweet }: TweetDefinitelyExists) => {
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

const RenderPlayer = React.memo(RenderPlayerUnmemoized, (prevProps, nextProps) => {
  return prevProps.tweet.id === nextProps.tweet.id
})

const Home: NextPage = () => {
  const [tweet, setTweet] = useState<z.infer<typeof TweetSchema> | null>(null);

  return (
    <div>
      <div className="flex flex-col py-3 max-w-screen-md m-auto mb-5 px-4">
        <div className="flex mb-8 mt-2">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <TweetInput
          tweet={tweet}
          setTweet={setTweet}
        ></TweetInput>
        {tweet !== null && (
          <RenderPlayer tweet={tweet} />
        )}
      </div>
    </div>
  );
};

export default Home;
