import { useMemo } from "react";

import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { NFT, ThirdwebSDK } from "@thirdweb-dev/sdk";
import { ColumnDef } from "@tanstack/react-table";

import { ReactTable } from "components/shared/ui/Table";
import { Container } from "components/shared/ui";
import { Button } from "components/shared/ui/Button";

import { cutAddress } from "utils";

interface NftsPageProps {
  nfts: NFT[];
}

const NftsPage: NextPage<NftsPageProps> = ({ nfts }) => {
  const nftColumns: ColumnDef<NFT>[] = useMemo(
    () => [
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
    ],
    []
  );

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
        <ReactTable<NFT> data={nfts} columns={nftColumns} pagination />
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const sdk = new ThirdwebSDK("goerli");

  const contract = await sdk.getContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS as string, "nft-collection");
  const nfts = await contract.getAll();

  return {
    props: { nfts: JSON.parse(JSON.stringify(nfts)) }, // will be passed to the page component as props
  };
}

export default NftsPage;
