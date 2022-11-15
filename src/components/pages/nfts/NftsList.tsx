import { ReactNode } from "react";

import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

import { ErrorMessage } from "components/shared/core";

interface Props {
  children: (listings: NFT[], isLoading: boolean) => ReactNode;
}

export const NftList: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS);
  const { data: nfts = [], isLoading, error } = useNFTs(contract);

  if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <ErrorMessage>{errorParsed?.reason}</ErrorMessage>;
  }

  return <>{children(nfts, isLoading)}</>;
};
