import { Button } from "../ui/Button";
import { useAddress, useDisconnect, useMetamask } from "@thirdweb-dev/react";

export const WalletStatus: React.FC = () => {
  const address = useAddress();
  const disconnectWallet = useDisconnect();
  const connectWithMetamask = useMetamask();
  return (
    <>
      {address ? (
        <div className="flex justify-between items-center">
          <Button onClick={() => disconnectWallet()}>Logout</Button>

          <span className="text-white font-bold text-md">{`${address?.substring(0, 6)}...${address?.substring(
            address?.length - 4
          )}`}</span>
        </div>
      ) : (
        <Button onClick={() => connectWithMetamask()}>Connect with Metamask</Button>
      )}
    </>
  );
};
