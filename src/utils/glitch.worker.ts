import { getGlitchImagesForMultpleImages, imagesToGif } from "./glitch";
import { exposeWorker } from "react-hooks-worker";

const workerFunction = async (e: string[]) => {
  // let res = await getGlitchImagesForMultpleImages(e);
  // let data = await imagesToGif(res);
  return false;
};

exposeWorker(workerFunction);
