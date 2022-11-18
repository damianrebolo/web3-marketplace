import Image from "next/image";
import { BigNumber, BigNumberish } from "ethers";

import { EtherIcon, UserIcon } from "../../shared/icons";
import Card from "../../shared/ui/Card";
import Link from "next/link";

import { cutAddress } from "utils";

interface Props {
  name: string | number | undefined;
  image: string | null | undefined;
  sellerAddress: string;
  id: string;
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
}) => (
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
          </div>

          <h4 className="flex justify-between items-center flex-nowrap mb-3">
            <div className="flex items-center text-xs">
              <UserIcon />
              <span>{cutAddress(sellerAddress)}</span>
            </div>
            <div className="flex flex-nowrap items-center justify-end">
              <EtherIcon />
              <span className="text-md font-bold">{currencyValue}</span>
            </div>
          </h4>
        </Card.Body>
      </Card>
    </a>
  </Link>
);
