import * as Datastore from 'nedb';
import { NFT } from '../models/NFT';

export const db = new Datastore({ filename: "./lib/db", autoload: true });

export const dbQuery = (q: object, page: number, pagination: number) => {
  return new Promise((resolve, reject) => {
    db.find(q).limit(pagination).skip(page * pagination)
      .exec((err: any, response: NFT[]) => {
        // Reduce Data payload by 50%
        const nfts: NFT[] = response.map((res => {
          return {
            id: res.id,
            _id: res._id,
            metadata: {
              image: adjustImagePath(res.metadata.image),
              attributes: res.metadata.attributes
            }
          }
        }))
        resolve(nfts)
      }
    )
  })
}

const adjustImagePath = (url: string) => {
  if (url.startsWith("Qm")) {
    return "https://ipfs.io/ipfs/" + url
  } 
  else if (url.startsWith("/ipfs")) {
    return "https://ipfs.io/ipfs/" + url.slice(5)
  } 
  else if (url.startsWith("ipfs://ipfs")) {
    return "https://ipfs.io/ipfs/" + url.slice(12)
  } 
  else if (url.startsWith("ipfs://")) {
    return "https://ipfs.io/ipfs/" + url.slice(7)
  }
  return url;
}

const transformImage = (doc: NFT) => {
  if (doc.metadata.image.startsWith("Qm")) {
    doc.metadata.image = "https://ipfs.io/ipfs/" + doc.metadata.image
  } else if (doc.metadata.image.startsWith("/ipfs")) {
    doc.metadata.image = "https://ipfs.io/ipfs/" + doc.metadata.image.slice(5)
  } else if (doc.metadata.image.startsWith("ipfs://ipfs")) {
    doc.metadata.image = "https://ipfs.io/ipfs/" + doc.metadata.image.slice(12)
  } else if (doc.metadata.image.startsWith("ipfs://")) {
    doc.metadata.image = "https://ipfs.io/ipfs/" + doc.metadata.image.slice(7)
  }
}