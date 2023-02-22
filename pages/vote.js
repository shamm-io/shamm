import Head from 'next/head'
import Header from '../components/header'
import Vote from '../components/vote'

export default function proposePage() {
  return (
    <>
      <Head>
        <title>Shamm</title>
        <meta name="description" content="A blockchain based crowdfunding platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Vote />
    </>
  )
}