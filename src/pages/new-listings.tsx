import { NextPage } from "next";
import { useMemo } from "react";
import { DirectListing } from "@thirdweb-dev/sdk";

import { Container } from "components/shared/ui";
import { Listings } from "components/pages/Listings";
import { ListingTable } from "components/pages/Listings/ListingsTable";
import { useRender } from "hooks";
import { cutAddress } from "utils";
import { Column } from "react-table";
import Image from "next/image";
import { useContract, useListings } from "@thirdweb-dev/react";

const ListingsPage: NextPage = () => {
  useRender("ListingsPage");
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE as string, "marketplace");
  const { data = [] } = useListings(contract, { start: 0, count: 100 });

  const listings: Array<DirectListing> = useMemo(() => data as DirectListing[], [data]);

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

  return (
    <Container className="m-10">
      <ListingTable listings={listings} columns={columns} />
    </Container>
  );
};

export default ListingsPage;
