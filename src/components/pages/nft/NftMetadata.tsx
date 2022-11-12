import { useContract, useListing } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";

import { Loading, ErrorMessage } from "components/shared/core";
import { ReactNode } from "react";

interface Props {
  children: (listing: DirectListing) => ReactNode;
  id: string;
}

export const NftMetadata: React.FC<Props> = ({ children, id }) => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const { data: listing, isLoading, error } = useListing(contract, id as string);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    return <ErrorMessage>Could not find listing.</ErrorMessage>;
  }

  return <>{children(listing as DirectListing)}</>;
};
