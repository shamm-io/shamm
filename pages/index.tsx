import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import { useMoralis } from 'react-moralis'
import RequestFunding from '../components/request-funding'
import Propose from '../components/propose'
import Vote from '../components/vote'
import Queue from '../components/queue'
import Execute from '../components/execute'
import AcceptFunding from '../components/accept-funding'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Shamm</title>
        <meta name="description" content="A blockchain based crowdfunding platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <RequestFunding/>
      <AcceptFunding/>
      <Propose/>
      <Vote/>
      <Queue/>
      <Execute/>
      

      
      
    </>
  )
}
