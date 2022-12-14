import '../styles/global.css'
import { Fragment } from 'react'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <Head>
        <title>Mining Helper for FFXIV</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Fragment>
  )
}

export default MyApp
