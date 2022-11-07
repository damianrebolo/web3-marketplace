import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "components/shared/ui";
import { useContract, useListings } from "@thirdweb-dev/react";
import { Loading, Error } from "components/shared/core";
import { Button } from "components/shared/ui/Button";

import { cutAddress } from "utils";
import { ethers } from "ethers";

const ListingsPage: NextPage = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const { data: listings, isLoading, error } = useListings(contract, { start: 0, count: 100 });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return (
    <Container className="m-10">
      <h2 className="my-5 font-semibold text-xl text-gray-700 dark:text-white">Contract Listings</h2>

      <div className="overflow-x-auto relative my-10">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Listing Id
              </th>
              <th scope="col" className="py-3 px-6">
                Media
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Seller
              </th>
              <th scope="col" className="py-3 px-6">
                Price
              </th>
              <th scope="col" className="py-3 px-6">
                Type
              </th>
            </tr>
          </thead>
          <tbody>
            {listings?.map((listing) => (
              <tr key={listing.id} className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {listing.id}
                </th>
                <td className="py-4 px-6 relative">
                  <Image
                    src={listing.asset.image as string}
                    alt={listing.asset.name as string}
                    height="128"
                    width="128"
                  />
                </td>
                <td className="py-4 px-6">{listing.asset.name}</td>
                <td className="py-4 px-6">{cutAddress(listing.sellerAddress)}</td>
                <td className="py-4 px-6">{ethers.utils.formatEther(listing.buyoutPrice)}</td>
                <td className="py-4 px-6">{listing.type === 0 ? "Direct Listing" : "Auction Listing"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default ListingsPage;
