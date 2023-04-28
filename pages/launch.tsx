import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import Header from '../components/header'
import Footer from '../components/footer'
import React, { useCallback, useRef, useState } from 'react'
import Modal from '../components/modal'
import { initFirebase, initDB, initStorage } from '@/firebase/firebase'
import { addDoc, arrayUnion, collection, serverTimestamp, updateDoc, doc, } from "firebase/firestore"
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { useDropzone } from 'react-dropzone'

export default function Home() {

    initFirebase()

    const db = initDB()
    const storage = initStorage()

    const titleRef = useRef(null)
    const categoryRef = useRef(null)
    const goalRef = useRef(null)
    const timelineRef = useRef(null)
    const descriptionRef = useRef(null)

    const uploadProject = async () => {
        const docRef = await addDoc(collection(db, "projects"), {
            project_title: titleRef.current.value,
            project_category: categoryRef.current.value,
            project_description: descriptionRef.current.value,
            funding_timeline: timelineRef.current.value,
            funding_goal: goalRef.current.value,
            timestamp: serverTimestamp()
        })
        await Promise.all(
            selectedImages.map(image => {
                const imageRef = ref(storage, `projects/${docRef.id}/${image.path}`)
                uploadBytes(imageRef, image, "data_url").then(async () => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db,'projects',docRef.id),{
                        project_media: arrayUnion(downloadURL)
                    })
                })
            })
        )
        titleRef.current.value = ''
        goalRef.current.value = ''
        timelineRef.current.value = ''
        descriptionRef.current.value = ''

        setSelectedImages([])

        setShowModal(false)
    }

    const [showModal, setShowModal] = useState(false)

    const [selectedImages, setSelectedImages] = useState([])
    const onDrop = useCallback(acceptedFiles => {
        setSelectedImages(acceptedFiles.map(file =>
            Object.assign(file, {
                preview: URL.createObjectURL(file)
            })
        ))
    }, [])

    const { getRootProps, getInputProps } = useDropzone({ onDrop })

    const selected_images = selectedImages?.map(file => (
        <div className='w-full'>
            <img src={file.preview} style={{ width: "200px" }} alt='Shamm' />
        </div>
    ))

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
                            <h1 className='font-black text-3xl text-center border-b-2 border-b-white pb-2'>Launch Your Campaign on Shamm</h1>
                            <div className='pt-10 font-light text-lg'>
                                <h2 className='font-black text-3xl mb-3'>Why Shamm?</h2>
                                <p className='mb-6'><strong className='font-semibold'>Access to a wider audience:</strong> Shamm provides a platform for project owners to reach a global audience of potential backers who are interested in supporting innovative and impactful projects.</p>

                                <p className='mb-6'><strong className='font-semibold'>Secure funding through automated refunds:</strong> Shamm's blockchain-based platform offers project owners a level of security and peace of mind when it comes to fundraising. Our time-based automated refunds ensure that backers' funds are returned if the project does not meet its funding goal within the set timeline.</p>

                                <p className='mb-6'><strong className='font-semibold'>Take advantage of blockchain technology:</strong> Shamm leverages the power of blockchain technology to create a transparent and secure platform for project owners and backers. This ensures that all transactions are recorded and verified on the blockchain, creating a trustworthy and accountable system.</p>

                                <p className='mb-6'><strong className='font-semibold'>Expert support and resources:</strong> Shamm offers project owners a range of expert resources and support, including best practices for project design, guidance on creating rewards for backers, and tips for promoting their project to a wider audience.</p>

                                <p className='mb-6'><strong className='font-semibold'>Flexibility and control:</strong> Shamm provides project owners with the flexibility and control to design and manage their own project, including setting funding goals, creating rewards, and communicating with backers.</p>

                                <p className='mb-6'>Overall, launching a project on Shamm provides project owners with a powerful fundraising platform that offers a range of benefits and resources to help them successfully launch and grow their project.</p>

                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='container max-w-5xl mx-auto'>
                            <div className='bg-black rounded-lg py-6 px-16'>
                                <div className='grid grid-cols-12 gap-x-8 gap-y-4'>
                                    <div className='col-span-12 md:col-span-6'>
                                        <label className='block mb-1 pl-4' htmlFor="title">Title of your project *</label>
                                        <input className='bg-eerie-black w-full block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md' ref={titleRef} placeholder='Education for all' type='text'>
                                        </input>
                                    </div>

                                    <div className='col-span-12 md:col-span-6'>
                                        <label className='block mb-1 pl-4' htmlFor="category">Select category *</label>
                                        <div className='relative'>
                                            <select ref={categoryRef} name="category" id="category" className='bg-eerie-black w-full text-eerie-grey block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md appearance-none'>
                                                <option value="education">Education</option>
                                                <option value="climate">Climate</option>
                                            </select>
                                            <svg className='absolute right-4 top-2' xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="#FFF" viewBox="0 0 16 16"> <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" fill="white"></path> </svg>
                                        </div>
                                    </div>

                                    <div className='col-span-12 md:col-span-6'>
                                        <label className='block mb-1 pl-4' htmlFor="title">Funding goal *</label>
                                        <div className='relative'>
                                            <input ref={goalRef} className='bg-eerie-black w-full block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md' placeholder='8000' type='number'>
                                            </input>
                                            <span className='absolute top-[0.4em] right-4 text-eerie-grey'>ETH</span>
                                        </div>
                                    </div>

                                    <div className='col-span-12 md:col-span-6'>
                                        <label className='block mb-1 pl-4' htmlFor="title">Funding timeline *</label>
                                        <div className='relative'>
                                            <input ref={timelineRef} className='bg-eerie-black w-full block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md' placeholder='4' type='number'>
                                            </input>
                                            <span className='absolute top-[0.4em] right-4 text-eerie-grey'>Months</span>
                                        </div>
                                    </div>

                                    <div className='col-span-12'>
                                        <label className='block mb-1 pl-4' htmlFor="title">Project description *</label>
                                        <textarea ref={descriptionRef} className='bg-eerie-black w-full block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md' placeholder='Describe your project here' rows={10}>
                                        </textarea>
                                    </div>

                                    <div className='col-span-12'>
                                        <label className='block mb-1 pl-4' htmlFor="title">Add media *</label>
                                        <div className='h-28 flex items-center rounded-md justify-center border-2 border-dashed border-eerie-grey' {...getRootProps()}>
                                            <p className='text-eerie-grey'>Drag and drop or <span className='text-drop-blue underline cursor-pointer'>Browse</span></p>
                                            <input {...getInputProps()} />
                                            {selected_images}
                                        </div>
                                    </div>
                                    <div className='col-span-12 mt-4'>
                                        <button
                                            className='bg-money-green text-black px-8 py-2 rounded-md font-bold'
                                            onClick={() => {
                                                setShowModal(true);
                                            }}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    {showModal && <Modal setOpenModal={setShowModal} uploadProject={uploadProject} />}
                </div>
                <Footer />
            </div>
        </>
    )
}
