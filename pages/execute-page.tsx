import { ConnectButton } from "web3uikit";
import Head from 'next/head'
import Header from '../components/header'
import Execute from '../components/execute'
import styles from '@/styles/Home.module.css'
import { hasToken, isOwner } from '../lib/checkUser'

export async function getServerSideProps(context: { req: any; }) {

    const token = await isOwner(context.req)

    if (!token) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return { props: {} }
}

const votePage = () => {
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
                        <Execute />
                    </section>
                </div>
            </div>

        </>
    )
}

export default votePage