import { TweetDefinitelyExists } from "../../../../../types/constants"
import VerifiedIcon from "./VerifiedIcon"

const TweetHeader = ({ tweet }: TweetDefinitelyExists) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', fontSize: '36px', gap: '30px' }}>
      <img
        src={tweet.avatarUrl}
        alt=""
        style={{ width: '100px', height: '100px', borderRadius: '9999px' }}
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', overflow: 'hidden', lineHeight: "1em" }}>
        <div style={{ display: 'flex', fontWeight: 700, gap: '4px', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>{tweet.nameHtml}</div>
          <VerifiedIcon/>
        </div>
        <div style={{ color: 'rgb(91, 112, 131)' }}>{tweet.handler}</div>
      </div>
    </div>
  )
}

export default TweetHeader