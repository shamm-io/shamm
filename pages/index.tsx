import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import { useMoralis } from 'react-moralis'
import RequestFunding from '../components/request-funding'
import Propose from '../components/propose'
import Vote from '../components/vote'
import Queue from '../components/queue'
import Execute from '../components/execute'
import AcceptFunding from '../components/accept-funding'
import Link from 'next/link'

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
      {/* <RequestFunding/>
      <AcceptFunding/>
      <Propose/>
      <Vote/>
      <Queue/>
      <Execute/> */}
      <div className="container lg:pt-[168px] lg:pb-[30px] max-w-5xl mx-auto">
        <h1 className="text-center font-extrabold text-[100px] leading-[1] tracking-tighter mb-7">Shamm - The Future of Crowdfunding</h1>
        <h2 className="text-lg text-next-gray leading-[1.6] tracking-tight mb-10 text-center">Shamm is a blockchain crowdfunding platform that enables secure and transparent investment in innovative ideas and local businesses, while building trust and supporting communities.</h2>
        <div className='mb-[30px] text-center'>
          <div className='inline-block pb-2.5'>
            <Link href="/fund" className='px-14 h-[2.81rem] leading-[2.8rem] rounded-[7px] bg-black text-white shadow-nextInverted relative inline-flex items-center justify-center'>Start Investing</Link>
          </div>
          <div className='inline-block pb-2.5'>
            <Link href="/propose" className='px-14 h-[2.81rem] leading-[2.8rem] rounded-[7px] bg-white text-dim-gray shadow-next relative inline-flex items-center justify-center'>Pitch Your Idea</Link>
          </div>
        </div>
      </div>
    </>
  )
}
