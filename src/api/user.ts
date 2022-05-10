import { apiCall } from "src/config/apiConfig";
import { UpdateUserProfileParams } from "src/types/userTypes";

export const updateUserProfile = async (data: UpdateUserProfileParams) => {
  let res = await apiCall.put(`users`, data);
  return res.data;
};

export const getUserApi = async () => {
  let res = await apiCall.get(`users`);
  return res.data;
};

export const checkShortUrl = async ({ shortUrl }: { shortUrl: string }) => {
  let res = await apiCall.get(`users/check-valid-url/${shortUrl}`);
  return res.data;
};

export const getSignatureMessage = async (address: string) => {
  const rawResponse = await apiCall.post("users/signature-message", { address: address });
  const response = rawResponse.data;
  return {
    message: response.message,
    status: response.status,
    data: response.data.message,
  };
};

export const verifySignature = async (address: string, signature: string) => {
  const rawResponse = await apiCall.post("users/verify-signature", { address: address, signature: signature });
  const response = rawResponse.data;
  return {
    status: response.status,
  };
};

export const loginUser = async (address: string, signature: string) => {
  const rawResponse = await apiCall.post("users/login", { address: address, signature: signature });
  const response = rawResponse.data;
  return {
    status: response.status,
    data: response.data,
  };
};
