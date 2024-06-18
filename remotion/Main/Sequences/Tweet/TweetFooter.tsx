const TweetFooter = () => {
  return (
    <div className="flex flex-col mt-6 text-xl">
      <span style={{ color: "rgb(91, 112, 131)" }}>8:58 PM · May 26, 2024</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginTop: '15px', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          <strong>42.8K</strong>
          <span style={{ color: 'rgb(91, 112, 131)' }}>Retweets</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
          <strong>67.2K</strong>
          <span style={{ color: 'rgb(91, 112, 131)' }}>Likes</span>
        </div>
      </div>
    </div>
  )
}

export default TweetFooter;