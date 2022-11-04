import { ReactNode } from "react";

import { useContract, useActiveListings } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing, Marketplace } from "@thirdweb-dev/sdk";

import { Loading, Error } from "../../shared/core";

interface Props {
  children: (listings: (AuctionListing | DirectListing)[] | undefined, contract: Marketplace | undefined) => ReactNode;
}

export const ActiveListings = ({ children }: Props) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS, "marketplace");
  const { data: listings, isLoading, error } = useActiveListings(contract);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-10 py-10">
      {children(listings, contract)}
    </div>
  );
};
