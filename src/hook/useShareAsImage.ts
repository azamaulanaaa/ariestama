import { useEffect } from "react";
import { useToBlob } from "@hugocxl/react-to-image";

export const useShareAsImage = <T extends HTMLElement>(): [
  (domNode: T) => void,
  () => void,
  boolean,
] => {
  const [state, capture, captureRef] = useToBlob<T>();

  useEffect(() => {
    if (state.data && state.isSuccess) {
      const file = new File([state.data], "image.png", { type: "image/png" });

      if (navigator.canShare({ files: [file] })) {
        navigator.share({ files: [file] }).catch((e) => {
          if (e.name !== "AbortError") {
            console.error("Sharing failed:", e);
          }
        });
      } else {
        console.warn(
          "Web Share API for files is not supported on this device/browser.",
        );
      }
    }
  }, [state.isSuccess]);

  return [captureRef, capture, state.isLoading];
};
