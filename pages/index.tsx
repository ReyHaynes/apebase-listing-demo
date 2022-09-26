import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import Cart from '../components/Cart'
import NFTCard from '../components/NFTCard'
import { Attributes, NFT } from '../models/NFT'
// import { dbQuery } from '../services/database'

const Home: NextPage = () => {
  const [nftData, setNFTData] = useState<NFT[]>([])
  const [cartData, setCartData] = useState<NFT[]>([])
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)

  useEffect(() => {
    fetch('/api/nfts')
      .then(async (res) => {
        const nfts = await res.json() as NFT[]
        setNFTData(nfts)
      })
  }, [])

  useEffect(() => {
    if (cartData.length > 0) setIsSidebarOpen(true)
    else setIsSidebarOpen(false)
  }, [cartData])

  const handleGridClick = (nft: NFT) => {
    if (cartData.find(item => item.id === nft.id)) {
      removeNFTFromCart(nft)
      return
    }
    setCartData([...cartData, nft])
  }

  const handleCartClick = (nft: NFT) => {
    removeNFTFromCart(nft)
  }

  const handleClearAllClick = () => {
    setCartData([])
  }

  const removeNFTFromCart = (nft: NFT) => {
    setCartData(cartData.filter(item => item.id !== nft.id))
  }


  return (
    <div>
      <Head>
        <title>ApeBase Listing - Code Test</title>
        <meta name="description" content="Just another code test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='p-4'>
        <section className={`grid grid-cols-1 gap-5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 m-0 transition-[margin] ${isSidebarOpen ? '!mb-44' : ''}`}>
          { nftData?.map((nft) => 
            <NFTCard 
              key={nft.id} 
              id={nft.id} 
              imageURL={nft.metadata.image} 
              imageDimension={200}
              isSelected={!!cartData.find(item => item.id === nft.id)}
              onNFTCardClick={() => handleGridClick(nft)}/>
          )}
        </section>
        <section className={`fixed w-screen bg-slate-300 dark:bg-neutral-900 bottom-0 left-0 transition-[height,padding] p-0 h-0 ${isSidebarOpen ? '!p-4 !h-44' : ''}`}>
          <Cart
            cartData={cartData}
            onClearAllClick={handleClearAllClick}>
            { cartData?.map((nft) => (
              <NFTCard 
                key={nft.id} 
                id={nft.id} 
                imageURL={nft.metadata.image} 
                imageDimension={75}
                onNFTCardClick={() => handleCartClick(nft)} />
            ))}
          </Cart>
        </section>
      </main>
    </div>
  )
}

// TODO: Server Side Filter Gathering
// export async function getStaticProps() {
//   const nfts = await dbQuery({}, 0, 10000) as NFT[]

//   let attributeSet: Attributes[] = []

//   nfts.map(nft => {
//     nft.metadata.attributes.map(attribute => {
//       if (!!!attributeSet.find(item => item.trait_type == attribute.trait_type && item.value == attribute.value)) {
//         attributeSet = [...attributeSet, attribute]
//       }
//     })
//   })

//   return {
//     props: {
//       attributesList: attributeSet
//     }
//   }
// }

export default Home
