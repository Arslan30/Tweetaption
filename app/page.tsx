"use client";

import { Player, PlayerMethods, PlayerRef } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useRef, useState } from "react";
import { Main } from "../remotion/Main/Main";
import {
  CompositionProps,
  DEFAULT_DURATION_IN_FRAMES,
  TweetSchema,
  VIDEO_FPS,
  VIDEO_HEIGHT,
  VIDEO_WIDTH,
} from "../types/constants";
import { z } from "zod";
import { TweetInput } from "../components/TweetInput";
import Image from 'next/image'

const Home: NextPage = () => {
  const [tweet, setTweet] = useState<z.infer<typeof TweetSchema> | null>(null);
  const player = useRef<PlayerRef>(null)

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    player.current?.seekTo(0)
    return {
      tweet,
    };
  }, [tweet?.id]);

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
          <div className="overflow-hidden rounded-lg border mb-10 mt-8">
            <Player
              ref={player}
              component={Main}
              inputProps={inputProps}
              durationInFrames={DEFAULT_DURATION_IN_FRAMES}
              fps={VIDEO_FPS}
              compositionHeight={VIDEO_HEIGHT}
              compositionWidth={VIDEO_WIDTH}
              style={{
                // Can't use tailwind class for width since player's default styles take presedence over tailwind's,
                // but not over inline styles
                width: "100%",
              }}
              controls
              autoPlay
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
