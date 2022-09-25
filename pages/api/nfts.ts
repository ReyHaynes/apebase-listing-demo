// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { NFT } from '../../models/NFT'
import { dbQuery } from '../../services/database'

const DEFAULT_PAGINATION = 100

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NFT[]>
) {
  let page = 0
  const pageQuery = {
    // TODO: Filtering
    // "$and": [
    //   {
    //     "metadata.attributes": {
    //       "$elemMatch": {
    //         "trait_type": "Clothes",
    //         "value": "Striped Tee"
    //       }
    //     }
    //   },
    //   {
    //     "metadata.attributes": {
    //       "$elemMatch": {
    //         "trait_type": "Eyes",
    //         "value": "Heart"
    //       }
    //     }
    //   }
    // ]
  }

  try {
    const nfts = (await dbQuery(pageQuery, page, DEFAULT_PAGINATION) as NFT[])
    res.status(200).send(nfts)
    res.end()
  } catch (err) {
    res.status(500)
    res.end()
  }
}
