import { executeApi } from "../../../../helpers/api-response";
import { RecentlyGrabbedRequest, RecentlyGrabbedResponse } from "../../../../types/schema";
import { supabase } from "../../supabase";

export const POST = executeApi<RecentlyGrabbedResponse, typeof RecentlyGrabbedRequest>(
  RecentlyGrabbedRequest,
  async (req, body) => {

    const { data: renders } = await supabase
      .from('renders')
      .select("*")
      .order("generated_at", { ascending: false })
      .limit(4)

    if (!renders) {
      return []
    }

    return renders
  }
);
