import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { ChainId, useAddress, useContract, useListing, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";
import { cutAddress } from "utils";
import { FavouriteIcon } from "components/shared/icons";
import { Loading } from "components/shared/core";

const ListingsPage: NextPage = () => {
  const [buying, setBuying] = useState(false);
  const router = useRouter();
  const { tokenId } = router.query;

  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress() as string;
  const toast = useToast();

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const { data: listing, isLoading } = useListing(contract, tokenId as string);

  if (isLoading) {
    return <Loading />;
  }

  const onBuyNFT = async (id: string) => {
    setBuying(true);

    try {
      // Validate network first
      if (isMismatched) {
        const switched = await switchNetwork?.(ChainId.Goerli);
        if (switched?.error) {
          throw new Error();
        } else {
          toast?.pushInfo("Network Switched, try again");
          return;
        }
      }
      // If network is correct
      const tx = await contract?.buyoutListing(id, 1, address);
      if (tx) {
        router.push(`/`);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast?.pushError("The transaction did not take place..");
      } else {
        console.log(error);
      }
    } finally {
      setBuying(false);
    }
  };
  return (
    <>
      <Head>
        <title>Web3 Portfolio - NFT</title>
        <meta property="og:title" content="Web3 Portfolio - Listings" key="title" />
      </Head>
      <Container className="m-10">
        <div className="grid grid-cols-1 sm:grid-cols-7 gap-6 text-gray-700 dark:text-white">
          <div className="col-span-3 flex flex-col gap-5">
            <div className="flex flex-col bg-gray-200 dark:bg-gray-700 border border-gray-400 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-3">
                <span className="font-semibold">Chain: Goerli</span>
                <Button variant="secondary" onClick={() => {}}>
                  <FavouriteIcon />
                </Button>
              </div>
              <Image
                src={listing?.asset.image as string}
                alt={listing?.asset.name as string}
                width={500}
                height={500}
                className="object-cover object-center"
              />
            </div>
            {listing?.asset?.attributes && (
              <div className="flex flex-wrap justify-evenly items-center gap-2 p-5 bg-gray-200 dark:bg-gray-700 border border-gray-400 rounded-lg overflow-hidden">
                {(listing?.asset?.attributes as []).map((attribute: any) => (
                  <div
                    className="flex flex-col items-center p-2 border border-cyan-700 rounded-md"
                    key={attribute.value.toString()}
                  >
                    <span className="text-cyan-700 text-xs uppercase font-bold">{attribute.trait_type}</span>
                    <span className="capitalize">{attribute.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="col-span-4 flex flex-col gap-5">
            <div className="font-bold text-sm">
              Owned by:{" "}
              <span className="font-semibold text-blue-600">{cutAddress(listing?.sellerAddress as string)}</span>
            </div>
            <h1 className="text-5xl font-semibold">{listing?.asset.name}</h1>
            <div className="text-lg p-5 bg-gray-200 dark:bg-gray-700 border border-gray-400 rounded-lg overflow-hidden">
              {listing?.asset.description}
            </div>

            <div className="flex flex-col bg-gray-200 dark:bg-gray-700 p-5 gap-3 border border-gray-400 rounded-lg overflow-hidden">
              <div className="text-base text-gray-400">Current Price</div>
              <div className="text-3xl font-semibold">{listing?.buyoutCurrencyValuePerToken.displayValue} ETH</div>
              <Button variant="light" onClick={() => onBuyNFT(listing?.id as string)} disabled={buying}>
                {buying ? "Loading..." : "Buy Now"}
              </Button>
            </div>
            <div className="flex flex-col gap-3 p-5 bg-gray-200 dark:bg-gray-700 border border-gray-400 rounded-lg overflow-hidden">
              <div className="flex justify-between items-center">
                <span>Contract Address</span>
                <span>{cutAddress(listing?.assetContractAddress as string)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Token ID</span>
                <span>{listing?.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Token Standard</span>
                <span>ERC-721</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Chain</span>
                <span>Goerli</span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ListingsPage;
