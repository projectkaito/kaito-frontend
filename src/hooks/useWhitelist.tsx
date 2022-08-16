import React, { useState } from "react";
import { getWhitelistInfo } from "src/api/whitelist";
import { WhitelistInfo } from "src/types/apis";
import { MINT_CONTRACT } from "src/config/config";
import { Kaito } from "src/types/contract/Kaito";
import useNotify from "./useNotify";
import { useNavigate } from "react-router-dom";
import abi from "src/assets/abi/Kaito.json";
import { ContractReceipt, ethers } from "ethers";
import useWallet from "./useWallet";
import { useContract } from "wagmi";

const useWhitelist = () => {
  const { account, signer, provider } = useWallet();
  const contract = useContract<Kaito>({
    contractInterface: abi,
    addressOrName: MINT_CONTRACT!,
    signerOrProvider: signer || provider,
  });
  const { dismissNotify, notifyLoading, notifyError, notifySuccess, notifySystem } = useNotify();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [whitelistInfo, setWhitelistInfo] = React.useState<WhitelistInfo>();

  const callMint = async (type?: "user" | "team") => {
    console.log(type, whitelistInfo?.status);
    if (whitelistInfo?.status && type === "user") {
      console.log("whitelist");
      let splitted = ethers.utils.splitSignature(whitelistInfo?.signature!);
      let tx = await contract?.mintWhitelist(
        whitelistInfo.deadline!.toString(),
        whitelistInfo.quantity!.toString(),
        splitted.v,
        splitted.r,
        splitted.s
      );
      let reciept = await tx.wait();
      return reciept;
    } else if (whitelistInfo?.status && type === "team") {
      console.log("team");
      let splitted = ethers.utils.splitSignature(whitelistInfo?.signature!);
      let tx = await contract?.mintTeam(
        whitelistInfo.deadline!.toString(),
        whitelistInfo.quantity!.toString(),
        splitted.v,
        splitted.r,
        splitted.s
      );
      let reciept = await tx.wait();
      return reciept;
    } else {
      console.log("default mint");
      let tx = await contract?.mint(1);
      let reciept = await tx.wait();
      return reciept;
    }
  };

  const mint = async (type?: "user" | "team") => {
    let noti = notifyLoading("Minting...", "Minting Token Please Wait...");
    setLoading(true);
    try {
      let reciept = await callMint(type);
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
