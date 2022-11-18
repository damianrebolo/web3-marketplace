import Image from "next/image";

import { NFT } from "@thirdweb-dev/sdk";
import { useAddress, useDisconnect, ConnectWallet } from "@thirdweb-dev/react";

import { cutAddress } from "utils";

import { OwnedNfts } from "./OwnedNfts";
import { Button } from "../ui/Button";

export const WalletStatus: React.FC = () => {
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  return (
    <>
      {address ? (
        <>
          <div className="flex justify-between items-center pb-4 mb-4 border-b-2 border-solid dark:border-white">
            <Button variant="secondary" onClick={() => disconnectWallet()}>
              Logout
            </Button>
            <span className="text-white font-bold text-md">{cutAddress(address)}</span>
          </div>
          <h3 className="text-xl dark:text-white mb-2">My Assets</h3>
          <OwnedNfts>
            {(nfts: NFT[]) => (
              <div className="h-96 w-full overflow-y-scroll">
                <div className="grid grid-cols-4 gap-3">
                  {nfts.map((nft) => (
                    <Image
                      key={nft.metadata.id}
                      className="col-span-1 place-self-center"
                      src={nft.metadata.image as string}
                      alt={nft.metadata.name as string}
                      height={90}
                      width={90}
                    />
                  ))}
                </div>
              </div>
            )}
          </OwnedNfts>
        </>
      ) : (
        <ConnectWallet />
      )}
    </>
  );
};
