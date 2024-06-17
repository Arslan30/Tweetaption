import { TweetDefinitelyExists } from "../../../../types/constants"

const TweetText = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div style={{ fontSize: 32, lineHeight: '120%', marginTop: '24px', whiteSpace: 'pre-wrap', overflowWrap: 'break-word', marginBottom: 36 }}>
      <div dangerouslySetInnerHTML={{__html: tweet.textHtml}}></div>
    </div>

  )
}

export default TweetText