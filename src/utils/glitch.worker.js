import glitch from "glitch-canvas";
import { createGIF } from "gifshot";
import { getBase64 } from "./index";

const getGlitchImg = (url: string, iteration: number, callback?: () => void) =>
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

const getMultipleGlitchImages = (base64: string, number: number) =>
  new Promise<string[]>(async (res) => {
    let promiseArr = [];
    for (let i = 1; i <= number; i++) {
      promiseArr.push(getGlitchImg(base64, i));
    }
    let images = await Promise.all(promiseArr);
    res(images);
  });

const getGlitchImagesForMultpleImages = (base64: string[]) =>
  new Promise<string[]>(async (res) => {
    let promiseArr = [];
    for (let i = 0; i < base64.length; i++) {
      promiseArr.push(getMultipleGlitchImages(base64[i], 10));
    }
    let images = await Promise.all(promiseArr);
    // string of strings to one string
    let finalImages = images.reduce((acc, curr) => acc.concat(curr), []);
    res(finalImages);
  });

const imagesToGif = (images: string[]) =>
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
        console.log("GIF Image: ", obj.image);
        res(obj.image);
      }
    });
  });

// @ts-ignore
self.onmessage = async function (e) {
  console.log("inworker", e);
};
