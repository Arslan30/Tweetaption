import {
  speculateFunctionName,
  AwsRegion,
  getRenderProgress,
} from "@remotion/lambda/client";
import { DISK, RAM, REGION, TIMEOUT } from "../../../../config.mjs";
import { executeApi } from "../../../../helpers/api-response";
import { ProgressRequest, ProgressResponse } from "../../../../types/schema";
import { supabase } from "../../supabase";

export const POST = executeApi<ProgressResponse, typeof ProgressRequest>(
  ProgressRequest,
  async (req, body) => {
    const renderProgress = await getRenderProgress({
      bucketName: body.bucketName,
      functionName: speculateFunctionName({
        diskSizeInMb: DISK,
        memorySizeInMb: RAM,
        timeoutInSeconds: TIMEOUT,
      }),
      region: REGION as AwsRegion,
      renderId: body.id,
    });

    if (renderProgress.fatalErrorEncountered) {
      if (renderProgress.errors.length === 0) {
        return {
          type: "error",
          message: "An unknown fatal error occurred.",
        };
      }
      
      return {
        type: "error",
        message: renderProgress.errors[0].message,
      };
    }

    if (renderProgress.done) {
      console.log("render done ->", body.id)
      // UPDATE CACHE WITH FINAL RESULT
      if (supabase) {
        await supabase
          .from('renders')
          .update(
            {
              video_url: renderProgress.outputFile as string,
              size: renderProgress.outputSizeInBytes as number,
              generated_at: new Date(renderProgress.renderMetadata!.startedDate + (renderProgress.timeToFinish ?? 0)),
            }
          )
          .eq('render_id', body.id)
          .select()    
        
        console.log("updated status in cache ->", body.id)
      }

      return {
        type: "done",
        url: renderProgress.outputFile as string,
        size: renderProgress.outputSizeInBytes as number,
      };
    }

    return {
      type: "progress",
      progress: Math.max(0.03, renderProgress.overallProgress),
    };
  },
);
