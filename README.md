# Web3 Portfolio with Next.JS

## Marketplace

![](/assets/ducks-portfolio.png)
[**Demo Link**](https://web3-portfolio-ochre.vercel.app/)

### Introduction

I implement the following features:

- A marketplace where we can mint and list NFTs for **direct sale**.
- Allow users to mint with signature.
- Allow users to **buy** our NFTs.

### How to use it

You will need any wallet connected to Goerli chain and some ETH to pay the transactions:

- Head to [**Demo Link**](https://web3-portfolio-ochre.vercel.app/)
- Head to NFT Collection page
- Click Mint button to add a new NFT to the collection
- Head to Listings page
- Click Create Listing, select the NFT uploaded before and set a price to list the NFT within the Marketplace
- Head home page and click on the NFT to se the details or buy the asset.

### Tools

- [**thirdweb Marketplace**](https://portal.thirdweb.com/contracts/marketplace): to facilitate the listing of NFTs and enable users to buy the NFTs on the marketplace.
- [**thirdweb NFT Collection**](https://portal.thirdweb.com/contracts/nft-collection): to create an ERC721 NFT Collection that we can list onto the marketplace.
- [**thirdweb React SDK**](https://docs.thirdweb.com/react): to enable users to connect and disconnect their wallets with our website and interact with the marketplace.
- [**thirdweb TypeScript SDK**](https://docs.thirdweb.com/typescript): to connect to our marketplace smart contract, create new listings and buy listings!

### Creating A Marketplace

To create a marketplace contract:

- Head to the [thirdweb dashboard](https://thirdweb.com/dashboard).
- Click **Deploy new contract**.
- Click **Marketplace**.
- Configure & Deploy!

To add listings:

- Click **Listings tab**.
- Click **Create listing**.
- Configure & Create listing!

### Creating A NFT Collection

To create a NFT collection:

- Head to the [thirdweb dashboard](https://thirdweb.com/dashboard).
- Click **Deploy new contract**.
- Click **NFT Collection**.
- Configure & Deploy!

To mint NFTs:

- Click **NFTs tab**
- Click **Mint**
- Configure & Mint NFT

### What do you need to run this project?

- Clone repository
- Create NFT Collection & Marketplace contract on ThirdWeb Dashboard
- Upload your NFTs and add them to Market Listings
- Create Metamask account (use Goerli testnet)
- Request [Ethereum Goerli LINK/ETH](https://faucets.chain.link/)
- Create **.env.local** file on the root folder, copy the ENV variable from **.env.example** and copy the Marketplace contract from thirdweb.
- Run: `npm install`
- Run: `npm run dev`
- [Enjoy it!!](http://localhost:3000/marketplace)
