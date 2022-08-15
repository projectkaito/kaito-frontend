import { whiteListApiCall } from "src/config/apiConfig";
import { WhitelistInfo } from "src/types/apis";

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
