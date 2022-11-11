import Image from "next/image";
import { BigNumberish } from "ethers";

import { EtherIcon, UserIcon } from "../../shared/icons";
import Card from "../../shared/ui/Card";
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
