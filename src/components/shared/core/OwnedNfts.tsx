import { useAddress, useContract, useOwnedNFTs } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

import { Loading, ErrorMessage } from "components/shared/core";
import { ReactNode } from "react";

interface Props {
  children: (nfts: NFT[]) => ReactNode;
}

export const OwnedNfts: React.FC<Props> = ({ children }) => {
  const address = useAddress() as string;
  const { contract: nftCollection } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS, "nft-collection");
  const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(nftCollection, address);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <ErrorMessage>{errorParsed?.reason}</ErrorMessage>;
  }

  return <>{children(ownedNFTs as NFT[])}</>;
};
