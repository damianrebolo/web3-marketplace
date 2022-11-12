import { useCallback } from "react";

import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { ethers } from "ethers";
import { DirectListing } from "@thirdweb-dev/sdk";

import { Container, Table } from "components/shared/ui";
import { Listings } from "components/pages/Listings";

import { cutAddress } from "utils";

const ListingsPage: NextPage = () => {
  const router = useRouter();

  const handleRowClick = useCallback(
    (id: string, contractAddress: string) => {
      router.push(`/${contractAddress}/${id}`);
    },
    [router]
  );

  return (
    <>
      <Head>
        <title>Web3 Portfolio - Listings</title>
        <meta property="og:title" content="Web3 Portfolio - Listings" key="title" />
      </Head>
      <Container className="m-10">
        <h1 className="my-5 font-semibold text-xl text-gray-700 dark:text-white">Contract Listings</h1>

        <Listings>
          {(listings: DirectListing[]) => (
            <Table>
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
                  <tr
                    key={listing.id}
                    onClick={() => handleRowClick(listing.id, listing.assetContractAddress)}
                    className="cursor-pointer bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700 hover:dark:bg-gray-600"
                  >
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
            </Table>
          )}
        </Listings>
      </Container>
    </>
  );
};

export default ListingsPage;
