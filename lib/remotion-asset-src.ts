import { getRemotionEnvironment, staticFile } from "remotion";

export const getAssetSrc = (url: string) => {
  if (/^(https?:)?\/\//.test(url)) {
    const env = getRemotionEnvironment();
    if (env.isPlayer) {
      return `/api/media?url=${encodeURIComponent(url)}`;
    }

    return url;
  }

  return staticFile(url.replace(/^\//, ""));
};
