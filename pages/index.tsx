import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react'
import { NFT } from '../models/NFT'

const Home: NextPage = () => {

  useEffect(() => {
    fetch('/api/nfts')
      .then(async (res) => {
        const nfts = await res.json() as NFT[]
        console.log(nfts)
      })
  }, [])


  return (
    <div>
      <Head>
        <title>ApeBase Listing - Code Test</title>
        <meta name="description" content="Just another code test" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>
          Hello World
        </h1>
      </main>
    </div>
  )
}

export default Home
