import React from "react"
import { TweetDefinitelyExists } from "../../../../../../types/constants"
import { TweetAuthorName } from "./TweetAuthorName"

const TweetHeaderUnMemoized = (props: TweetDefinitelyExists) => {
  const GAP_BETWEEN_AVATAR_AND_TEXT = '0.6em'
  const GAP_BETWEEN_NAME_AND_HANDLE = '0.4em'
  const AVATAR_SIZE = `calc(1em * 2 + ${GAP_BETWEEN_NAME_AND_HANDLE} + 0.5em)`

  return (
    <div className="flex text-tweet-sm items-center mb-[0.6em] font-tweet" style={{ gap: GAP_BETWEEN_AVATAR_AND_TEXT }}>
      <img
        src={props.tweet.user.profile_image_url_https}
        alt="User Avatar"
        className="border"
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: '9999px' }}
      />
      <div className="flex flex-col" style={{ gap: GAP_BETWEEN_NAME_AND_HANDLE, lineHeight: "1em" }}>
        <TweetAuthorName {...props} />
        <div style={{ color: 'rgb(91, 112, 131)' }}>@{props.tweet.user.screen_name}</div>
      </div>
    </div>
  )
}

const TweetHeader = React.memo(TweetHeaderUnMemoized, (prevProps, nextProps) => prevProps.tweet.id === nextProps.tweet.id)

export default TweetHeader