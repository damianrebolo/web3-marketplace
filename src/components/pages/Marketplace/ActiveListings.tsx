import { ReactNode } from "react";

import { useContract, useActiveListings } from "@thirdweb-dev/react";
import { DirectListing } from "@thirdweb-dev/sdk";

import { Loading, ErrorMessage } from "../../shared/core";
import { GridContainer } from "components/shared/ui";

interface Props {
  children: (listings: DirectListing[]) => ReactNode;
}

export const ActiveListings = ({ children }: Props) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE, "marketplace");
  const { data: listings = [], isLoading, error } = useActiveListings(contract);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <ErrorMessage>{errorParsed?.reason}</ErrorMessage>;
  }

  return <GridContainer>{children(listings as DirectListing[])}</GridContainer>;
};
