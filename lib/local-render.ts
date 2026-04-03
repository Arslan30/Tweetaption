import "server-only";
import path from "path";
import { promises as fs } from "fs";
import { randomUUID } from "crypto";
import { webpackOverride } from "../remotion/webpack-override.mjs";
import { TweetDefinitelyExists, TweetSchemaType } from "../types/constants";
import type { RenderMediaOnProgress } from "@remotion/renderer";

type LocalRenderJob =
  | {
      id: string;
      status: "rendering";
      progress: number;
      outputPath: string;
      publicUrl: string;
    }
  | {
      id: string;
      status: "done";
      progress: number;
      outputPath: string;
      publicUrl: string;
      size: number;
    }
  | {
      id: string;
      status: "error";
      progress: number;
      outputPath: string;
      publicUrl: string;
      error: string;
    };

type LocalRenderStore = Map<string, LocalRenderJob>;

declare global {
  // eslint-disable-next-line no-var
  var __localRenderStore: LocalRenderStore | undefined;
  // eslint-disable-next-line no-var
  var __localBundlePromise: Promise<string> | undefined;
}

const getRenderStore = () => {
  if (!globalThis.__localRenderStore) {
    globalThis.__localRenderStore = new Map();
  }

  return globalThis.__localRenderStore;
};

const getBundleUrl = async () => {
  if (!globalThis.__localBundlePromise) {
    const { bundle } = await import("@remotion/bundler");
    globalThis.__localBundlePromise = bundle({
      entryPoint: path.join(process.cwd(), "remotion", "index.ts"),
      webpackOverride,
      onProgress: () => undefined,
    });
  }

  return globalThis.__localBundlePromise;
};

const ensureDir = async (dir: string) => {
  await fs.mkdir(dir, { recursive: true });
};

const isRemoteUrl = (value: string) => /^(https?:)?\/\//.test(value);

const toPublicAssetPath = (jobId: string, fileName: string) => {
  return `/render-assets/${jobId}/${fileName}`;
};

const toAbsolutePublicPath = (publicPath: string) => {
  return path.join(process.cwd(), "public", publicPath.replace(/^\//, ""));
};

const sanitizeExtension = (url: string) => {
  const pathname = new URL(url).pathname;
  const ext = path.extname(pathname);
  return ext || ".mp4";
};

const downloadToPublic = async (url: string, publicPath: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download asset: ${response.status} ${response.statusText}`);
  }

  const buffer = new Uint8Array(await response.arrayBuffer());
  const absolutePath = toAbsolutePublicPath(publicPath);
  await ensureDir(path.dirname(absolutePath));
  await fs.writeFile(absolutePath, buffer);
};

const localizeTweetVideos = async (tweet: TweetSchemaType, jobId: string): Promise<TweetSchemaType> => {
  const media = await Promise.all(
    tweet.media.map(async (item, index) => {
      if ((item.type === "video" || item.type === "animated_gif") && isRemoteUrl(item.video.url)) {
        const publicPath = toPublicAssetPath(jobId, `media-${index}${sanitizeExtension(item.video.url)}`);
        await downloadToPublic(item.video.url, publicPath);

        return {
          ...item,
          video: {
            ...item.video,
            url: publicPath,
          },
        };
      }

      return item;
    }),
  );

  return {
    ...tweet,
    media,
    parent: tweet.parent ? await localizeTweetVideos(tweet.parent, `${jobId}-parent`) : undefined,
    quoted_tweet: tweet.quoted_tweet ? await localizeTweetVideos(tweet.quoted_tweet, `${jobId}-quoted`) : undefined,
  };
};

export const startLocalRender = async ({
  compositionId,
  inputProps,
}: {
  compositionId: string;
  inputProps: TweetDefinitelyExists;
}) => {
  const id = randomUUID();
  const rendersDir = path.join(process.cwd(), "public", "renders");
  const outputPath = path.join(rendersDir, `${id}.mp4`);
  const publicUrl = `/renders/${id}.mp4`;

  await ensureDir(rendersDir);

  const store = getRenderStore();
  store.set(id, {
    id,
    status: "rendering",
    progress: 0,
    outputPath,
    publicUrl,
  });

  void (async () => {
    try {
      const { renderMedia, selectComposition } = await import("@remotion/renderer");
      const localizedInputProps: TweetDefinitelyExists = {
        ...inputProps,
        tweet: await localizeTweetVideos(inputProps.tweet, id),
      };

      const serveUrl = await getBundleUrl();
      const composition = await selectComposition({
        serveUrl,
        id: compositionId,
        inputProps: localizedInputProps,
      });

      await renderMedia({
        serveUrl,
        composition,
        codec: "h264",
        outputLocation: outputPath,
        inputProps: localizedInputProps,
        overwrite: true,
        muted: !localizedInputProps.renderSettings.includeAudio,
        onProgress: ({ progress }: Parameters<RenderMediaOnProgress>[0]) => {
          const job = store.get(id);
          if (!job || job.status !== "rendering") {
            return;
          }

          store.set(id, {
            ...job,
            progress: Math.max(progress, 0.03),
          });
        },
      });

      const stats = await fs.stat(outputPath);
      store.set(id, {
        id,
        status: "done",
        progress: 1,
        outputPath,
        publicUrl,
        size: stats.size,
      });
    } catch (err) {
      const job = store.get(id);
      store.set(id, {
        id,
        status: "error",
        progress: job?.progress ?? 0,
        outputPath,
        publicUrl,
        error: err instanceof Error ? err.message : "Unknown render error",
      });
    }
  })();

  return {
    renderId: id,
    bucketName: "local",
  };
};

export const getLocalRenderProgress = (id: string) => {
  return getRenderStore().get(id) ?? null;
};
