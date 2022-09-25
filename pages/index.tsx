import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import NFTCard from '../components/NFTCard'
import { NFT } from '../models/NFT'

const Home: NextPage = () => {
  const [nftData, setNFTData] = useState<NFT[]>([])

  useEffect(() => {
    fetch('/api/nfts')
      .then(async (res) => {
        const nfts = await res.json() as NFT[]
        setNFTData(nfts)
      })
  }, [])


  return (
    <div>
      <Head>
        <title>ApeBase Listing - Code Test</title>
        <meta name="description" content="Just another code test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='p-4'>
        <section className={`grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 m-0 transition-[margin]`}>
          { nftData?.map((nft) => 
            <NFTCard 
              key={nft.id} 
              id={nft.id} 
              imageURL={nft.metadata.image} 
              imageDimension={200} />
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
