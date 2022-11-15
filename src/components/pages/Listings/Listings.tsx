import { useContract, useListings } from "@thirdweb-dev/react";
import { DirectListing } from "@thirdweb-dev/sdk";

import { ErrorMessage } from "components/shared/core";
import { ReactNode } from "react";

interface Props {
  children: (listings: DirectListing[], isLoading: boolean) => ReactNode;
}

export const Listings: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const { data: listings = [], isLoading, error } = useListings(contract);

  if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <ErrorMessage>{errorParsed?.reason}</ErrorMessage>;
  }

  return <>{children(listings as DirectListing[], isLoading)}</>;
};
