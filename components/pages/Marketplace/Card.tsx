import Image from "next/image";
import { BigNumberish } from "ethers";

import { EtherIcon, UserIcon } from "../../shared/icons";
import { CardBody, CardImage } from "../../shared/ui";
import { Marketplace } from "@thirdweb-dev/sdk";

interface Props {
  name: string;
  image: string;
  sellerAddress: string;
  tokenId: string;
  currencyValue: string;
  contract: Marketplace | undefined;
}

export const MarketplaceCard: React.FC<Props> = ({
  name,
  image,
  sellerAddress,
  tokenId,
  currencyValue,
  contract,
}) => {
  const onBuyNFT = async (
    contract: Marketplace | undefined,
    tokenId: BigNumberish
  ) => {
    try {
      await contract?.buyoutListing(tokenId, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="shadow-lg border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
      <CardImage>
        <Image
          src={image}
          alt="Picture of the author"
          layout="fill"
          className="object-cover object-center"
        />
      </CardImage>
      <CardBody>
        <h3 className="text-2xl font-semibold mb-3 uppercase">{name}</h3>
        <h4 className="flex justify-start items-center flex-nowrap mb-3">
          <UserIcon />
          <span className="ml-2 truncate text-xs">{sellerAddress}</span>
        </h4>

        <div className="flex justify-between items-center flex-wrap ">
          <button
            type="button"
            className="bg-gray-200 py-2 px-5 text-md font-medium text-gray-900 rounded-lg inline-flex items-center"
            onClick={() => onBuyNFT(contract, tokenId)}
          >
            Buy now..
          </button>
          <div className="flex justify-center items-center">
            <EtherIcon />
            <span className="text-md font-bold">{currencyValue}</span>
          </div>
        </div>
      </CardBody>
    </div>
  );
};
