import { TweetDefinitelyExists } from "../../../../types/constants"

const TweetText = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div dir="auto" className="text-tweet leading-normal whitespace-pre-wrap font-tweet mb-10" style={{ overflowWrap: 'break-word'}}>
      <div dangerouslySetInnerHTML={{__html: tweet.textHtml}}></div>
    </div>

  )
}

export default TweetText