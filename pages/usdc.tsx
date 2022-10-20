import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { WalletIcon } from "../components/shared/icons";

const UsdcPage: NextPage = () => (
  <div className="flex flex-nowrap justify-between items-center p-4">
    <div className="flex flex-nowrap items-center">
      <Image src="/assets/images/logo.png" width={40} height={40} />
      <h1 className="text-gray-600 font-bold text-lg truncate ml-3">Web3 Portfolio</h1>
    </div>
    <div className="flex items-center">
      <div className="hidden sm:flex items-center mr-6 space-x-4 ">
        <Link href="/marketplace">
          <a className="font-bold text-gray-900 hover:text-gray-400 uppercase">Marketplace</a>
        </Link>
        <Link href="/usdc">
          <a className="font-bold text-gray-900 hover:text-gray-400 uppercase">USDC</a>
        </Link>
      </div>
      <WalletIcon className="w-10 h-10 cursor-pointer" />
    </div>
  </div>
);

export default UsdcPage;
