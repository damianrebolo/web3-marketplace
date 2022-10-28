import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

import { MetamaskIcon } from "../../shared/icons";
import { Button } from "../../shared/ui";

export const WalletStatus: React.FC = () => {
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const connectWithMetamask = useMetamask();
  return (
    <>
      {address ? (
        <div className="flex justify-between items-center">
          <Button onClick={() => disconnectWallet()}>
            <MetamaskIcon w={30} h={30} />
            <span className="ml-3 text-gray-600 font-bold">Log out</span>
          </Button>

          <span className="text-gray-900 font-bold text-md">{`${address?.substring(0, 6)}...${address?.substring(
            address?.length - 4
          )}`}</span>
        </div>
      ) : (
        <Button onClick={() => connectWithMetamask()}>
          <MetamaskIcon w={30} h={30} />
          <span className="ml-3 text-gray-600 font-bold">Connect</span>
        </Button>
      )}
    </>
  );
};
