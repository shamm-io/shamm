import Head from 'next/head'
// import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Card from '../components/card'
import { ConnectButton } from "web3uikit";
import CountUp, { useCountUp } from 'react-countup'
import { useSession } from 'next-auth/react';
// import { useMoralis } from 'react-moralis'
// import RequestFunding from '../components/request-funding'
// import Propose from '../components/propose'
// import Vote from '../components/vote'
// import Queue from '../components/queue'
// import Execute from '../components/execute'
// import AcceptFunding from '../components/accept-funding'
import { Splide, SplideSlide } from '@splidejs/react-splide'
import Accordion from "../components/accordion"
import '@splidejs/react-splide/css/core'
import Link from 'next/link'

export default function Home() {

  const { data: session } = useSession()

  return (
    <>
      <Head>
        <title>Shamm</title>
        <meta name="description" content="A blockchain based crowdfunding platform." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {/* <RequestFunding/>
      <AcceptFunding/>
      <Propose/>
      <Vote/>
      <Queue/>
      <Execute/> */}
      <div className={styles.backgroundImage}>
        <div className="container lg:pb-[30px] mx-auto body">
          <section className='relative lg:pt-[168px] h-[calc(100vh-5rem)] max-h-[800px]'>
            <div className='max-w-5xl mx-auto'>
              <Splide
                options={{
                  type: 'loop',
                  autoplay: true,
                  interval: 4000,
                  direction: 'ttb',
                  heightRatio: 0.17,
                  arrows: false,
                  easing: 'ease-out',
                  speed: 600
                }}
                aria-label="Main hero text"
              >
                <SplideSlide>
                  <h1 className="text-center font-black text-7xl mb-7">
                    The Future of <span className='block'>Crowdfunding</span>
                  </h1>
                </SplideSlide>
                <SplideSlide>
                  <h2 className="text-center font-black text-7xl mb-7">
                    Invest with <span className='block'>Confidence</span>
                  </h2>
                </SplideSlide>
                <SplideSlide>
                  <h2 className="text-center font-black text-7xl mb-7">
                    Time-Based <span className='block'>Automated Refunds</span>
                  </h2>
                </SplideSlide>
                <SplideSlide>
                  <h2 className="text-center font-black text-7xl mb-7">
                    Voting Power <span className='block'>for Funders</span>
                  </h2>
                </SplideSlide>
              </Splide>
              <h2 className="text-lg text-next-gray leading-[1.6] tracking-tight mb-10 text-center">Shamm is a blockchain crowdfunding platform that enables secure and transparent<br></br>investment in innovative ideas and local businesses, while building trust and supporting communities.</h2>
              <div className='mb-[30px] text-center flex justify-center gap-x-8'>
                <div className='inline-block pb-2.5'>
                  <Link href="/fund" className='px-14 h-[2.81rem] leading-[2.8rem] rounded-md bg-light-black text-white shadow-shammBtnAlt relative inline-flex items-center justify-center backdrop-blur-btn hover:bg-white hover:text-black transition-colors'>Start Investing</Link>
                </div>
                <div className='inline-block pb-2.5'>
                  <Link href="/propose" className='px-14 h-[2.81rem] leading-[2.8rem] rounded-md bg-light-black text-white shadow-shammBtnAlt relative inline-flex items-center justify-center backdrop-blur-btn hover:bg-white hover:text-black transition-colors'>Pitch Your Idea</Link>
                </div>
                <div className='inline-block pb-2.5'>

                  {session?.user ? (

                    <div id="connectWalletButton">
                      <ConnectButton moralisAuth={false} />
                    </div>
                  ) : ("")}
                </div>
              </div>
            </div>
            <ul className="flex flex-col absolute right-0 top-1/2 -translate-y-1/2 gap-y-4 items-center">
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" fill="white">
                  </path>
                </svg>
              </li>
              <li className='-mt-[0.2em]'>
                <svg className='fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="IconChangeColor" height="34" width="34"> <g> <path fill="none" d="M0 0h24v24H0z" id="mainIconPathAttribute"></path> <path d="M15.402 21v-6.966h2.333l.349-2.708h-2.682V9.598c0-.784.218-1.319 1.342-1.319h1.434V5.857a19.19 19.19 0 0 0-2.09-.107c-2.067 0-3.482 1.262-3.482 3.58v1.996h-2.338v2.708h2.338V21H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-4.598z" id="mainIconPathAttribute"></path> </g> </svg>
              </li>
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16"> <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z" fill="white"></path> </svg>
              </li>
            </ul>
          </section>
          <section>
            <div className="container max-w-5xl mx-auto">
              <h2 className='text-2xl font-bold mb-4 ml-6'>Featured Projects</h2>
              <div className="grid grid-cols-12 gap-x-4">

                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />

                <Card type="type1" stars="4.9" img="https://images.unsplash.com/photo-1682169391623-46de7799b501?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" category="Education & Youth Empowerment" title="Education for All" content="Support a project that provides free education and resources to children in underprivileged communities around the world. Every dollar you contribute..." progress="60" amount="10K" />

                <Card type="type1" stars="3.5" img="https://images.unsplash.com/photo-1682261431182-fde2c332bee9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />

                <Card type="type1" stars="3.5" img="https://images.unsplash.com/photo-1682161473727-402b497251b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=436&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />

              </div>
            </div>
          </section>

          <div className='h-20'></div>

          <section>
            <div className="container max-w-5xl mx-auto">
              <div className='flex justify-between items-center mb-4 px-6'>
                <h2 className='text-2xl font-bold'>Categories</h2>
                <a className='text-white text-xs'>View more</a>
              </div>
              <div className="grid grid-cols-12 gap-x-4">

                <Card type="type2" img="https://images.unsplash.com/photo-1682193965090-26aac3a6f89b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" title="Environment & Sustainability" content="121 Projects" />

                <Card type="type2" img="https://images.unsplash.com/photo-1682319481156-5beb20db2a4d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2N3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" title="Education & Youth Empowerment" content="121 Projects" />

                <Card type="type2" img="https://images.unsplash.com/photo-1682167176130-5dc0cbb20402?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMTB8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" title="Agriculture & Food Security" content="121 Projects" />

                <Card type="type2" img="https://images.unsplash.com/photo-1681905810170-890237bbc5a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMzF8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60" title="Health & Wellness" content="121 Projects" />

              </div>
            </div>
          </section>

          <div className='h-20'></div>

          <section>
            <div className="container max-w-5xl mx-auto flex justify-evenly">
              <div>
                <CountUp className='text-money-green text-3xl font-extrabold' end={150} suffix='k+' enableScrollSpy />
                <span className='text-white block text-3xl font-extrabold'>ETH Raised</span>
              </div>
              <div>
                <CountUp className='text-money-green text-3xl font-extrabold' end={300} suffix='+' enableScrollSpy />
                <span className='text-white block text-3xl font-extrabold'>Projects launched</span>
              </div>
              <div>
                <CountUp className='text-money-green text-3xl font-extrabold' end={500} suffix='k+' enableScrollSpy />
                <span className='text-white block text-3xl font-extrabold'>Backers</span>
              </div>
            </div>
          </section>


          <div className='h-20'></div>

          <section>
            <div className="container max-w-5xl mx-auto">
              <h2 className='text-white text-3xl font-extrabold mb-8'>How it works?</h2>

              <Accordion title="Launch a project" content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum nibh risus, consequat sed rutrum vel, tincidunt et magna. Aliquam erat volutpat. Nulla nec ipsum sapien. Quisque nibh odio, posuere eget turpis facilisis, aliquet pellentesque massa. Quisque consectetur lacinia arcu eu luctus. Quisque tempus lectus sed sem dapibus egestas. Nullam ut tempor ipsum, id tincidunt risus. In et dictum eros. Pellentesque eu bibendum velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos." />

              <Accordion title="Fund/Back a project" content="In quam urna, dapibus vitae volutpat sed, fringilla id dolor. Aliquam a tortor turpis. Nunc mollis mi vitae tellus euismod iaculis. Duis id purus vitae nisi rutrum fermentum ut et ex. Sed congue gravida tortor sit amet aliquet. Cras ultrices a mauris nec auctor. Nam in varius orci. Donec ut pulvinar eros." />
            </div>
          </section>

        </div>
        <Footer />
      </div>
    </>
  )
}
