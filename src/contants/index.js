export const nftsQuery = `
    query MyQuery {
    nfts(
        orderBy: createdAt
        orderDirection: desc
        where: {image_not: null}
        first: 10
    ) {
        id
        image
        name
        tokenId
        createdAt
        category
        contractAddress
    }
    }
`;
