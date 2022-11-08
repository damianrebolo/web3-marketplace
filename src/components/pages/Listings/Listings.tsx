import { useContract, useListings } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";

import { Loading, Error } from "components/shared/core";
import { ReactNode } from "react";

interface Props {
  children: (listings: (DirectListing | AuctionListing)[]) => ReactNode;
}

export const Listings: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const { data: listings = [], isLoading, error } = useListings(contract, { start: 0, count: 100 });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return <>{children(listings)}</>;
};
