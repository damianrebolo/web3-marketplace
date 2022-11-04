import { NextPage } from "next";
import Image from "next/image";
import { createClient } from "urql";

import { Container } from "../components/shared/ui";
import Card from "components/shared/ui/Card";

import { nftsQuery } from "../contants";
import { TheGraphNavbar } from "components/pages/thegraph/Navbar";
import { GridContainer } from "components/shared/ui/GridContainer";

interface Nft {
  id: string;
  image: string;
  name: string;
  tokenId: string;
  createdAt: string;
  category: string;
  contractAddress: string;
}

interface theGraphProps {
  nfts: Nft[];
}

const ThegraphPage: NextPage<theGraphProps> = ({ nfts }) => {
  return (
    <>
      <TheGraphNavbar />
      <Container className="py-5">
        <GridContainer>
          {nfts.map((nft) => (
            <Card key={nft.id}>
              <Card.Image>
                <Image
                  src={nft.image}
                  alt="Picture of the author"
                  layout="fill"
                  className="object-cover object-center"
                />
              </Card.Image>
              <Card.Body>
                <h3 className="text-2xl font-semibold mb-3 uppercase">{nft.name}</h3>
              </Card.Body>
            </Card>
          ))}
        </GridContainer>
      </Container>
    </>
  );
};

export async function getServerSideProps() {
  const APIURL = `https://gateway.thegraph.com/api/${process.env.NEXT_PUBLIC_GRAPH_API_KEY}/subgraphs/id/${process.env.NEXT_PUBLIC_GRAPH_ID}`;

  const client = createClient({
    url: APIURL,
  });

  const { data } = await client.query(nftsQuery, {}).toPromise();
  return {
    props: { nfts: data.nfts },
  };
}

export default ThegraphPage;
