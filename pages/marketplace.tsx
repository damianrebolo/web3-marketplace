import type { NextPage } from "next";
import Image from "next/image";

import {
  useAddress,
  useContract,
  ConnectWallet,
  useListings,
} from "@thirdweb-dev/react";

import { EtherIcon } from "../components/shared/icons";

const MarketplacePage: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(
    "0x0648fcF3742ed3CF338E92049da56b6C1720b296",
    "marketplace"
  );
  const { data: listings, isLoading, error } = useListings(contract);

  if (!address) {
    return <ConnectWallet />;
  } else if (isLoading) {
    return <div>Loading...</div>;
  } else if (error) {
    return <div>Error</div>;
  }

  return <pre>{JSON.stringify(listings, undefined, 2)}</pre>;
};

export default MarketplacePage;
