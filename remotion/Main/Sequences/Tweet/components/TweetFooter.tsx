import React from "react";
import { TweetDefinitelyExists } from "../../../../../types/constants"

const TimeDisplay = ({tweet}: TweetDefinitelyExists) => {
  const date = new Date(tweet.created_at);

  const formattedTime = new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).format(date);
  const formattedDate = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: "short", day: 'numeric' }).format(date);

  return (
    <div className="flex">
      <span style={{ color: "rgb(91, 112, 131)" }}>{formattedTime} · {formattedDate}</span>
    </div>
  )
}

// const Stat = ({
//   value,
//   text
// }: {
//   value: string
//   text: string
// }) => {
//   return (
//     <div className="flex items-center whitespace-nowrap gap-[0.25em]">
//       <strong>{value}</strong>
//       <span style={{ color: 'rgb(91, 112, 131)' }}>{text}</span>
//     </div>

//   )
// }

// const StatsDisplay = ({tweet}: TweetDefinitelyExists) => {
//   function formatNumber(num: number) {
//     if (num >= 1000) {
//       return (num / 1000).toFixed(1) + 'K';
//     }
//     return num.toString();
//   }
  
//   return (
//     <div className="flex items-center" style={{ gap: '0.9em', marginTop: '0.4em', width: '100%' }}>
//       <Stat value={formatNumber(tweet.retweets)} text="Retweets" />
//       <Stat value={formatNumber(tweet.likes)} text="Likes" />
//     </div>
//   )
// }

const TweetFooterUnMemoized = (props: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col mt-5 text-tweet-sm font-tweet">
      <TimeDisplay {...props} />
    </div>
  )
}

const TweetFooter = React.memo(TweetFooterUnMemoized, (prevProps, nextProps) => prevProps.tweet.id === nextProps.tweet.id)

export default TweetFooter;