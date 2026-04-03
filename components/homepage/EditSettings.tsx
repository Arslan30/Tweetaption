import { useEffect } from "react";
import { RenderSettingsSchemaType, TweetSchemaType } from "../../types/constants";
import Checkbox from "../generic/Checkbox";

export const EditSettings = ({
  tweet,
  settings,
  setSettings
}: {
  tweet: TweetSchemaType
  settings: RenderSettingsSchemaType
  setSettings: (settings: RenderSettingsSchemaType) => void
}) => {
  const isQuotedTweetAvailable = !!(tweet.quoted_tweet || (tweet.parent as TweetSchemaType)?.quoted_tweet);

  useEffect(() => {
    setSettings({
      ...settings,
      includeQuoted: isQuotedTweetAvailable,
      includeParent: !!tweet.parent
    })
  }, [tweet.id])
  
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white/50 shadow-sm p-5 rounded-md mb-8 font-geist gap-6">
        <div className="flex flex-col">
          <div className="text-lg font-geist text-rose-400 font-bold mb-4 text-lg">Settings</div>
          <div className="flex flex-col gap-3.5">
            <Checkbox
            label={tweet.parent ? "Include the tweet being replied to." : "Include the tweet being replied to. (Unavailable, tweet is not a reply)"}
            disabled={!tweet.parent}
            isChecked={settings.includeParent}
            setIsChecked={() => {
              setSettings({
                ...settings,
                includeParent: !settings.includeParent,
              })
            }}
            />
            <Checkbox
            label={isQuotedTweetAvailable ? "Include Quoted tweet" : "Include Quoted tweet (Unavailable, tweet has no quoted tweet)"}
            disabled={!isQuotedTweetAvailable}
            isChecked={settings.includeQuoted}
            setIsChecked={() => {
              setSettings({
                ...settings,
                includeQuoted: !settings.includeQuoted,
              })
            }}
            />
            <Checkbox
            label="Include audio"
            isChecked={settings.includeAudio}
            setIsChecked={() => {
              setSettings({
                ...settings,
                includeAudio: !settings.includeAudio,
              })
            }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

