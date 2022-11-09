import { useAddress, ConnectWallet } from "@thirdweb-dev/react";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const Auth = () => (
  <div className="w-full h-full flex justify-center items-center">
    <ConnectWallet />
  </div>
);

export const Layout: React.FC<Props> = ({ children }) => {
  const address = useAddress();

  if (!address) return <Auth />;
  return <>{children}</>;
};
