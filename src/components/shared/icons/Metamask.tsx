import Image from "next/image";

interface Props {
  w?: number;
  h?: number;
}

export const MetamaskIcon: React.FC<Props> = ({ w = 20, h = 20 }) => <Image src="/assets/images/metamask.png" width={w} height={h} />;
