import * as Datastore from 'nedb';
import { NFT } from '../models/NFT';

export const db = new Datastore({ filename: "./lib/db", autoload: true });

export const dbQuery = (q: object, page: number, pagination: number, optimizeSize: boolean = true) => {
  return new Promise((resolve, reject) => {
    db.find(q).limit(pagination).skip(page * pagination)
      .exec((err: any, response: NFT[]) => {
          // Reduce Client payload by 50%
          if (optimizeSize) {
          const nfts: NFT[] = response.map((res => {
            return {
              id: res.id,
              metadata: {
                image: adjustImagePath(res.metadata.image),
                attributes: res.metadata.attributes
              }
            }
          }))
          resolve(nfts)
        }
        else {
          response.forEach(transformImage)
          resolve(response)
        }
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

const transformImage = (data: NFT) => {
  if (data.metadata.image.startsWith("Qm")) {
    data.metadata.image = "https://ipfs.io/ipfs/" + data.metadata.image
  } else if (data.metadata.image.startsWith("/ipfs")) {
    data.metadata.image = "https://ipfs.io/ipfs/" + data.metadata.image.slice(5)
  } else if (data.metadata.image.startsWith("ipfs://ipfs")) {
    data.metadata.image = "https://ipfs.io/ipfs/" + data.metadata.image.slice(12)
  } else if (data.metadata.image.startsWith("ipfs://")) {
    data.metadata.image = "https://ipfs.io/ipfs/" + data.metadata.image.slice(7)
  }
}