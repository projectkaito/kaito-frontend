import { ContractReceipt, ethers } from "ethers";
import React from "react";
import { useNavigate } from "react-router-dom";
import abi from "src/assets/abi/Kaito.json";
import { MINT_CONTRACT } from "src/config/config";
import { Kaito } from "src/types/contract/Kaito";
import { useContract } from "wagmi";
import useNotify from "./useNotify";
import useWallet from "./useWallet";

const useTeamMint = () => {
  const { signer, provider } = useWallet();
  const contract = useContract<Kaito>({
    addressOrName: MINT_CONTRACT!,
    contractInterface: abi,
    signerOrProvider: signer || provider,
  });
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
      navigate(`/nft/${MINT_CONTRACT}/${tokenId}`);
    } catch (error: any) {
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
