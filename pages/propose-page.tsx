import { ConnectButton } from "web3uikit";
import Head from 'next/head'
import Header from '../components/header'
import Propose from '../components/propose'
import styles from '@/styles/Home.module.css'

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
      <div className={styles.backgroundImage}>
        <div className="container lg:pb-[30px] mx-auto body">
          <section className='relative h-[calc(100vh-5rem)] max-h-[800px]'>
            <div id="connectWalletButton" className="hidden">
              <ConnectButton moralisAuth={false} />
            </div>
            <Propose />
          </section>
        </div>
      </div>

    </>
  )
}