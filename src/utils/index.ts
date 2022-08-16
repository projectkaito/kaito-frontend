import { BigNumberish, ethers } from "ethers";
import { getType, Type } from "tst-reflect";
import BigNumber from "bignumber.js";

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @reflect
 */
export function getDefaultValues<T>(objType: Type | undefined = undefined) {
  let obj: { [key: string | number | symbol]: any } = {};
  objType = objType ?? getType<T>();

  objType.getProperties().forEach((prop) => {
    if (prop.type.isString()) {
      obj[prop.name] = "";
    } else if (prop.type.isNumber() || prop.type.isEnum()) {
      obj[prop.name] = 0;
    } else if (prop.type.isBoolean()) {
      obj[prop.name] = false;
    } else if (prop.type.isArray()) {
      obj[prop.name] = [];
    } else if (prop.type.isAssignableTo(Type.Undefined)) {
      obj[prop.name] = undefined;
    } else if (prop.type.isAssignableTo(Type.Null)) {
      obj[prop.name] = null;
    } else if (prop.type.isObjectLike()) {
      obj[prop.name] = getDefaultValues(prop.type);
    }
  });

  return obj as T;
}

export const getBase64 = (file: File | Blob | string) =>
  new Promise<string>(async (resolve, reject) => {
    if (typeof file === "string") {
      const response = await fetch(file);
      const blob = await response.blob();
      file = blob;
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result as string);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
      reject(error);
    };
  });

const handleFormInput = (data: any, key: string, formData: FormData) => {
  if (Array.isArray(data)) {
    data.forEach((item, index) => {
      handleFormInput(item, `${key}[${index}]`, formData);
    });
  } else if (data instanceof File || data instanceof Blob) {
    formData.append(key, data);
  } else if (typeof data === "object") {
    for (const [k, v] of Object.entries(data)) {
      handleFormInput(v, `${key}[${k}]`, formData);
    }
  } else {
    formData.append(key, data);
  }
};

export const shapeFormData = (data: any) => {
  let formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    handleFormInput(value, key, formData);
  }
  return formData;
};

export const truncateAddress = (address?: string) => {
  if (!address) return "No Account";
  const match = address.match(/^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/);
  if (!match) return address;
  return `${match[1]}…${match[2]}`;
};

export const toHex = (num: number) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

export const toEth = (wei: BigNumberish) => {
  return ethers.utils.formatEther(wei);
};

export const toWei = (eth: string | number) => {
  return ethers.utils.parseEther(eth.toString());
};

/**
 * To convert ethers bignumber to bignumber.js
 * @param value is the BigNumber from ethers.js
 * @returns BigNumber of bignumber.js
 */
export const toBigNumber = (value: any): BigNumber => {
  if (!value) return new BigNumber(0);
  if (value._isBigNumber) return new BigNumber(value?.toHexString ? value.toHexString() : value);
  if (value.type === "BigNumber") return new BigNumber(value.hex);
  return new BigNumber(String(value));
};

/**
 * Fetch IPFS data
 *
 * @param ipfsUrl IPFS url of the metadata
 * @returns json object of the metadata
 */
export const fetchIpfs = (ipfsUrl: string) =>
  new Promise(async (resolve) => {
    let url = `https://ipfs.io/${ipfsUrl.replace("ipfs://", "")}`;
    let response = await fetch(url);
    const data = await response.json();
    if (data?.image?.includes("ipfs://")) {
      data.image = `https://ipfs.io/${data.image.replace("ipfs://", "")}`;
    }
    resolve(data);
  });
