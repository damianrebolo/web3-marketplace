import Image from "next/image";
import { BigNumberish } from "ethers";
import { useContract, useNetwork, useNetworkMismatch, useAddress } from "@thirdweb-dev/react";
import { ChainId } from "@thirdweb-dev/sdk";

import { EtherIcon, UserIcon } from "../../shared/icons";
import Card from "../../shared/ui/Card";
import { Button } from "../../shared/ui/Button";
import { useToast } from "components/shared/core/Toaster/ToasterProvider";
import Link from "next/link";

interface Props {
  name: string | number | undefined;
  image: string | null | undefined;
  sellerAddress: string;
  id: BigNumberish;
  currencyValue: string;
  contractAddress: string;
}

export const MarketplaceCard: React.FC<Props> = ({
  name,
  image,
  sellerAddress,
  id,
  currencyValue,
  contractAddress,
}) => {
  const isMismatched = useNetworkMismatch();
  const [, switchNetwork] = useNetwork();
  const address = useAddress() as string;
  const toast = useToast();

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_MARKETPLACE, "marketplace");

  const onBuyNFT = async () => {
    try {
      // Validate network first
      if (isMismatched) {
        const switched = await switchNetwork?.(ChainId.Goerli);
        if (switched?.error) {
          throw new Error();
        } else {
          toast?.pushInfo("Network Switched, try again");
          return;
        }
      }
      // If network is correct
      await contract?.buyoutListing(id, 1, address);
    } catch (error) {
      if (error instanceof Error) {
        toast?.pushError("The transaction did not take place..");
      } else {
        console.log(error);
      }
    }
  };

  return (
    <Link href={`/${contractAddress}/${id}`}>
      <a>
        <Card shadow="lg">
          {image && (
            <Card.Image>
              <Image src={image} alt="Picture of the author" layout="fill" className="object-cover object-center" />
            </Card.Image>
          )}
          <Card.Body>
            <div className="flex flex-nowrap justify-between items-center mb-5">
              <h3 className="text-2xl font-semibold uppercase">{name}</h3>
              <div className="flex flex-nowrap items-center justify-end">
                <EtherIcon />
                <span className="text-md font-bold">{currencyValue}</span>
              </div>
            </div>

            <h4 className="flex justify-start items-center flex-nowrap mb-3">
              <UserIcon />
              <span className="ml-2 truncate text-xs">{sellerAddress}</span>
            </h4>
          </Card.Body>
        </Card>
      </a>
    </Link>
  );
};
