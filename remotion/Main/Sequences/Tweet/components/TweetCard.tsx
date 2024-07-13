import { Img } from "remotion"
import { TweetDefinitelyExists } from "../../../../../types/constants"

const PHOTO_STYLES = {
  borderRadius: "3%",
  overflow: "hidden",
  height: "auto",
  width: "100%",
  minHeight: 10,
}

export const TweetCard = ({ tweet, renderSettings, isPure }: TweetDefinitelyExists & {
  isPure: boolean
}) => {
  const media = tweet.media[renderSettings.mediaIndex]
  if (media.type !== "card") {
    throw new Error("Tweet's first media must be a card.")
  }

  const Component = isPure ? "img" : Img

  return (
    <div className="flex flex-col h-fit mt-[1em]">
      <div className="flex relative h-fit">
        <Component
          alt="Tweet photo"
          style={{ ...PHOTO_STYLES }}
          src={media.poster}
        />
        <div className="text-white absolute px-1.5 rounded-md" style={{backgroundColor: "rgba(0, 0, 0, 0.77)", left: "1rem", bottom: "1rem", width: "calc(100% - 2rem)", whiteSpace: "pre", textOverflow: "ellipsis", overflow: "hidden", wordBreak: "break-word"}}>{media.title}</div>
      </div>
      <div style={{color: "rgb(91, 112, 131)"}} className="font-bold mt-1">From {media.vanity_url}</div>
    </div>
  )
}

