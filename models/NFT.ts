export type NFT = {
  id: string
  metadata: {
    image: string
    attributes: [
      {
        trait_type: string
        value: string
      }
    ]
  }
}