import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    document.body.className = 'bg-white text-black dark:bg-black dark:text-white'
  })

  return <Component {...pageProps} />
}

export default MyApp
