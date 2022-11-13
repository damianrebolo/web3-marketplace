import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { Container, Table } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";

import { cutAddress } from "utils";
import { NftList } from "components/pages/nfts";
import { memo, useState } from "react";

interface Pagination {
  start: number;
  count: number;
}

const NftsPage: NextPage = memo(() => {
  const [pagination, setPagination] = useState<Pagination>({ start: 0, count: 10 });
  console.log(pagination.start, pagination.count);
  return (
    <>
      <Head>
        <title>Web3 Portfolio - NFT Collection</title>
        <meta property="og:title" content="Web3 Portfolio - NFT Collection" key="title" />
      </Head>
      <Container className="m-10">
        <div className="flex justify-between items-center my-5">
          <h1 className="font-semibold text-xl text-gray-700 dark:text-white">NFT Collection</h1>
          <Link href="/mint">
            <Button variant="secondary">Mint</Button>
          </Link>
        </div>

        <NftList pagination={pagination}>
          {(nfts) => (
            <>
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
              <div className="flex flex-col items-center">
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  Showing <span className="font-semibold text-gray-900 dark:text-white">{pagination.start + 1}</span> to{" "}
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {pagination.start + pagination.count}
                  </span>
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                  <button
                    disabled={pagination.start === 0}
                    onClick={() => {
                      setPagination({ ...pagination, start: pagination.start - pagination.count });
                    }}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-l hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
                  >
                    <svg
                      aria-hidden="true"
                      className="mr-2 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Prev
                  </button>
                  <button
                    disabled={pagination.count > nfts.length}
                    onClick={() => {
                      setPagination({ ...pagination, start: pagination.start + pagination.count });
                    }}
                    className="inline-flex items-center py-2 px-4 text-sm font-medium text-white bg-gray-800 rounded-r border-0 border-l border-gray-700 hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white disabled:cursor-not-allowed"
                  >
                    Next
                    <svg
                      aria-hidden="true"
                      className="ml-2 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            </>
          )}
        </NftList>
      </Container>
    </>
  );
});
NftsPage.displayName = "NFT Collection";

export default NftsPage;
