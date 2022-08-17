export interface WhitelistInfo {
  status?: "true" | "false";
  signature?: string;
  deadline?: number;
  userType?: WhitelistUserType;
  quantity?: number;
}

export enum WhitelistUserType {
  Whitelist = "whitelist",
  Team = "team",
}
