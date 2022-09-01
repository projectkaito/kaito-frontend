import { whiteListApiCall } from "src/config/apiConfig";
import { WhitelistInfo, WhitelistUserType } from "src/types/apis";

export const getWhitelistInfo = async (address: string) => {
  const rawResponse = await whiteListApiCall.get("/signature/" + address);
  const response = rawResponse.data;
  return {
    status: response.status,
    signature: response.data?.signature,
    deadline: response.data?.deadline,
    userType: response.data?.userType,
    quantity: response.data?.quantity,
  } as WhitelistInfo;
};

export const addToWhitelist = async (address: string, quantity: number, type: WhitelistUserType) => {
  try {
    const rawResponse = await whiteListApiCall.post(`/add-to-whitelist/${address}?type=${type}&quantity=${quantity}`);
    const response = rawResponse.data;
    console.log(response);
    return {
      status: response.status,
      message: response.message,
    };
  } catch (error: any) {
    console.log(error.error);
    return {
      status: false,
    };
  }
};

export const removefromWhitelist = async (address: string) => {
  try {
    const rawResponse = await whiteListApiCall.post(`/remove-from-whitelist/${address}`);
    const response = rawResponse.data;
    console.log(response);
    return {
      status: response.status,
      message: response.message,
    };
  } catch (error: any) {
    console.log(error);
    return {
      status: false,
    };
  }
};
