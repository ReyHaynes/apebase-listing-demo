import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
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
          { nftData?.map((nft) => {
            return (
              <div 
                key={`grid-${nft.id}`}
                className={`flex p-0.5 justify-self-center flex-col cursor-pointer rounded-lg max-w-[200px] transition ease-in-out duration-300 hover:bg-indigo-600 hover:text-white`}>
                <Image src={nft.metadata.image} width='200' height='200' alt={nft.id} />
                <div className='p-2 flex justify-center'>
                  <div>#{nft.id}</div>
                </div>
              </div>
            )}
          )}
        </section>
      </main>
    </div>
  )
}

export default Home
