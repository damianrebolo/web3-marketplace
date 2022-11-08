import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { Container, Table } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";

import { cutAddress } from "utils";
import { NftList } from "components/pages/nfts";

const NftsPage: NextPage = () => (
  <Container className="m-10">
    <div className="flex justify-between items-center my-5">
      <h2 className="font-semibold text-xl text-gray-700 dark:text-white">NFT Collection</h2>
      <Link href="/mint">
        <Button variant="secondary">Mint + Listing</Button>
      </Link>
    </div>

    <NftList>
      {(nfts) => (
        <Table>
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
                <td className="py-4 px-6 relative">
                  <Image
                    src={nft.metadata.image as string}
                    alt={nft.metadata.name as string}
                    height="128"
                    width="128"
                  />
                </td>
                <td className="py-4 px-6">{nft.metadata.name}</td>
                <td className="py-4 px-6">{nft.metadata.description}</td>
                <td className="py-4 px-6">{cutAddress(nft.owner)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </NftList>
  </Container>
);

export default NftsPage;
