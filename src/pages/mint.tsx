import { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { ChainId, NATIVE_TOKEN_ADDRESS } from "@thirdweb-dev/sdk";
import { useAddress, useContract, useNetwork, useNetworkMismatch, useStorageUpload } from "@thirdweb-dev/react";
import { BigNumber } from "ethers";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import Form from "components/shared/ui/Form";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";

const MintPage: NextPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [creatingListing, setCreatingListing] = useState(false);
  const toast = useToast();
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress() as string;
  const { mutateAsync: upload } = useStorageUpload();
  const { contract: nftCollection } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS, "nft-collection");
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
        const target = e.target as typeof e.target & {
          name: { value: string };
          description: { value: string };
        };
        const name = target.name.value;
        const description = target.description.value;
        const uris = await upload({
          data: [file],
        });

        const signedPayloadReq = await fetch(`/api/mint`, {
          method: "POST",
          body: JSON.stringify({
            address,
            name,
            description,
            image: uris[0],
          }),
        });

        const signedJson = await signedPayloadReq.json();

        if (!signedPayloadReq.ok) {
          throw new Error(signedJson.error);
        }

        const signedPayload = signedJson.signedPayload;

        const nft = await nftCollection?.signature.mint(signedPayload);

        if (nft) {
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
    [address, nftCollection, file, upload, router, marketplace, isMismatched, switchNetwork, toast]
  );

  const handleUploadFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }, []);

  return (
    <Container className="m-10">
      <Form onSubmit={(e) => handleMinNft(e)}>
        <h1 className="my-8 text-2xl text-gray-700 dark:text-white">Upload your NFT to the marketplace:</h1>
        <Form.Group>
          <Form.File file={file} handleUploadFile={handleUploadFile} />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" name="name" placeholder="Name" />
        </Form.Group>
        <Form.Group>
          <Form.Control type="text" name="description" placeholder="Description" />
        </Form.Group>
        <Button className="mt-8" type="submit" disabled={creatingListing}>
          {creatingListing ? "Loading..." : "Mint"}
        </Button>
      </Form>
    </Container>
  );
};

export default MintPage;
