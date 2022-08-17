import React, { useState } from "react";
import { getWhitelistInfo } from "src/api/whitelist";
import { WhitelistInfo, WhitelistUserType } from "src/types/apis";
import { Kaito } from "src/types/contract/Kaito";
import useNotify from "./useNotify";
import { useNavigate } from "react-router-dom";
import abi from "src/assets/abi/Kaito.json";
import { ContractReceipt, ethers } from "ethers";
import useWallet from "./useWallet";
import { useContract, useContractReads } from "wagmi";
import { Contracts } from "src/config";

const whitelistContractInfo = {
  contractInterface: abi,
  addressOrName: Contracts.kaitoWhitelist,
};

interface ReadContract {
  contractInterface: any;
  addressOrName: string;
  functionName: string;
  args?: any[];
}

export interface Stats {
  maxPublicMintPerWallet: number;
  maxWhitelistMintPerWallet: number;
  maxTeamMintPerWallet: number;
  publicMintStartTimestamp: number;
  teamMintStartTimestamp: number;
  whitelistMintStartTimestamp: number;
  numberMinted: number;
  teamClaim: boolean;
  whitelistClaim: boolean;
}

const mapContractReads = (data?: any) => {
  try {
    if (data) {
      const obj: Stats = {
        maxPublicMintPerWallet: data[0].toNumber(),
        maxWhitelistMintPerWallet: data[1].toNumber(),
        maxTeamMintPerWallet: data[2].toNumber(),
        publicMintStartTimestamp: data[3].toNumber(),
        teamMintStartTimestamp: data[4].toNumber(),
        whitelistMintStartTimestamp: data[5].toNumber(),
        numberMinted: data[6].toNumber(),
        teamClaim: data[7],
        whitelistClaim: data[8],
      };
      return obj;
    } else return undefined;
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

const useWhitelist = () => {
  const { account, signer, provider } = useWallet();

  const readContracts: ReadContract[] = React.useMemo(
    () => [
      {
        ...whitelistContractInfo,
        functionName: "maxPublicMintPerWallet",
      },
      {
        ...whitelistContractInfo,
        functionName: "maxWhitelistMintPerWallet",
      },
      {
        ...whitelistContractInfo,
        functionName: "maxTeamMintPerWallet",
      },
      {
        ...whitelistContractInfo,
        functionName: "publicMintStartTimestamp",
      },
      {
        ...whitelistContractInfo,
        functionName: "teamMintStartTimestamp",
      },
      {
        ...whitelistContractInfo,
        functionName: "whitelistMintStartTimestamp",
      },
      {
        ...whitelistContractInfo,
        functionName: "numberMinted",
        args: [account],
      },
      {
        ...whitelistContractInfo,
        functionName: "teamClaim",
        args: [account],
      },
      {
        ...whitelistContractInfo,
        functionName: "whitelistClaim",
        args: [account],
      },
    ],
    [account]
  );

  const contract = useContract<Kaito>({
    signerOrProvider: signer || provider,
    ...whitelistContractInfo,
  });
  const { dismissNotify, notifyLoading, notifyError, notifySuccess, notifySystem } = useNotify();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { data } = useContractReads({
    contracts: readContracts,
    watch: true,
  });
  const stats = React.useMemo(() => mapContractReads(data), [data]);

  const [whitelistInfo, setWhitelistInfo] = React.useState<WhitelistInfo>();

  const callMint = async (type?: WhitelistUserType) => {
    if (whitelistInfo?.status && type === WhitelistUserType.Whitelist) {
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
    } else if (whitelistInfo?.status && type === WhitelistUserType.Team) {
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
      let tx = await contract?.mint(1);
      let reciept = await tx.wait();
      return reciept;
    }
  };

  const mint = async (type?: WhitelistUserType) => {
    let noti = notifyLoading("Minting...", "Minting Token Please Wait...");
    setLoading(true);
    try {
      let reciept = await callMint(type);
      let args = printLastEvent(reciept, abi);
      let tokenId = args.tokenId.toNumber();
      console.log(tokenId);
      notifySuccess(`Minted Token ${tokenId}`, "Minted Token Successfully");
      navigate(`/nft/${Contracts.kaitoWhitelist}/${tokenId}`);
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

  return { whitelistInfo, loading, mint, stats };
};

export default useWhitelist;
