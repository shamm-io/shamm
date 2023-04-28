import { useRouter } from "next/router"
import React, { useState, useRef } from 'react';
import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../../components/header'
import Footer from '../../components/footer'
import { initFirebase, initDB } from '@/firebase/firebase'
import { doc, getDoc } from "firebase/firestore";
import Slider from "@/components/projectSlider"
import Modal from '@/components/projectModal'


function Post() {
    const router = useRouter();
    const { projectID } = router.query;

    initFirebase()

    const db = initDB()
    const [todos, setTodos] = useState(null);
    const [cats, setCats] = useState(null);
    const [title, setTitle] = useState(null);
    const [desc, setDesc] = useState(null);
    const [showModal, setShowModal] = useState(false)
    const goalRef = useRef(null)

    // console.log(projectID)
    const docRef = doc(db, "projects", "LyVfspAEPlcpXXedEVwE");

    const projects = async () => {
        try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // console.log(docSnap.data());
            } else {
                console.log("Document does not exist")
            }
            return docSnap.data()

        } catch (error) {
            console.log(error)
        }
    }

    (async () => {
        const list = await projects()
        const prj =
            <Slider>
                <img src={list['project_media'][0]}></img>
                <img src={list['project_media'][1]}></img>
                <img src={list['project_media'][2]}></img>
            </Slider>
        setTodos(prj)
        setCats(list['project_category'])
        setTitle(list['project_title'])
        setDesc(list['project_description'])
    })()

    const uploadProject = async () => {

        goalRef.current.value = ''

        setShowModal(false)
    }

    return (
        <>
            <Head>
                <title>Launch project - Shamm</title>
                <meta name="description" content="A blockchain based crowdfunding platform." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <div className={styles.backgroundImage}>
                <div className="container lg:pb-[30px] mx-auto body">
                    <section>
                        <div className='container max-w-5xl mx-auto pt-14'>
                            {todos}
                            <div className="mb-4"></div>
                            <div className="bg-black/80 rounded-lg p-4">
                                <div className="grid grid-cols-12 mb-8">
                                    <div className="col-span-8">
                                        <p className="capitalize"> &gt; {cats}</p>
                                        <a className="text-money-green underline">More media</a>
                                    </div>
                                    <div className="col-span-4">
                                        <span className="text-money-green mr-4 font-semibold">1K ETH Raised!</span>
                                        <progress className="project-slider" value="10" max="100"></progress>
                                    </div>
                                </div>
                                <div className="flex justify-between">
                                    <h1 className="text-2xl font-extrabold mb-4">{title}</h1>
                                    <button className="font-medium border-2 h-10 px-2 border-white rounded-md" onClick={() => {
                                        setShowModal(true);
                                    }}>
                                        Contribute
                                    </button>
                                </div>
                                <p className="font-semibold text-money-green mb-4">Smart contract details:</p>
                                <ul className="list-disc ml-7 mb-5">
                                    <li>Funding goal: Goal will be set when launching a campaign through passing goal in the constructor.</li>
                                    <li>Time limits:</li>
                                    <ul className="list-disc ml-10">
                                        <li>The project owner has to update the contributors in given time limit.</li>
                                        <li>The project owner has to accept funding from contributors in given time limit.</li>
                                    </ul>
                                    <li>Conditions for refund:</li>
                                    <ul className="list-disc ml-10">
                                        <li>If the project owner fails to update the contributors about the progress of the project contributors in given time limit, then all funding will be automatically refunded to the contributors.</li>
                                        <li>If the the project owner fails to accept funding from a contributor in given given time limit, then the funding amount will be refunded to their owners.</li>
                                    </ul>
                                    <li>Funding withdrawal: Once the funding goal is reached, the campaign owner can propose “Withdraw” function to withdraw a quarter of the total funding through a voting process in which every contributor can participate.</li>
                                </ul>

                                <p className="font-semibold text-money-green mb-5">Project description:</p>
                                <p>{desc}</p>
                            </div>
                            <p className="my-5 font-bold">You can also take a look at the smart contract code for this project, and track the project on Etherscan.</p>
                            <div className='mb-[30px] text-center flex justify-start gap-x-8'>
                                <div className='inline-block pb-2.5'>
                                    <a href="/fund" className='px-14 h-[2.81rem] leading-[2.8rem] rounded-md bg-light-black text-white shadow-shammBtnAlt relative inline-flex items-center justify-center backdrop-blur-btn hover:bg-white hover:text-black transition-colors'>Link to smart contract</a>
                                </div>
                                <div className='inline-block pb-2.5'>
                                    <a href="/propose" className='px-14 h-[2.81rem] leading-[2.8rem] rounded-md bg-light-black text-white shadow-shammBtnAlt relative inline-flex items-center justify-center backdrop-blur-btn hover:bg-white hover:text-black transition-colors'>Track this project</a>
                                </div>
                            </div>
                        </div>
                    </section>
                    {showModal && <Modal setOpenModal={setShowModal} uploadProject={uploadProject} contributeAmount={goalRef} />}
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default Post;