import { Img } from "remotion"
import { TweetDefinitelyExists } from "../../../../../types/constants"

const PHOTO_STYLES = {
  borderRadius: "3%",
  overflow: "hidden",
  height: "auto",
  width: "100%",
  minHeight: 10,
}

export const TweetPhoto = ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  const media = tweet.media[renderSettings.mediaIndex]
  if (media.type !== "photo") {
    throw new Error("Tweet's first media must be a photo.")
  }

  return (
    <div className="flex h-fit mt-[1em]">
      <Img
        alt="Tweet photo"
        style={{ ...PHOTO_STYLES }}
        src={media.url}
      />
    </div>
  )
}



export const PureTweetPhoto = ({ tweet, renderSettings }: TweetDefinitelyExists) => {
  const media = tweet.media[renderSettings.mediaIndex]
  if (media.type !== "photo") {
    throw new Error("Tweet's first media must be a photo.")
  }

  return (
    <div className="flex h-fit mt-[1em]">
      <img
      alt="Tweet photo"
      style={{ ...PHOTO_STYLES }}
        src={media.url}
      />
    </div>
  )
}
