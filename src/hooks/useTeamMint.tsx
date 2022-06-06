// @ts-nocheck
import { MergeSharp } from "@mui/icons-material";
import { useContract } from "@react-dapp/utils";
import { ContractReceipt, ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import abi from "src/assets/abi/Kaito.json";
import { MINT_CONTRACT } from "src/config/config";
import { Kaito } from "src/types/contract/Kaito";
import useNotify from "./useNotify";

const useTeamMint = () => {
  const contract = useContract<Kaito>(abi, MINT_CONTRACT);
  const { dismissNotify, notifyLoading, notifyError, notifySuccess, notifySystem } = useNotify();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();

  const mintToken = async () => {
    let noti = notifyLoading("Minting...", "Minting Token Please Wait...");
    setLoading(true);
    try {
      let tx = await contract?.mint(1);
      let reciept = await tx.wait();
      let args = printLastEvent(reciept, abi);
      let tokenId = args.tokenId.toNumber();
      console.log(tokenId);
      notifySuccess(`Minted Token ${tokenId}`, "Minted Token Successfully");
      navigate(`/nft/address/${tokenId}`);
    } catch (error) {
      let msg =
        error?.data?.message.replace(
          "Error: VM Exception while processing transaction: reverted with reason string ",
          ""
        ) || "Error Occured!";
      notifyError("Error", msg);
      notifySystem("Error", msg, "ERROR");
      console.log(error);
    } finally {
      setLoading(false);
      dismissNotify(noti);
    }
  };

  // React.useEffect(() => {
  //   // @ts-ignore
  //   contract.setMaxMintPerWallet(2).then((re: any) => console.log(re));
  // }, [contract]);

  function printLastEvent(receipt: ContractReceipt, abi: any) {
    let iface = new ethers.utils.Interface(abi);
    let args = iface.parseLog(receipt.logs[receipt.logs.length - 1]).args;
    return args;
  }

  return { mintToken, loading };
};

export default useTeamMint;
