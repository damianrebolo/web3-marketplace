import { useCallback, useMemo } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";

import { ColumnDef } from "@tanstack/react-table";
import { DirectListing, ThirdwebSDK } from "@thirdweb-dev/sdk";

import { cutAddress } from "utils";

import { Container } from "components/shared/ui";
import { ReactTable } from "components/shared/ui/Table";
import { Button } from "components/shared/ui/Button";

interface ListingPageProps {
  listings: DirectListing[];
}

const ListingsPage: NextPage<ListingPageProps> = ({ listings }) => {
  const router = useRouter();

  const ListingsColumns: ColumnDef<DirectListing>[] = useMemo(
    () => [
      {
        header: () => <div className="text-center">LISTING ID</div>,
        id: "id",
        accessorFn: (row: DirectListing) => <div className="text-center">{row.id}</div>,
        cell: (info: { getValue: () => any }) => info.getValue(),
      },
      {
        header: "MEDIA",
        id: "media",
        accessorFn: (row: DirectListing) => (
          <Image src={row.asset.image as string} height="90" width="90" alt={row.asset.name as string} />
        ),
        cell: (info: { getValue: () => any }) => info.getValue(),
      },
      {
        header: "NAME",
        accessorKey: "asset.name",
      },
      {
        header: "SELLER",
        id: "sellerAddress",
        accessorFn: (row: DirectListing) => cutAddress(row.sellerAddress),
      },
      {
        header: "PRICE",
        accessorKey: "buyoutCurrencyValuePerToken.displayValue",
      },
      {
        header: "TYPE",
        id: "type",
        accessorFn: (row: DirectListing) => (row.type === 0 ? "Direct Listing" : "Auction Listing"),
      },
    ],
    []
  );

  const onRowClicked = useCallback(
    (obj: DirectListing) => router.push(`/${obj.assetContractAddress}/${obj.id}`),
    [router]
  );

  return (
    <>
      <Head>
        <title>Web3 Portfolio - Listings</title>
        <meta property="og:title" content="Web3 Portfolio - Listings" key="title" />
      </Head>
      <Container className="m-10">
        <div className="flex justify-between items-center my-5">
          <h1 className="font-semibold text-xl text-gray-700 dark:text-white">All listings</h1>
          <Link href="/create-listing">
            <Button variant="secondary">Create Listing</Button>
          </Link>
        </div>
        <ReactTable<DirectListing>
          data={listings}
          columns={ListingsColumns}
          pagination
          isClickable
          onRowClicked={onRowClicked}
        />
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const sdk = new ThirdwebSDK("goerli");

  const contract = await sdk.getContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const listings = (await contract.getAllListings()) as DirectListing[];

  return {
    props: { listings: JSON.parse(JSON.stringify(listings)) }, // will be passed to the page component as props
  };
}

export default ListingsPage;
