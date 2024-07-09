import { AwsRegion } from "@remotion/lambda/client";
import {
  renderMediaOnLambda,
  speculateFunctionName,
} from "@remotion/lambda/client";
import { DISK, RAM, REGION, SITE_NAME, TIMEOUT } from "../../../../config.mjs";
import { executeApi } from "../../../../helpers/api-response";
import { RenderRequest } from "../../../../types/schema";
import { TweetDefinitelyExists } from "../../../../types/constants";
import { getTweetById } from "../../twitter/fetch-tweet/getTweetById";
import { supabase } from "../../supabase";

export const POST = executeApi<{
  bucketName: string;
  renderId: string;
}, typeof RenderRequest>(
  RenderRequest,
  async (req, body) => {
    if (
      !process.env.AWS_ACCESS_KEY_ID &&
      !process.env.REMOTION_AWS_ACCESS_KEY_ID
    ) {
      throw new TypeError(
        "Set up Remotion Lambda to render videos. See the README.md for how to do so.",
      );
    }
    if (
      !process.env.AWS_SECRET_ACCESS_KEY &&
      !process.env.REMOTION_AWS_SECRET_ACCESS_KEY
    ) {
      throw new TypeError(
        "The environment variable REMOTION_AWS_SECRET_ACCESS_KEY is missing. Add it to your .env file.",
      );
    }


    // RETRIEVE FROM CACHE

    // const { data: renders } = await supabase
    //   .from('renders')
    //   .select("*")
    //   .eq('tweet_id', body.tweetId)

    // if (renders && renders.length > 0) {
    //   return {
    //     bucketName: renders[0].bucket_name,
    //     renderId: renders[0].render_id,
    //   }
    // }

    const tweet = await getTweetById(body.tweetId);

    const inputProps: TweetDefinitelyExists = {
      tweet,
      renderSettings: body.renderSettings
    }

    const result = await renderMediaOnLambda({
      codec: "h264",
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      serveUrl: SITE_NAME,
      composition: body.id,
      inputProps,
      downloadBehavior: {
        type: "download",
        fileName: `${body.tweetId}.mp4`,
      },
    });

    await supabase
      .from('renders')
      .insert([
        {
          render_id: result.renderId,
          bucket_name: result.bucketName,
          tweet_id: body.tweetId,
          tweet: tweet,
        }
      ])
      .select()

    return {
      bucketName: result.bucketName,
      renderId: result.renderId,
    };
  },
);
