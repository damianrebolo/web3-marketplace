import { useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { ChainId, useAddress, useContract, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";
import { cutAddress } from "utils";
import { FavouriteIcon } from "components/shared/icons";
import { BigNumber } from "ethers";
import { DirectListing, ThirdwebSDK } from "@thirdweb-dev/sdk";
import Card from "components/shared/ui/Card";

interface Props {
  listing: DirectListing;
}

const ListingsPage: NextPage<Props> = ({ listing }) => {
  const [buying, setBuying] = useState(false);
  const router = useRouter();

  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress() as string;
  const toast = useToast();

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");

  const calcSalesEnds = (secondsUntilEnd: BigNumber) => {
    const seconds = BigNumber.from(secondsUntilEnd).toNumber();
    const date = new Date();
    date.setSeconds(date.getSeconds() + seconds);
    return date.toUTCString();
  };

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
        console.error(error.message);
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
            <Card bg="dark" text="white" className="flex flex-col">
              <Card.Header border={false}>Chain: Goerli</Card.Header>
              <Image
                src={listing?.asset.image as string}
                alt={listing?.asset.name as string}
                width={500}
                height={500}
                className="object-cover object-center"
              />
            </Card>

            {listing?.asset?.attributes && (
              <Card bg="dark" text="white">
                <Card.Header>Properties</Card.Header>
                <Card.Body className="flex flex-wrap justify-start items-center gap-2 overflow-hidden">
                  {(listing?.asset?.attributes as []).map((attribute: any) => (
                    <div
                      className="flex flex-col p-2 border border-cyan-700 rounded-md"
                      key={attribute.value.toString()}
                    >
                      <div className="flex flex-col flex-1 items-center">
                        <span className="text-cyan-700 text-xs uppercase font-bold">{attribute.trait_type}</span>
                        <span className="capitalize">{attribute.value}</span>
                      </div>
                    </div>
                  ))}
                </Card.Body>
              </Card>
            )}
          </div>
          <div className="col-span-4 flex flex-col gap-5">
            <div className="font-bold text-sm">
              Owned by:{" "}
              <span className="font-semibold text-blue-600">{cutAddress(listing?.sellerAddress as string)}</span>
            </div>
            <h1 className="text-5xl font-semibold">{listing?.asset.name}</h1>

            <Card bg="dark" text="white">
              <Card.Header>Description</Card.Header>
              <Card.Body>{listing?.asset.description}</Card.Body>
            </Card>

            <Card bg="dark" text="white">
              <Card.Body className="flex flex-col gap-3">
                <div className="">Sale ends {calcSalesEnds(listing?.secondsUntilEnd as BigNumber)}</div>
                <div className="text-base text-gray-400">Current Price</div>
                <div className="text-3xl font-semibold">{listing?.buyoutCurrencyValuePerToken.displayValue} ETH</div>
                <div className="text-base text-gray-400">{`Quantity: ${BigNumber.from(listing?.quantity)}`}</div>
                {BigNumber.from(listing?.quantity).toNumber() > 0 && (
                  <Button variant="light" onClick={() => onBuyNFT(listing?.id as string)} disabled={buying}>
                    {buying ? "Loading..." : "Buy Now"}
                  </Button>
                )}
              </Card.Body>
            </Card>

            <Card bg="dark" text="white">
              <Card.Header>Details</Card.Header>
              <Card.Body className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span>Contract Address</span>
                  <span>{cutAddress(listing?.assetContractAddress as string)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Token ID</span>
                  <span>{BigNumber.from(listing?.tokenId).toString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Token Standard</span>
                  <span>ERC-721</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Chain</span>
                  <span>Goerli</span>
                </div>
              </Card.Body>
            </Card>
          </div>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sdk = new ThirdwebSDK("goerli");
  const { id } = context.query;

  const contract = await sdk.getContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const listing = (await contract.getListing(id as string)) as DirectListing;

  return {
    props: { listing: JSON.parse(JSON.stringify(listing)) }, // will be passed to the page component as props
  };
};

export default ListingsPage;
