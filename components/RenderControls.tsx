import { useRendering } from "../helpers/use-rendering";
import { COMP_NAME, TweetDefinitelyExists } from "../types/constants";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "./Error";
import { ProgressBar } from "./ProgressBar";
import { Button } from "./Button";
import { FaLink } from "react-icons/fa";

export const RenderControls: React.FC<TweetDefinitelyExists> = (inputProps) => {
  const { renderMedia, state, undo } = useRendering(COMP_NAME, inputProps);

  return (
    <div className="flex flex-col">
      {(state.status === "init" ||
      state.status === "invoking" ||
      state.status === "error") && (
        <>
            <Button
            className="ml-auto"
              disabled={state.status === "invoking"}
              loading={state.status === "invoking"}
              onClick={renderMedia}
            >
              {state.status !== "invoking" && <FaLink className="mr-2" />} Generate Download Link
            </Button>
          {state.status === "error" ? (
            <ErrorComp message={state.error.message}></ErrorComp>
          ) : null}
        </>
      )}
      {(state.status === "rendering" || state.status === "done") && (
        <>
          <ProgressBar
            progress={state.status === "rendering" ? state.progress : 1}
          />
            <DownloadButton undo={undo} state={state}></DownloadButton>
        </>
      )}
    </div>
  );
};
