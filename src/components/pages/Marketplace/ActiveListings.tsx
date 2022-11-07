import { ReactNode } from "react";

import { useContract, useActiveListings } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing, Marketplace } from "@thirdweb-dev/sdk";

import { Loading, Error } from "../../shared/core";
import { GridContainer } from "components/shared/ui";

interface Props {
  children: (listings: (AuctionListing | DirectListing)[] | undefined) => ReactNode;
}

export const ActiveListings = ({ children }: Props) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE, "marketplace");
  const { data: listings, isLoading, error } = useActiveListings(contract);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return <GridContainer>{children(listings)}</GridContainer>;
};
