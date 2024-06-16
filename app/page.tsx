"use client";

import { Player } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useState } from "react";
import { Main } from "../remotion/Main/Main";
import {
  CompositionProps,
  DURATION_IN_FRAMES,
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

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    return {
      tweet,
    };
  }, [tweet?.id]);

  return (
    <div>
      <div className="flex flex-col py-2 max-w-screen-md m-auto mb-5 px-4">
        <div className="flex mb-5 mt-2">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
        </div>
        <TweetInput
          tweet={tweet}
          setTweet={setTweet}
        ></TweetInput>
        {tweet !== null && (
          <div className="overflow-hidden rounded-geist shadow-[0_0_200px_rgba(0,0,0,0.15)] mb-10 mt-16">
            <Player
              component={Main}
              inputProps={inputProps}
              durationInFrames={DURATION_IN_FRAMES}
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
