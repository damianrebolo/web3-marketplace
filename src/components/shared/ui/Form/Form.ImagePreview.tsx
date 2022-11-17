import { useState } from "react";

import Image from "next/image";

interface Props {
  file: File;
  width: number;
  height: number;
}

export const FormImagePreview: React.FC<Props> = ({ file, width, height, ...props }) => {
  const [preview, setPreview] = useState<string>("");

  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    setPreview(reader.result as string);
  };

  return <Image src={preview as string} height={height} width={width} alt="NFT Preview" {...props} />;
};
