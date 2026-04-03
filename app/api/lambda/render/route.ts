import { executeApi } from "../../../../helpers/api-response";
import { startLocalRender } from "../../../../lib/local-render";
import { normalizeRenderSettings } from "../../../../lib/tweet-render";
import { TweetDefinitelyExists } from "../../../../types/constants";
import { RenderRequest } from "../../../../types/schema";
import { getTweetById } from "../../twitter/fetch-tweet/getTweetById";

export const runtime = "nodejs";

export const POST = executeApi<{
  bucketName: string;
  renderId: string;
}, typeof RenderRequest>(
  RenderRequest,
  async (req, body) => {
    const tweet = await getTweetById(body.tweetId);
    const renderSettings = normalizeRenderSettings(tweet, body.renderSettings);
    const inputProps: TweetDefinitelyExists = {
      tweet,
      renderSettings,
    };

    return startLocalRender({
      compositionId: body.id,
      inputProps,
    });
  },
);
