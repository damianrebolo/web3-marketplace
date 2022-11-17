import { ChainId, ThirdwebSDK } from "@thirdweb-dev/sdk";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function server(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { address, name, image, description, attributes } = JSON.parse(req.body);

    if (req.method !== "POST") {
      throw new Error("Icorrect request method");
    }

    if (!process.env.WALLET_KEY) {
      throw new Error("Incorrect Wallet");
    }

    const sdk = ThirdwebSDK.fromPrivateKey(process.env.WALLET_KEY as string, "goerli");

    const nftCollection = await sdk.getContract(process.env.NEXT_PUBLIC_CONTRACT_NFTS!, "nft-collection");

    const signedPayload = await nftCollection.signature.generate({
      to: address,
      metadata: {
        name: name as string,
        image: image as string,
        description: description as string,
        attributes: attributes as [],
      },
    });

    res.status(200).json({
      signedPayload: JSON.parse(JSON.stringify(signedPayload)),
    });
  } catch (e) {
    res.status(500).json({ error: `Server error ${e}` });
  }
}
