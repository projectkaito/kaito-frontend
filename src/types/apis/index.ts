export interface WhitelistInfo {
  status?: "true" | "false";
  signature?: string;
  deadline?: number;
  userType?: "user" | "team";
  quantity?: number;
}
