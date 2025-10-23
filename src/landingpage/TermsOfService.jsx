import { X } from "lucide-react";

export const TermsOfService = ({ onOpen, onClose }) => {
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };
    if (!onOpen) return null;
    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-black/40 bg-opacity-60 flex items-center justify-center z-50 px-3 sm:px-5 py-8"
        >
            <div className="bg-white text-black rounded-lg shadow-lg max-w-3xl w-full relative">
                {/* Scrollable content area */}
                <div className="max-h-[90vh] overflow-y-auto p-6 no-scrollbar">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b pb-3 mb-4">
                        <h2 className="font-semibold text-lg">Career-Nexus Terms and Conditions</h2>
                        <button onClick={onClose} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                            <X />
                        </button>
                    </div>

                    <h1 className="font-bold">Effective March 1<sup>st</sup> 2025</h1><br />
                    <h1 className="font-bold">1. Acceptance of Terms</h1>
                    <p>By accessing or using Career-Nexus (“Platform”), you agree to comply with these Terms,
                        our <a href="#">Privacy Policy,</a> and all applicable UK/EU laws. If you disagree, do not use the Platform.</p>
                    <br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">2. Eligibility</h1>
                        <p>You must:</p>
                        <li >Be <span className="font-bold">at least 16 years old. </span></li>
                        <li >Provide   <span className="font-bold">accurate professional information </span>(e.g., education, work history).</li>
                        <li >Not impersonate others or misuse AI/VR tools.</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">3. Account Responsibilities</h1>
                        <h1 className="font-bold">3.1 Profile Integrity</h1>
                        <li >Be <span className="font-bold">at least 16 years old. </span></li>
                        <li >Keep your profile truthful. False claims (e.g., fake certifications) may result in suspension.</li>
                        <li >Report suspicious activity to <a href="#" className="underline text-green-200">security@career-nexus.com.</a></li>
                    </ul>
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">3.2 Content Ownership</h1>
                        <li >You retain the right to content your post (e.g., resumes, project portfolios).</li>
                        <li >Grant Career-Nexus is a <span className="font-bold">non-exclusive, royalty-free license</span> to display, distribute, and
                            analyze your content for Services functionality (e.g., AI job matching)</li>
                    </ul>
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">3.3 Prohibited Conduct</h1>
                        <p>Do not:</p>
                        <li >Harass others, share misinformation, or spam networks.</li>
                        <li >Exploit AI tools to scrape data or reverse-engineer algorithms.</li>
                        <li >Misuse VR simulations (e.g., hacking, unauthorized distribution).</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">4. Services Overview</h1>
                        <h1 className="font-bold">4.1 Core Features</h1>
                        <li ><span className="font-bold">AI Job Matching:</span> Algorithmic recommendations based on profile data.</li>
                        <li ><span className="font-bold">VR Training:</span> Skill development modules with blockchain-verified certifications.</li>
                        <li ><span className="font-bold">Networking:</span> Connect with mentors, employers, or peers globally</li>
                    </ul>
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">4.2 Premium Subscriptions</h1>
                        <li >Paid plans (e.g., Career Accelerator) auto-renew monthly/annually in GBP.</li>
                        <li >Cancel anytime via <a href="#" className="underline text-green-200">Settings.</a> No refunds for partial periods.</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">5. Data and Privacy</h1>
                        <li >Data use is governed by our <a href="#" className="underline text-green-200">Privacy Policy</a></li>
                        <li >We collect usage data (e.g., VR progress, job applications) to improve Services.</li>
                        <li >UK/EU users: Review our   <a href="#" className="underline text-green-200">Data Processing Addendum</a> for GDPR compliance.</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">6. Termination</h1>
                        <li >We may suspend accounts for breaches (e.g., fraud, harassment).</li>
                        <li >You may delete accounts via <a href="#" className="underline text-green-200">Settings.</a> Residual data may persist in backups.</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">7. Disclaimers</h1>
                        <li ><span className="font-bold">“As Is” Services: </span> We do not guarantee job placements, mentorship outcomes, or VR
                            module accuracy.</li>
                        <li ><span className="font-bold">Third-Party Links: </span>We are not responsible for external sites (e.g., employer career pages).</li>
                        <li ><span className="font-bold">Limitation of Liability: </span> We exclude liability for indirect damage (e.g., lost opportunities).</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">8. Intellectual Property</h1>
                        <li >Career-Nexus owns all Platform IP (e.g., logos, AI algorithms, VR content).</li>
                        <li >Do not replicate or resell certifications, training materials, or job-matching tools.</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">9. Dispute Resolution</h1>
                        <li >Governed by <span className="font-bold">English law.</span></li>
                        <li >Negotiate disputes in good faith. Unresolved issues may apply to UK courts.</li>
                    </ul><br />
                    <ul className="list-disc list-inside">
                        <h1 className="font-bold">10. Updates</h1>
                        <li >We may revise these Terms. Continued use after changes constitutes acceptance.</li>
                        <li >Negotiate disputes in good faith. Unresolved issues may apply to UK courts.</li>
                    </ul>
                    <div><br />
                        <h1 className="font-bold">Contact Us:</h1>
                        <p>For questions, contact <a href="#" className="underline text-green-200">support@career-nexus.com.</a></p>
                    </div>
                </div>
            </div>
        </div>
    )
}