import { z } from "zod";
import { TweetSchema } from "../types/constants";
import { Button } from "./Button";
import { ErrorComp } from "./Error";
import { Input } from "./Input";
import { useEffect, useState } from "react";
import { fetchTweet } from "../lambda/api";
import clsx from "clsx";
import { useRouter, useSearchParams } from "next/navigation";

export const TweetInput: React.FC<{
  tweet: z.infer<typeof TweetSchema> | null;
  setTweet: React.Dispatch<React.SetStateAction<z.infer<typeof TweetSchema> | null>>;
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
          const tweet = await fetchTweet(tweetId)
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
          "flex border transition bg-white focus-within:border-yellow-200 focus-within:bg-white p-2 rounded-md",
          (tweet === null && !tweetLoading) ? "shadow-lg focus-within:shadow-none" : "shadow-none"
        )}>

          {(
            <>
              <Input
                placeholder="https://x.com/ImranKhanPTI/status/1800884147705315751/video/1"
                name="tweet-url"
                className="text-cursive font-geist mr-2"
                disabled={tweetLoading}
                setText={setTweetUrlInput}
                text={tweetUrlInput}
              ></Input>
              <Button
                loading={tweetLoading}
                disabled={tweetLoading}
                onClick={submitUrl}
              >
                Generate Video
              </Button>
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
