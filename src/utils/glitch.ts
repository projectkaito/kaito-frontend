import glitch from "glitch-canvas";
import { createGIF } from "gifshot";
import { getBase64 } from "./index";
import hash from "hash.js";

export const getGlitchImg = (url: string, iteration: number, callback?: () => void) =>
  new Promise<string>(async (res) => {
    let img = new Image();
    img.src = url;
    img.onload = async () => {
      let dataURL = await glitch({ amount: 60, seed: 84, quality: 55, iterations: iteration })
        .fromImage(img)
        .toDataURL();
      res(dataURL);
    };
  });

export const getMultipleGlitchImages = (base64: string, number: number) =>
  new Promise<string[]>(async (res) => {
    let promiseArr = [];
    for (let i = 1; i <= number; i++) {
      promiseArr.push(getGlitchImg(base64, i));
    }
    let images = await Promise.all(promiseArr);
    res(images);
  });

export const getGlitchImagesForMultpleImages = (base64: string[]) =>
  new Promise<string>(async (res) => {
    let sha256 = hash.sha256().update(base64.toString()).digest("hex");
    let storedHash = localStorage.getItem("gifhash");
    // console.log(storedHash, sha256, base64);
    if (storedHash === sha256 && localStorage.getItem("gif")) {
      res(localStorage.getItem("gif")!);
      return;
    }
    let promiseArr = [];
    for (let i = 0; i < base64.length; i++) {
      promiseArr.push(getMultipleGlitchImages(base64[i], 10));
    }
    let images = await Promise.all(promiseArr);
    // string of strings to one string
    let finalImages = images.reduce((acc, curr) => acc.concat(curr), []);
    console.log("glitch done creating gif now");
    let response = await imagesToGif(finalImages);
    localStorage.setItem("gif", response);
    localStorage.setItem("gifhash", sha256);
    res(response);
  });

export const imagesToGif = (images: string[]) =>
  new Promise<string>((res) => {
    const options = {
      images: images,
      gifWidth: 500,
      gifHeight: 300,
      numWorkers: 5,
      frameDuration: 0.01,
      sampleInterval: 10,
    };

    createGIF(options, (obj: any) => {
      if (!obj.error) {
        res(obj.image);
      }
    });
  });

export { getBase64 };
