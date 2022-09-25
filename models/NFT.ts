export type NFT = {
  _id: string
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