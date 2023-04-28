import React from "react";

export default function Modal({ setOpenModal, uploadProject }) {
    return (
        <>
            <div className="fixed inset-0 z-10 overflow-y-auto">
                <div
                    className="fixed inset-0 w-full h-full bg-black opacity-40 backdrop-blur-sm"
                    onClick={() => setOpenModal(false)}
                ></div>
                <div className="flex items-center min-h-screen px-4 py-4 rounded-lg">
                    <div className="relative w-full max-w-2xl p-4 px-6 pt-0 mx-auto bg-black text-white rounded-md shadow-lg">
                        <div className="mt-3 sm:flex">
                            <div className="mt-2 text-center sm:ml-4 sm:text-left">
                                <h4 className="text-2xl font-semibold text-center mb-4">
                                    Terms & Conditions
                                </h4>
                                <ol className="list-decimal ml-4 mb-4">
                                    <li>Eligibility: Project owners must be at least 18 years of age and have a valid form of identification to launch a project on Shamm. Projects must be legal and not infringe on the intellectual property rights of others.</li>

                                    <li>Project Details: Project owners must provide accurate and complete information about their project, including the project description, funding goal, timeline, and rewards. Shamm reserves the right to review and approve or reject projects that do not meet our guidelines.</li>

                                    <li>Funding and Refunds: Project owners agree to use the funds raised on Shamm solely for the purposes outlined in their project description. Shamm will provide automated refunds to backers if the project does not reach its funding goal within the set timeline.</li>

                                    <li>Rewards: Project owners are responsible for creating and managing their own rewards for backers. Project owners must deliver rewards to backers in a timely manner and as described in their project description.</li>

                                    <li>Fees: Shamm charges a platform fee of [insert percentage or flat rate] on all funds raised. This fee covers the cost of running the platform and providing support to project owners and backers.</li>

                                    <li>Taxes: Project owners are responsible for complying with all applicable tax laws and regulations related to their project. Shamm is not responsible for any taxes or fees that may be incurred as a result of launching a project on our platform.</li>

                                    <li>Communication: Project owners agree to communicate with their backers in a timely and transparent manner throughout the project funding period and delivery of rewards.</li>

                                    <li>Disputes: Any disputes between project owners and backers will be handled in accordance with Shamm's dispute resolution process. Shamm reserves the right to suspend or terminate a project if a dispute cannot be resolved.</li>

                                    <li>Liability: Shamm is not liable for any damages or losses incurred by project owners or backers as a result of using our platform. Project owners and backers assume all risks associated with launching and backing projects on Shamm.</li>

                                    <li>Modification: Shamm reserves the right to modify these terms and conditions at any time. Project owners will be notified of any changes to our terms and conditions and must agree to the updated terms in order to continue using our platform.</li>

                                </ol>
                                <p className="mb-4 -ml-2.5">By launching a project on Shamm, project owners agree to these terms and conditions and agree to comply with all guidelines and policies set forth by the platform.</p>
                                <button
                                    className="bg-money-green -ml-2.5 text-black px-8 py-2 rounded-md font-bold"
                                    onClick={() => uploadProject()}
                                >
                                    I agree
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
} 