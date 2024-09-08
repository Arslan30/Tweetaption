import React from "react"
import { TweetAuthorName } from "../components/TweetHeader/TweetAuthorName"
import { TweetDefinitelyExists } from "../../../../../types/constants"
import TimeAgo from 'react-timeago'

const formatTime = (value: number, unit: string) => {
  switch (unit) {
    case 'second': return `${value}s`;
    case 'minute': return `${value}m`;
    case 'hour': return `${value}h`;
    case 'day': return `${value}d`;
    case 'week': return `${value}w`;
    case 'month': return `${value}mo`;
    case 'year': return `${value}y`;
    default: return `${value}${unit.charAt(0)}`;
  }
};


const ParentTweetHeaderUnMemoized = (props: TweetDefinitelyExists) => {
  const GAP_BETWEEN_AVATAR_AND_TEXT = '0.6em'
  const GAP_BETWEEN_NAME_AND_HANDLE = '0.2em'

  return (
    <div className="flex text-tweet-sm items-center mb-[0.2em] font-tweet" style={{ gap: GAP_BETWEEN_AVATAR_AND_TEXT }}>
      <div className="flex" style={{ gap: GAP_BETWEEN_NAME_AND_HANDLE, lineHeight: "1em" }}>
        <TweetAuthorName {...props} />
        <div style={{ color: 'rgb(91, 112, 131)' }}>@{props.tweet.user.screen_name}</div>
        <div  style={{ color: 'rgb(91, 112, 131)' }}>· <TimeAgo live={false} date={props.tweet.created_at} formatter={formatTime} />
        </div>
      </div>
    </div>
  )
}

const ParentTweetHeader = React.memo(ParentTweetHeaderUnMemoized, (prevProps, nextProps) => prevProps.tweet.id === nextProps.tweet.id)

export default ParentTweetHeader