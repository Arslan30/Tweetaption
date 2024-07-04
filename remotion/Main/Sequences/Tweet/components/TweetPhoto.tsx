import { TweetDefinitelyExists } from "../../../../../types/constants"

export const TweetPhoto = ({ tweet, mediaIndex = 0 }: TweetDefinitelyExists) => {
  const media = tweet.media![mediaIndex]
  if (media.type !== "photo") {
    throw new Error("Tweet's first media must be a photo.")
  }

  return (
    <div className="flex h-fit mt-[1em]">
      <img
        style={{ borderRadius: "3%", overflow: "hidden", height: "auto", width: "100%", minHeight: 10 }}
        src={media.url}
      />
    </div>
  )
}

export default TweetPhoto