import { ReactNode } from "react";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { NFT } from "@thirdweb-dev/sdk";

import { Loading } from "components/shared/core";

interface Pagination {
  start: number;
  count: number;
}

interface Props {
  children: (listings: NFT[]) => ReactNode;
  pagination: Pagination;
}

export const NftList: React.FC<Props> = ({ children, pagination }) => {
  const { start, count } = pagination;
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS);
  const { data: nfts = [], isLoading } = useNFTs(contract, { start, count });

  if (isLoading) {
    return <Loading />;
  }

  return <>{children(nfts)}</>;
};
