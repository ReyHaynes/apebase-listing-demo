export type NFT = {
  id: string
  metadata: {
    image: string
    attributes: Attributes[]
  }
}

export type Attributes = {
  trait_type: string
  value: string
}