import { useCallback, useMemo } from "react";

import { useRouter } from "next/router";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";

import { DirectListing } from "@thirdweb-dev/sdk";
import { Column } from "react-table";

import { cutAddress } from "utils";
import Head from "next/head";
import { Container } from "components/shared/ui";
import { Listings } from "components/pages/Listings";
import { Table } from "components/shared/ui/Table/";
import { Button } from "components/shared/ui/Button";

const ListingsPage: NextPage = () => {
  const router = useRouter();

  const columns: Array<Column<DirectListing>> = useMemo(
    () => [
      {
        Header: () => <div className="text-center">LISTING ID</div>,
        id: "id",
        accessor: (row: DirectListing) => <div className="text-center">{row.id}</div>,
      },
      {
        Header: "MEDIA",
        id: "media",
        accessor: (row: DirectListing) => (
          <Image src={row.asset.image as string} height="128" width="128" alt={row.asset.name as string} />
        ),
      },
      {
        Header: "NAME",
        id: "name",
        accessor: (row: DirectListing) => row.asset.name,
      },
      {
        Header: "SELLER",
        id: "sellerAddress",
        accessor: (row: DirectListing) => cutAddress(row.sellerAddress),
      },
      {
        Header: "PRICE",
        id: "price",
        accessor: (row: DirectListing) => row.buyoutCurrencyValuePerToken.displayValue,
      },
      {
        Header: "TYPE",
        id: "type",
        accessor: (row: DirectListing) => (row.type === 0 ? "Direct Listing" : "Auction Listing"),
      },
    ],

    []
  );

  const onRowClicked = useCallback((obj: DirectListing) => router.push(`/${obj.assetContractAddress}/${obj.id}`), []);

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
        <Listings>
          {(listings: DirectListing[], isLoading) => (
            <Table
              data={listings}
              columns={columns}
              pagination={true}
              isLoading={isLoading}
              onRowClicked={onRowClicked}
            />
          )}
        </Listings>
      </Container>
    </>
  );
};

export default ListingsPage;
