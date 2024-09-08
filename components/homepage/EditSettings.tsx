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
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white/50 shadow-sm p-5 rounded-md mb-8 font-geist gap-6">
        <div className="flex flex-col">
          <div className="text-lg font-geist text-rose-400 font-bold mb-4 text-lg">Settings</div>
          <div className="flex flex-col gap-3.5">
            <Checkbox
            label={tweet.parent ? "Include the tweet being replied to." : "Include the tweet being replied to. (Unavailable for this tweet)"}
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
            label={tweet.quoted_tweet ? "Include Quoted tweet" : "Include Quoted tweet (Unavailable for this tweet)"}
            disabled={!tweet.quoted_tweet}
            isChecked={settings.includeQuoted}
            setIsChecked={() => {
              setSettings({
                ...settings,
                includeQuoted: !settings.includeQuoted,
              })
            }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

