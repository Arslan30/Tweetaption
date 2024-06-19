import clsx from "clsx"
import { TweetDefinitelyExists } from "../../../../../types/constants"
import styles from './TweetText.module.css'

const TweetText = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div dir="auto" className={clsx(styles.TweetText, "text-tweet leading-normal whitespace-pre-wrap font-tweet")} style={{ overflowWrap: 'break-word'}}>
      <div dangerouslySetInnerHTML={{__html: tweet.textHtml}}></div>
    </div>

  )
}

export default TweetText