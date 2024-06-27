import { TweetDefinitelyExists } from "../../types/constants";
import Checkbox from "../generic/Checkbox";

export const EditSettings = ({
  tweet
}: TweetDefinitelyExists) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-white/50 shadow-sm p-5 rounded-md mb-8 font-geist gap-6">
        <div className="flex flex-col">
          <div className="text-lg font-geist text-rose-400 font-bold mb-4 text-lg">Settings</div>
          <div className="flex flex-col gap-3.5">
            <Checkbox label="Include Parent tweet." />
            <Checkbox label="Include Quoted tweet." />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditSettings;