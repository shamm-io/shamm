import React from "react";
import RequestFunding from "./request-funding";
import { ConnectButton } from "web3uikit";

export default function Modal({ setOpenModal, uploadProject, contributeAmount }) {

    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40 backdrop-blur-sm"
                    onClick={() => setOpenModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-8 rounded-lg">
                    <div className="relative w-full max-w-md py-8 px-12 mx-auto bg-black text-white rounded-md shadow-lg">
                        <div className="mt-3">
                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                <h4 className="text-2xl font-semibold mb-2 ml-6 text-left">
                                    Amount (in ETH)
                                </h4>
                                {/* <div className='relative mb-4'>
                                    <input ref={contributeAmount} className='bg-eerie-black w-full block outline-none placeholder:text-eerie-grey px-4 py-1.5 rounded-md' placeholder='8000' type='number'>
                                    </input>
                                    <span className='absolute top-[0.4em] right-4 text-eerie-grey'>ETH</span>
                                </div>
                                <button
                                    className="bg-money-green text-black px-8 py-2 rounded-md font-bold"
                                    onClick={() => uploadProject()}
                                >
                                    Contribute
                                </button> */}
                                <RequestFunding />
                                <div id="connectWalletButton" className="hidden">
                                    <ConnectButton moralisAuth={false} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 