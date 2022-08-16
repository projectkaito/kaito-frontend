import React, { useState } from "react";
import { useWallet } from "@react-dapp/wallet";
import { getWhitelistInfo } from "src/api/whitelist";
import { WhitelistInfo } from "src/types/apis";
import { useContract } from "@react-dapp/utils";
import { MINT_CONTRACT } from "src/config/config";
import { Kaito } from "src/types/contract/Kaito";
import useNotify from "./useNotify";
import { useNavigate } from "react-router-dom";
import abi from "src/assets/abi/Kaito.json";
import { ContractReceipt, ethers } from "ethers";

const useWhitelist = () => {
  const { account } = useWallet();
  const contract = useContract<Kaito>(abi, MINT_CONTRACT);
  const { dismissNotify, notifyLoading, notifyError, notifySuccess, notifySystem } = useNotify();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [whitelistInfo, setWhitelistInfo] = React.useState<WhitelistInfo>();

  const callMint = async () => {
    if (whitelistInfo?.status === "true" && whitelistInfo.userType === "user") {
      console.log("whitelist");
      let splitted = ethers.utils.splitSignature(whitelistInfo?.signature!);
      let tx = contract?.mintWhitelist(
        whitelistInfo.deadline,
        whitelistInfo.quantity,
        splitted.v,
        splitted.r,
        splitted.s
      );
      let reciept = await tx.wait();
      return reciept;
    } else if (whitelistInfo?.status === "true" && whitelistInfo.userType === "team") {
      let splitted = ethers.utils.splitSignature(whitelistInfo?.signature!);
      let tx = contract?.mintTeam(whitelistInfo.deadline, whitelistInfo.quantity, splitted.v, splitted.r, splitted.s);
      let reciept = await tx.wait();
      return reciept;
    } else {
      let tx = await contract?.mint(1);
      let reciept = await tx.wait();
      return reciept;
    }
  };

  const mint = async () => {
    let noti = notifyLoading("Minting...", "Minting Token Please Wait...");
    setLoading(true);
    try {
      let reciept = await callMint();
      let args = printLastEvent(reciept, abi);
      let tokenId = args.tokenId.toNumber();
      console.log(tokenId);
      notifySuccess(`Minted Token ${tokenId}`, "Minted Token Successfully");
      navigate(`/nft/${MINT_CONTRACT}/${tokenId}`);
    } catch (error: any) {
      let msg =
        error?.error?.message
          .replace("Error: VM Exception while processing transaction: reverted with reason string ", "")
          .replace("execution reverted:", "") || "Error Occured!";
      notifyError("Error", msg);
      notifySystem("Error", msg, "ERROR");
      console.log(JSON.stringify(error));
    } finally {
      setLoading(false);
      dismissNotify(noti);
    }
  };

  function printLastEvent(receipt: ContractReceipt, abi: any) {
    let iface = new ethers.utils.Interface(abi);
    let args = iface.parseLog(receipt.logs[receipt.logs.length - 1]).args;
    return args;
  }

  React.useEffect(() => {
    if (!account) return;
    getWhitelistInfo(account).then((res) => {
      setWhitelistInfo(res);
    });
  }, [account]);

  return { whitelistInfo, loading, mint };
};

export default useWhitelist;
