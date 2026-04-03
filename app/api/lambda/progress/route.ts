import { executeApi } from "../../../../helpers/api-response";
import { getLocalRenderProgress } from "../../../../lib/local-render";
import { ProgressRequest, ProgressResponse } from "../../../../types/schema";

export const runtime = "nodejs";

export const POST = executeApi<ProgressResponse, typeof ProgressRequest>(
  ProgressRequest,
  async (req, body) => {
    const job = getLocalRenderProgress(body.id);
    if (!job) {
      return {
        type: "error",
        message: "Render job not found.",
      };
    }

    if (job.status === "error") {
      return {
        type: "error",
        message: job.error,
      };
    }

    if (job.status === "done") {
      return {
        type: "done",
        url: job.publicUrl,
        size: job.size,
      };
    }

    return {
      type: "progress",
      progress: job.progress,
    };
  },
);
