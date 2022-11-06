import { NextPage } from "next";
import { ChangeEvent, FormEvent, useCallback, useRef, useState } from "react";

import { Container } from "components/shared/ui";
import { useAddress, useContract, useSDK } from "@thirdweb-dev/react";
// import { Loading, Error } from "components/shared/core";
import { Button } from "components/shared/ui/Button";
import Image from "next/image";
import { useRouter } from "next/router";

const NftsPage: NextPage = () => {
  const router = useRouter();
  const [file, setFile] = useState<File>();
  const [creatingListing, setCreatingListing] = useState(false);

  const address = useAddress() as string;
  const { contract: nftCollection } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS, "nft-collection");
  const sdk = useSDK();

  const handleMinNft = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      setCreatingListing(true);
      try {
        e.preventDefault();

        const target = e.target as typeof e.target & {
          name: { value: string };
          description: { value: string };
        };
        const name = target.name.value;
        const description = target.description.value;
        const img = await sdk?.storage.upload(file);

        const metadata = {
          name,
          description,
          image: img,
        };
        const tx = await nftCollection?.mintTo(address, metadata);

        if (tx) {
          router.push(`/`);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setCreatingListing(false);
      }
    },
    [address, nftCollection, file, router, sdk]
  );

  const handleUploadFile = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }, []);

  return (
    <Container className="m-10">
      <form onSubmit={(e) => handleMinNft(e)}>
        <div className="flex justify-center items-center w-full">
          {/* Form Section */}
          <div className="w-lg flex flex-col items-center mt-4">
            <h1 className="m-8 text-2xl text-gray-700 dark:text-white">Upload your NFT to the marketplace:</h1>

            {file ? (
              <Image src={URL.createObjectURL(file)} height="125" width="125" alt="" />
            ) : (
              <div className="flex justify-center items-center w-full">
                <label className="flex flex-col justify-center items-center w-full h-64 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                  <div className="flex flex-col justify-center items-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-3 w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or GIF</p>
                  </div>
                  <input
                    type="file"
                    accept="image/png, image/gif, image/jpeg"
                    onChange={handleUploadFile}
                    className="hidden"
                  />
                </label>
              </div>
            )}

            <input
              type="text"
              name="name"
              className="w-80 m-4 bg-transparent border border-solid border-gray-500 rounded-lg text-white h-12 py-0 px-4 text-base"
              placeholder="Name"
            />

            <input
              type="text"
              name="description"
              className="w-80 bg-transparent border border-solid border-gray-500 rounded-lg text-white h-12 py-0 px-4 text-base"
              placeholder="Description"
            />

            <Button type="submit" className="mt-8" disabled={creatingListing}>
              {creatingListing ? "Loading..." : "Mint"}
            </Button>
          </div>
        </div>
      </form>
    </Container>
  );
};

export default NftsPage;
