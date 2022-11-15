import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";

import { NFT } from "@thirdweb-dev/sdk";
import { ColumnDef } from "@tanstack/react-table";

import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";
import { NftList } from "components/pages/nfts";

import { cutAddress } from "utils";
import { Table } from "components/shared/ui/Table/";

const NftsPage: NextPage = () => {
  const router = useRouter();

  const nftColumns: ColumnDef<NFT>[] = [
    {
      header: () => <div className="text-center">TOKEN ID</div>,
      id: "tokenId",
      accessorFn: (row: NFT) => <div className="text-center">{row.metadata.id}</div>,
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      header: "MEDIA",
      id: "media",
      accessorFn: (row: NFT) => (
        <Image src={row.metadata.image as string} height="90" width="90" alt={row.metadata.name as string} />
      ),
      cell: (info: { getValue: () => any }) => info.getValue(),
    },
    {
      header: "NAME",
      accessorKey: "metadata.name",
    },
    {
      header: "DESCRIPTION",
      accessorKey: "metadata.description",
    },
    {
      header: "OWNER",
      id: "owner",
      accessorFn: (row: NFT) => cutAddress(row.owner),
    },
  ];

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
        <NftList>
          {(nfts, isLoading) => <Table<NFT> data={nfts} columns={nftColumns} pagination={true} isLoading={isLoading} />}
        </NftList>
      </Container>
    </>
  );
};

export default NftsPage;
