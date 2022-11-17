import { MouseEventHandler, useCallback, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Formik, Form as FormikForm } from "formik";
import { ChainId, NATIVE_TOKEN_ADDRESS, NFT } from "@thirdweb-dev/sdk";
import { useContract, useNetwork, useNetworkMismatch } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import Form from "components/shared/ui/Form";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";

import { initialValues, listingSchema } from "constants/create-listing";
import { OwnedNfts } from "components/pages/create-listing";

interface CreateListingPageProps {
  nfts: NFT[];
}

const CreateListingPage: NextPage<CreateListingPageProps> = ({ nfts }) => {
  const router = useRouter();
  const [creatingListing, setCreatingListing] = useState(false);
  const toast = useToast();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const { contract: marketplace } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");

  const handleCreatListing = useCallback(
    async (listingValues: typeof initialValues) => {
      setCreatingListing(true);
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

        const tx = await marketplace?.direct.createListing({
          assetContractAddress: process.env.NEXT_PUBLIC_CONTRACT_NFTS as string, // Contract Address of the NFT
          buyoutPricePerToken: listingValues.price, // Maximum price, the auction will end immediately if a user pays this price.
          currencyContractAddress: NATIVE_TOKEN_ADDRESS, // NATIVE_TOKEN_ADDRESS is the crpyto curency that is native to the network. i.e. Goerli ETH.
          listingDurationInSeconds: 60 * 60 * 24 * 7, // When the auction will be closed and no longer accept bids (1 Week)
          quantity: 1, // How many of the NFTs are being listed (useful for ERC 1155 tokens)
          startTimestamp: new Date(0), // When the listing will start
          tokenId: BigNumber.from(listingValues.nftId), // Token ID of the NFT.
        });

        if (tx) {
          router.push(`/listings`);
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
    [router, marketplace, isMismatched, switchNetwork, toast]
  );

  return (
    <Container className="m-10">
      <Formik
        initialValues={initialValues}
        validationSchema={listingSchema}
        onSubmit={(values) => {
          handleCreatListing(values);
        }}
      >
        {({ values, setFieldValue }) => (
          <FormikForm>
            <Form.Container>
              <h1 className="w-full my-8 text-2xl text-gray-700 dark:text-white">Create Listing</h1>
              <Form.List className="grid grid-cols-4 gap-4">
                <OwnedNfts>
                  {(nfts: NFT[]) => (
                    <>
                      {nfts.map((nft: NFT) => (
                        <Form.ListItem
                          key={nft.metadata.id}
                          className={`${
                            values.nftId === nft.metadata.id ? "border-4 border-emerald-500 rounded-lg" : ""
                          }`}
                          type="image"
                          src={nft.metadata.image as string}
                          onClick={() => {
                            setFieldValue("nftId", nft.metadata.id);
                          }}
                          width="90"
                          height="90"
                        />
                      ))}
                    </>
                  )}
                </OwnedNfts>
                <Form.ErrorMessage className="col-span-12" name="nftId" />
              </Form.List>
              <Form.Group>
                <Form.Field className="col-span-12" name="price" placeholder="Price" />
                <Form.ErrorMessage className="col-span-12" name="price" />
              </Form.Group>
            </Form.Container>

            <Form.Container>
              <Form.Group className="place-items-center">
                <Button className="col-span-12" type="submit">
                  {creatingListing ? "Loading..." : "Create Listing"}
                </Button>
              </Form.Group>
            </Form.Container>
          </FormikForm>
        )}
      </Formik>
    </Container>
  );
};

export default CreateListingPage;
