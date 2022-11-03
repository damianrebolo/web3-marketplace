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

  return <div className="w-full max-w-7xl px-5 py-5 mx-auto">{children(listings, contract)}</div>;
};
