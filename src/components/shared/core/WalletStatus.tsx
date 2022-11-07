import { Button } from "../ui/Button";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

import { cutAddress } from "utils";

export const WalletStatus: React.FC = () => {
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const connectWithMetamask = useMetamask();
  return (
    <>
      {address ? (
        <div className="flex justify-between items-center">
          <Button variant="secondary" onClick={() => disconnectWallet()}>
            Logout
          </Button>

          <span className="text-white font-bold text-md">{cutAddress(address)}</span>
        </div>
      ) : (
        <Button variant="secondary" onClick={() => connectWithMetamask()}>
          Connect with Metamask
        </Button>
      )}
    </>
  );
};
