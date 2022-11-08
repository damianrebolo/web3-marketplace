import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

import { Loading, Error } from "components/shared/core";
import { ReactNode } from "react";

interface Props {
  children: (listings: NFT[]) => ReactNode;
}

export const NftList: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS);
  const { data: nfts = [], isLoading, error } = useNFTs(contract, { start: 0, count: 100 });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return <>{children(nfts)}</>;
};
