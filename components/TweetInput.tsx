import { z } from "zod";
import { TweetSchema } from "../types/constants";
import { Button } from "./Button";
import { InputContainer } from "./Container";
import { ErrorComp } from "./Error";
import { Input } from "./Input";
import { useState } from "react";
import { fetchTweet } from "../lambda/api";

export const TweetInput: React.FC<{
  tweet: z.infer<typeof TweetSchema> | null;
  setTweet: React.Dispatch<React.SetStateAction<z.infer<typeof TweetSchema> | null>>;
}> = ({ tweet, setTweet }) => {

  const [tweetUrlInput, setTweetUrlInput] = useState<string>("");
  const [tweetLoading, setTweetLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex flex-col">
      <form name="pull-tweet" onSubmit={e => e.preventDefault()}>
        <InputContainer>

          {(
            <>
              <Input
                placeholder="Tweet URL"
                name="tweet-url"
                className="text-cursive font-geist"
                disabled={tweetLoading}
                setText={setTweetUrlInput}
                text={tweetUrlInput}
              ></Input>
              <Button
                loading={tweetLoading}
                onClick={async () => {
                  const tweetIdString = new URL(tweetUrlInput).pathname.split("/").pop() ?? ""
                  try {
                    const tweetId = BigInt(tweetIdString).toString()
                    setTweetLoading(true);
                    try {
                      const tweet = await fetchTweet(tweetId)
                      setTweet(tweet);
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
                }}
              >
                Generate Video
              </Button>
            </>
          )}

        </InputContainer>
      </form>
      {error && (
        <ErrorComp message={error}></ErrorComp>
      )}
    </div>
  );
};
