import { useContract, useActiveListings } from "@thirdweb-dev/react";
import { AuctionListing, DirectListing } from "@thirdweb-dev/sdk";

import { Loading, Error } from "../../shared/ui";

interface Props {
  children: any;
}

export const ActiveListings: React.FC<Props> = ({ children }) => {
  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
    "marketplace"
  );
  const { data: listings, isLoading, error } = useActiveListings(contract);

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return children({ listings, contract });
};
