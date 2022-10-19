import type { NextPage } from "next";
import Image from "next/image";

import {
  useAddress,
  useContract,
  ConnectWallet,
  useListings,
  useActiveListings,
} from "@thirdweb-dev/react";
import { BigNumberish } from "ethers";

import { EtherIcon, UserIcon } from "../components/shared/icons";
import { Error, Loading } from "../components/shared/ui";

const MarketplacePage: NextPage = () => {
  const address = useAddress();

  const { contract } = useContract(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS,
    "marketplace"
  );
  const { data: listings, isLoading, error } = useActiveListings(contract);

  const onBuyNFT = async (tokenId: BigNumberish) => {
    try {
      await contract?.buyoutListing(tokenId, 1);
    } catch (error) {
      console.log(error);
    }
  };

  if (!address) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ConnectWallet />
      </div>
    );
  } else if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return (
    <section className="md:h-full flex items-center text-gray-600">
      <div className="max-w-7xl px-5 py-24 mx-auto w-full">
        <div className="flex flex-wrap -m-4">
          {listings?.map((listing) => (
            <div key={listing.id} className="p-4 sm:w-1/2 lg:w-1/3 w-full">
              <div className="shadow-lg border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <div className="h-80 lg:h-80 md:h-80 w-full relative">
                  <Image
                    src={listing?.asset?.image || ""}
                    alt="Picture of the author"
                    layout="fill"
                    className="object-cover object-center"
                  />
                </div>
                <div className="p-6 hover:bg-indigo-50 hover:text-black transition duration-300 ease-in">
                  <h3 className="text-2xl font-semibold mb-3 uppercase">
                    {listing?.asset?.name}
                  </h3>
                  <h4 className="flex justify-start items-center flex-nowrap mb-3">
                    <UserIcon />
                    <span className="ml-2 truncate text-xs">
                      {listing?.sellerAddress}
                    </span>
                  </h4>

                  <div className="flex justify-between items-center flex-wrap ">
                    <button
                      type="button"
                      className="bg-gray-200 py-2 px-5 text-md font-medium text-gray-900 rounded-lg inline-flex items-center"
                      onClick={() => onBuyNFT(listing?.tokenId)}
                    >
                      Buy now..
                    </button>
                    <div className="flex justify-center items-center">
                      <EtherIcon />
                      <span className="text-md font-bold">
                        {listing.buyoutCurrencyValuePerToken.displayValue}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MarketplacePage;
