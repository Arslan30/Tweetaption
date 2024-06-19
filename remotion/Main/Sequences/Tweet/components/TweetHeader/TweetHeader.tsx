import { TweetDefinitelyExists } from "../../../../../../types/constants"
import VerifiedIcon from "./VerifiedIcon"

const TweetAuthorName = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div style={{ display: 'flex', fontWeight: 700, gap: '4px', alignItems: 'center' }}>
      <div style={{ whiteSpace: 'nowrap' }}>{tweet.nameHtml}</div>
      <VerifiedIcon />
    </div>

  )
}

const TweetHeader = ({ tweet }: TweetDefinitelyExists) => {
  const GAP_BETWEEN_AVATAR_AND_TEXT = '0.6em'
  const GAP_BETWEEN_NAME_AND_HANDLE = '0.4em'
  const AVATAR_SIZE = `calc(1em * 2 + ${GAP_BETWEEN_NAME_AND_HANDLE} + 0.5em)`

  return (
    <div className="flex text-tweet-sm items-center mb-[0.6em] font-tweet" style={{ gap: GAP_BETWEEN_AVATAR_AND_TEXT }}>
      <img
        src={tweet.avatarUrl}
        alt="User Avatar"
        className="border"
        style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: '9999px' }}
      />
      <div className="flex flex-col" style={{ gap: GAP_BETWEEN_NAME_AND_HANDLE, lineHeight: "1em" }}>
        <TweetAuthorName tweet={tweet} />
        <div style={{ color: 'rgb(91, 112, 131)' }}>{tweet.handler}</div>
      </div>
    </div>
  )
}

export default TweetHeader