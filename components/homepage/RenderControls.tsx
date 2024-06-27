import { useRendering } from "../../helpers/use-rendering";
import { COMP_NAME, TweetDefinitelyExists } from "../../types/constants";
import { DownloadButton } from "./DownloadButton";
import { ErrorComp } from "../generic/Error";
import { ProgressBar } from "../generic/ProgressBar";
import { Button } from "../generic/Button";
import { FaLink } from "react-icons/fa";
import QRCode from "react-qr-code";

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
      {(state.status === "done" && (
        <div className="flex mt-12 gap-7">
          <div className="font-geist font-bold text-left text-3xl mr-auto" style={{maxWidth: 400}} >Scan QR code to download the video on your phone.</div>
          <QRCode value={state.url} style={{maxWidth: "200px", width: "100%", height: "auto"}} bgColor="transparent" />
        </div>
      ))}
    </div>
  );
};
