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
import { CALCULATE_RENDER_DIMENSIONS } from "../remotion/Main/CALCULATE_RENDER_DIMENSIONS";
import useAsyncRefresh from "../helpers/useAsyncRefresh";
import { RenderControls } from "../components/homepage/RenderControls";
import { EditSettings } from "../components/homepage/EditSettings";
import { GitHubButton } from "../components/generic/GitHubButton";
import { normalizeRenderSettings } from "../lib/tweet-render";
// import { Button } from "../components/generic/Button";
// import { FaWhatsapp } from "react-icons/fa";

const FloatingPreview = () => {
  return (
    <div className="relative mt-10 h-[420px] w-full md:mt-14 md:h-[620px]">
      <div className="absolute left-[2%] top-[9%] h-[250px] w-[41%] overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-[0_28px_70px_rgba(171,124,53,0.18)] md:h-[420px]">
        <img
          src="/demo-large.gif"
          alt="Tweet preview collage"
          className="h-full w-full object-cover object-left"
        />
      </div>
      <div className="absolute left-[30%] top-[20%] h-[240px] w-[38%] overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-[0_24px_60px_rgba(171,124,53,0.16)] md:h-[390px]">
        <img
          src="/demo-large.gif"
          alt="Tweet preview collage"
          className="h-full w-full scale-[1.05] object-cover object-center"
        />
      </div>
      <div className="absolute right-[2%] top-[34%] h-[210px] w-[38%] overflow-hidden rounded-[26px] border border-white/60 bg-white shadow-[0_24px_60px_rgba(171,124,53,0.16)] md:h-[330px]">
        <img
          src="/demo-large.gif"
          alt="Tweet preview collage"
          className="h-full w-full object-cover object-right"
        />
      </div>
    </div>
  );
};

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
  const [renderSettings, setRenderSettings] = useState<RenderSettingsSchemaType>(() =>
    normalizeRenderSettings(tweet, {
      includeParent: false,
      includeQuoted: false,
      mediaIndex: 0,
      includeAudio: true,
    })
  )

  React.useEffect(() => {
    setRenderSettings((current) => normalizeRenderSettings(tweet, current));
  }, [tweet]);

  return (
    <div className="flex flex-col">
      <div className="overflow-hidden rounded-lg border mb-8 mt-8">
        <RenderPlayer tweet={tweet} renderSettings={renderSettings} />
      </div>
      <div className="mb-8 rounded-md bg-white/70 p-5 shadow-sm">
        <RenderControls tweet={tweet} renderSettings={renderSettings} />
      </div>
      <EditSettings tweet={tweet} settings={renderSettings} setSettings={setRenderSettings} />
    </div>
  )
}


const Home: NextPage = () => {
  const [tweet, setTweet] = useState<TweetSchemaType | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-5 md:px-8 md:py-6">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute left-[-10%] top-[-4%] h-[340px] w-[340px] rounded-full bg-white/35 blur-3xl" />
        <div className="absolute right-[-8%] top-[10%] h-[300px] w-[300px] rounded-full bg-[#fff2ba] blur-3xl" />
        <div className="absolute bottom-[8%] left-[15%] h-[220px] w-[220px] rounded-full bg-[#ffd8aa] blur-3xl" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1080px] flex-col">
        <div className="mb-6 flex items-start justify-between">
          <div className="font-geist text-2xl font-bold leading-none text-[#f59d0c] md:text-3xl">
            Tweet Video Renderer
          </div>
          <GitHubButton />
        </div>

        <div className="mx-auto flex w-full max-w-[860px] flex-col items-center text-center">
          <div className="max-w-[760px] text-left text-[44px] font-geist font-bold leading-[0.95] text-[#f59d0c] md:text-[74px]">
            Download video tweets as mp4,
            <br />
            frame included.
          </div>

          <div className="mt-8 w-full">
            <TweetInput
              tweet={tweet}
              setTweet={setTweet}
            ></TweetInput>
          </div>

          {tweet === null ? (
            <FloatingPreview />
          ) : (
            <div className="mt-10 w-full text-left">
              <RenderTweet tweet={tweet} />
            </div>
          )}
        </div>

        <div className="relative mt-8 flex flex-col items-center gap-6 text-center md:mt-12">
          <div className="font-geist text-sm font-bold text-[#f2851c]">
            Render tweet videos locally.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
