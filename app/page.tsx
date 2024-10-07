"use client";

import { Player, PlayerRef } from "@remotion/player";
import type { NextPage } from "next";
import React, { useMemo, useRef, useState } from "react";
import { Main } from "../remotion/Main/Main";
import {
  CompositionProps,
  VIDEO_FPS,
  TweetDefinitelyExists,
  TweetSchemaType,
  RenderSettingsSchemaType,
} from "../types/constants";
import { z } from "zod";
import { TweetInput } from "../components/homepage/TweetInput";
import Image from 'next/image'
import { CALCULATE_RENDER_DIMENSIONS } from "../remotion/Main/CALCULATE_RENDER_DIMENSIONS";
import useAsyncRefresh from "../helpers/useAsyncRefresh";
import { RenderControls } from "../components/homepage/RenderControls";
import { EditSettings } from "../components/homepage/EditSettings";
import { Button } from "../components/generic/Button";
import { FaWhatsapp } from "react-icons/fa";

const RenderPlayer = ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  const player = useRef<PlayerRef>(null)

  const inputProps: z.infer<typeof CompositionProps> = useMemo(() => {
    player.current?.seekTo(0)

    return {
      tweet,
      renderSettings: {...renderSettings}
    };
  }, [tweet.id, JSON.stringify(renderSettings)]);

  const { value: metadata, loading: metadataLoading } = useAsyncRefresh(async () => {
    return await CALCULATE_RENDER_DIMENSIONS({ tweet, renderSettings });
  }, [tweet.id, JSON.stringify(renderSettings)]);

  if (!metadata || metadataLoading) {
    return <div className="flex items-center animate-pulse justify-center w-full bg-gray-200 overflow-hidden rounded-lg" style={{ height: 600, width: "100%" }}></div>
  }

  return (
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
  )
}


const RenderTweet = ({ tweet }: {
  tweet: TweetSchemaType
}) => {
  const [renderSettings, setRenderSettings] = useState<RenderSettingsSchemaType>({
    includeParent: false,
    includeQuoted: false,
    mediaIndex: 0
  })

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-lg border mb-8 mt-8">
        <RenderPlayer tweet={tweet} renderSettings={renderSettings} />
      </div>
      <EditSettings tweet={tweet} settings={renderSettings} setSettings={setRenderSettings} />
      <RenderControls tweet={tweet} renderSettings={renderSettings} />
    </div>
  )
}


const Home: NextPage = () => {
  const [tweet, setTweet] = useState<TweetSchemaType | null>(null);

  return (
    <div className="flex flex-col py-3 mb-3 px-4 w-full gap-6">
      <div className="flex mb-6 mt-2 mx-auto w-full" style={{ maxWidth: "var(--max-frame-width)" }}>
        <a href="/">
          <Image src="/logo.png" alt="logo" width={120} height={120} />
        </a>
        <div className="flex flex-col ml-auto text-2xl font-geist text-green-600 font-bold">
          <a href="https://whatsapp.com/channel/0029ValZmomDOQIRwdHRv00A" target="_blank">
            <Button className="flex ml-auto items-center leading-none	mb-4 bg-[#25D366] hover:bg-[#16a34b] active:bg-[#15803e]">
              <FaWhatsapp className="mr-3"/>
              <span className="mt-1 font-bold">Join Now</span>
            </Button>
          </a>
          Join our news channel for Pakistan!
        </div>
      </div>
      <div style={{ maxWidth: "var(--max-frame-width)" }} className="text-5xl font-geist text-amber-500 font-bold mx-auto">{"Grab any tweet as a video, without losing context."}</div>
      <div className="flex flex-col w-full mx-auto" style={{ maxWidth: "var(--max-frame-width)" }}>
        <TweetInput
          tweet={tweet}
          setTweet={setTweet}
        ></TweetInput>
        {tweet !== null && (
          <RenderTweet tweet={tweet} />
        )}
      </div>
      {tweet === null && (
        <div className="flex flex-col w-full mx-auto max-w-screen-lg mt-2">
          <img src="/demo.gif" className="w-full mb-4" style={{ objectFit: "cover" }}></img>
        </div>
      )}
      <div className="flex flex-col relative md:flex-row items-center font-mono gap-6 w-full mx-auto max-w-screen-lg text-center ">
        <div className="font-bold md:mx-auto text-sm font-geist text-orange-500 font-bold" >Originally created to combat censorship in Pakistan.</div>
        <a
          href="https://www.producthunt.com/posts/tweeto-lol?embed=true&utm_source=badge-featured&utm_medium=badge&utm_souce=badge-tweeto&#0045;lol"
          target="_blank"
          rel="noopener noreferrer"
          className="md:absolute md:right-0"
        >
          <img
            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=466740&theme=light"
            alt="tweeto&#0046;lol - Grab&#0032;any&#0032;tweet&#0039;s&#0032;video&#0044;&#0032;without&#0032;losing&#0032;context&#0046; | Product Hunt"
            style={{ width: 'auto', height: '2em' }}
            width="250"
            height="54"
          />
        </a>

      </div>
    </div>
  );
};

export default Home;
