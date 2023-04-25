import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'

export default function Home() {
    return (
        <>
            <Head>
                <title>About - Shamm</title>
                <meta name="description" content="A blockchain based crowdfunding platform." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.backgroundImage}>
                <div className="container lg:pb-[30px] mx-auto body">
                    <section>
                        <div className='container max-w-5xl mx-auto pt-14'>
                            <h1 className='font-black text-3xl text-center border-b-2 border-b-white pb-2'>About Shamm: Our Mission and Vision</h1>
                            <div className='pt-10 font-light text-lg'>
                                <p className='mb-8'>Welcome to Shamm, a blockchain-based crowdfunding platform that provides security and peace of mind to funders. We're a team of passionate developers, entrepreneurs, and blockchain enthusiasts who believe that everyone should have access to secure and trustworthy crowdfunding opportunities.</p>

                                <p className='mb-8'>Shamm uses the power of blockchain technology to provide a transparent and secure environment for crowdfunding campaigns. With our platform, funders can rest assured that their contributions will be used as intended and that they have a say in the outcome of the campaign.</p>

                                <p className='mb-8'>One of the unique features of Shamm is the use of time-based automated refunds. This means that if a campaign fails to meet its funding goal within a set timeframe, all funders will automatically receive a refund. This provides peace of mind to funders, who can be confident that their contributions will not be lost if a campaign is unsuccessful.</p>

                                <p className='mb-8'>In addition to time-based refunds, Shamm also gives funders voting power in the campaign. This means that funders can have a say in the decisions made by the campaign creator, and can help guide the campaign toward success.</p>

                                <p className='mb-8'>At our core, we believe that crowdfunding should be accessible, transparent, and secure. Shamm is built with these values in mind, and we're committed to providing a crowdfunding experience that is both rewarding and trustworthy.</p>

                                <p className='mb-8'>Thank you for considering Shamm for your crowdfunding needs. We're excited to see the great ideas and projects that will be brought to life through our community of funders and creators.</p>

                                <p className='font-medium'>Contact us: <a href="mailto:info@shamm.com">info@shamm.com</a></p>
                            </div>
                        </div>
                    </section>
                </div>
                <Footer />
            </div>
        </>
    )
}
