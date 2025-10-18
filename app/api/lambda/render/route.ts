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
import { supabase } from "../../../../lib/supabase-status";
import crypto from 'crypto';

export const POST = executeApi<{
  bucketName: string;
  renderId: string;
}, typeof RenderRequest>(
  RenderRequest,
  async (req, body) => {
    const version = (process.env as any).version as string
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

    const sortedRenderSettingsJson = JSON.stringify(body.renderSettings, Object.keys(body.renderSettings).sort());
    const renderSettingsMd5 = crypto.createHash('md5').update(sortedRenderSettingsJson).digest('hex');
    const uniquekey = `${body.tweetId}-${version}-${renderSettingsMd5}`

    // RETRIEVE FROM CACHE

    if (supabase) {
      const { data: renders } = await supabase
        .from('renders')
        .select("*")
        .eq('uniquekey', uniquekey)

      console.log(`searched in cache (${uniquekey})`)

      if (renders && renders.length > 0) {
        console.log(`Found existing render (${uniquekey}) ->`, renders[0].render_id)
        return {
          bucketName: renders[0].bucket_name,
          renderId: renders[0].render_id,
        }
      }
    }

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

    // CACHE THE RENDER
    if (supabase) {
      await supabase
        .from('renders')
        .insert([
          {
            render_id: result.renderId,
            bucket_name: result.bucketName,
            tweet_id: body.tweetId,
            tweet: tweet,
            version,
            render_settings: body.renderSettings,
            uniquekey
          }
        ])
        .select()

      console.log(`saved to cache -> ${result.renderId}`)
    }

    return {
      bucketName: result.bucketName,
      renderId: result.renderId,
    };
  },
);
