import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container } from "components/shared/ui";
import { useContract, useNFTs } from "@thirdweb-dev/react";
import { Loading, Error } from "components/shared/core";
import { Button } from "components/shared/ui/Button";

const NftsPage: NextPage = () => {
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS);
  const { data: nfts, isLoading, error } = useNFTs(contract, { start: 0, count: 100 });

  if (isLoading) {
    return <Loading />;
  } else if (error) {
    const errorParsed = JSON.parse(JSON.stringify(error));
    return <Error>{errorParsed?.reason}</Error>;
  }

  return (
    <Container className="m-10">
      <div className="flex justify-between items-center my-5">
        <h2 className="font-semibold text-xl text-gray-700 dark:text-white">NFT Collection</h2>
        <Link href="/mint">
          <Button variant="secondary">Mint</Button>
        </Link>
      </div>

      <div className="overflow-x-auto relative">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Token Id
              </th>
              <th scope="col" className="py-3 px-6">
                Media
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Description
              </th>
              <th scope="col" className="py-3 px-6">
                Owner
              </th>
            </tr>
          </thead>
          <tbody>
            {nfts?.map((nft) => (
              <tr key={nft.metadata.id} className="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {nft.metadata.id}
                </th>
                <td className="py-4 px-6 relative w-32 h-32">
                  <Image
                    src={nft.metadata.image as string}
                    alt={nft.metadata.name as string}
                    height="128"
                    width="128"
                  />
                </td>
                <td className="py-4 px-6">{nft.metadata.name}</td>
                <td className="py-4 px-6">{nft.metadata.description}</td>
                <td className="py-4 px-6">{nft.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Container>
  );
};

export default NftsPage;
