import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import Slider from '../components/slider'
import Card from '../components/card'

export default function Home() {
    return (
        <>
            <Head>
                <title>Browse Projects - Shamm</title>
                <meta name="description" content="A blockchain based crowdfunding platform." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.backgroundImage}>
                <div className="container lg:pb-[30px] mx-auto body">
                    <section>
                        <div className='container max-w-5xl mx-auto'>
                            <div className='flex gap-x-4 mb-12 pt-14 items-center justify-center'>
                                <div className='relative'>
                                    <input className='bg-black w-96 outline-none placeholder:text-input-grey px-4 py-1.5 rounded-lg backdrop-blur-btn shadow-accordion border border-card-border' placeholder='Search' type='text'>
                                    </input>
                                    <svg className='absolute top-[0.65rem] right-3' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFF" viewBox="0 0 16 16"> <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" fill="#FFF"></path> </svg>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#FFF" viewBox="0 0 16 16"> <path fill-rule="evenodd" d="M11.5 2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM9.05 3a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0V3h9.05zM4.5 7a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM2.05 8a2.5 2.5 0 0 1 4.9 0H16v1H6.95a2.5 2.5 0 0 1-4.9 0H0V8h2.05zm9.45 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm-2.45 1a2.5 2.5 0 0 1 4.9 0H16v1h-2.05a2.5 2.5 0 0 1-4.9 0H0v-1h9.05z" fill="#FFF"></path> </svg>

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#FFF" viewBox="0 0 16 16"> <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" fill="#FFF"></path> </svg>
                            </div>
                            <div className='flex justify-between items-center mb-4 px-6'>
                                <h2 className='text-2xl font-bold'>Environment & Sustainability</h2>
                                <a className='text-white text-xs'>View more</a>
                            </div>
                            <Slider>
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help Us in building the ecology" progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                            </Slider>

                            <div className='h-20'></div>

                            <div className='flex justify-between items-center mb-4 px-6'>
                                <h2 className='text-2xl font-bold'>Education & Youth Empowerment</h2>
                                <a className='text-white text-xs'>View more</a>
                            </div>
                            <Slider>
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help Us in building the ecology" progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                            </Slider>

                            <div className='h-20'></div>

                            <div className='flex justify-between items-center mb-4 px-6'>
                                <h2 className='text-2xl font-bold'>Innovation & Technology</h2>
                                <a className='text-white text-xs'>View more</a>
                            </div>
                            <Slider>
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help Us in building the ecology" progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                                <Card type="type1" stars="3.5" img="https://plus.unsplash.com/premium_photo-1680776074086-6883674e03e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" category="Environment & Sustainability" title="Clean Oceans Initiative" content="Help fund a revolutionary technology that cleans up plastic waste from our oceans and turns it into useful products. Join the fight against plastic pollution..." progress="40" amount="5K" />
                            </Slider>

                            <div className='h-12'></div>

                            <div className='text-center'>
                                <a className='bg-black py-2 px-4 rounded-lg border border-card-border shadow-shammBtnAlt backdrop-blur-btn' role='button'>More categories</a>
                            </div>

                            <div className='h-8'></div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}
