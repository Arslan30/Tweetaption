import { ErrorComp } from "../generic/Error";
import { Input } from "../generic/Input";
import { useEffect, useState } from "react";
import { fetchTweet } from "../../lambda/api";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../generic/Button";
import { TweetSchemaType } from "../../types/constants";

export const TweetInput: React.FC<{
  tweet: TweetSchemaType | null;
  setTweet: React.Dispatch<React.SetStateAction<TweetSchemaType | null>>;
}> = ({ tweet, setTweet }) => {
  const props = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (props.has("url")) {
      setTweetUrlInput(props.get("url") ?? "")
    }
  }, [])

  const [tweetUrlInput, setTweetUrlInput] = useState<string>("");
  const [tweetLoading, setTweetLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const submitUrl = async () => {
    try {
      const tweetIdString = new URL(tweetUrlInput).pathname.split("/")[3]
      try {
        const tweetId = BigInt(tweetIdString).toString()
        setTweetLoading(true);
        try {
          const tweet = await fetchTweet({ tweetId })
          setTweet(tweet);
          setError(null);
          console.log(router.push("/?url=" + tweetUrlInput))
        } catch (e) {
          setTweet(null);
          setError((e as any).message)
        } finally {
          setTweetLoading(false);
        }
      } catch {
        setTweet(null)
        setError("Invalid X/Twitter URL.")
      }
    } catch (error) {
      setTweet(null)
      setError("Invalid URL.")
    }
  }

  return (
    <div className="flex flex-col">
      <form name="pull-tweet" onSubmit={e => e.preventDefault()}>
        <div className={clsx(
          "flex flex-col gap-3 rounded-[24px] border border-white/70 bg-white/95 p-3 shadow-[0_18px_55px_rgba(173,124,48,0.18)] transition md:flex-row md:items-center md:gap-2",
          (tweet === null && !tweetLoading) ? "focus-within:-translate-y-0.5" : "shadow-none"
        )}>

          {(
            <>
              <Input
                placeholder="https://x.com/ImranKhanPTI/status/1800884147705315751/video/1"
                name="tweet-url"
                className="min-h-[52px] rounded-[18px] bg-[#fffaf1] px-4 text-lg text-slate-700 md:mr-2"
                disabled={tweetLoading}
                setText={setTweetUrlInput}
                text={tweetUrlInput}
              ></Input>
              <div className="flex items-center gap-2 self-end md:self-auto">
                {tweetUrlInput === "" && (
                  <Button
                    className="min-h-[52px] rounded-[16px] bg-[#ff7d97] px-5 text-base hover:bg-[#f76886] active:bg-[#ea5878]"
                    loading={tweetLoading}
                    disabled={tweetLoading}
                    onClick={() => {
                      setTweetUrlInput("https://x.com/i/status/1806500027835240489")
                    }}
                  >
                    Try example
                  </Button>
                )}
                <Button
                  className="min-h-[52px] rounded-[16px] bg-[#ffcd17] px-5 text-base text-slate-900 hover:bg-[#ffc400] active:bg-[#f0b900]"
                  loading={tweetLoading}
                  disabled={tweetLoading}
                  onClick={submitUrl}
                >
                  Generate Video
                </Button>
              </div>
            </>
          )}

        </div>
      </form>
      {error && (
        <ErrorComp message={error}></ErrorComp>
      )}
    </div>
  );
};
