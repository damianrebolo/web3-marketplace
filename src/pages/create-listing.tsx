import { FormEvent, useCallback, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";

import { ChainId, NATIVE_TOKEN_ADDRESS, NFT } from "@thirdweb-dev/sdk";
import { useContract, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import Form from "components/shared/ui/Form";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";
import { OwnedNfts } from "components/pages/create-listing";

const CreateListingPage: NextPage = () => {
  const [nftId, setNftId] = useState<string>();
  const router = useRouter();
  const [creatingListing, setCreatingListing] = useState(false);
  const toast = useToast();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");

  const handleMinNft = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setCreatingListing(true);
      try {
        e.preventDefault();

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
        //

        const target = e.target as typeof e.target & {
          price: { value: string };
        };
        const price = target.price.value;
        const tx = await marketplace?.direct.createListing({
          assetContractAddress: process.env.NEXT_PUBLIC_CONTRACT_NFTS as string, // Contract Address of the NFT
          buyoutPricePerToken: price, // Maximum price, the auction will end immediately if a user pays this price.
          currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
          listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
          quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
          startTimestamp: new Date(0), // When the listing will start
          tokenId: BigNumber.from(nftId), // Token ID of the NFT.
        });

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
        setCreatingListing(false);
      }
    },
    [router, marketplace, isMismatched, switchNetwork, toast, nftId]
  );

  return (
    <Container className="m-10">
      <h1 className="w-full text-center my-8 text-2xl text-gray-700 dark:text-white">Create Listing:</h1>
      <OwnedNfts>
        {(nfts: NFT[]) => (
          <Form onSubmit={(e) => handleMinNft(e)}>
            <Form.Group>
              <Form.List>
                {nfts?.map((nft) => (
                  <Form.Control
                    key={nft.metadata.id}
                    className={`overflow-hidden cursor-pointer ${
                      nftId === nft.metadata.id ? "border-4 border-emerald-500 rounded-lg" : ""
                    }`}
                    type="image"
                    src={nft.metadata.image as string}
                    onClick={(e) => {
                      e.preventDefault();
                      setNftId(nft.metadata.id);
                    }}
                    width="90"
                    height="90"
                  />
                ))}
              </Form.List>
            </Form.Group>
            <Form.Group>
              <Form.Control type="text" name="price" placeholder="Price" />
            </Form.Group>

            <Button className="mt-8" type="submit" disabled={creatingListing}>
              {creatingListing ? "Loading..." : "Create Listing"}
            </Button>
          </Form>
        )}
      </OwnedNfts>
    </Container>
  );
};

export default CreateListingPage;
