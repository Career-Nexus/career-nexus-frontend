import { X } from 'lucide-react';
import React from 'react'


export const PrivacyPolicy = ({ onOpen, onClose }) => {
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
                        <h2 className="font-semibold text-lg">Career-Nexus Privacy Policy</h2>
                        <button onClick={onClose} className="bg-gray-100 p-2 rounded-lg hover:bg-gray-200">
                            <X />
                        </button>
                    </div>
                    <h1 className="font-bold">Effective March 1<sup>st</sup> 2025</h1><br />
                    <h2 className="font-bold">Your Career, Your Control</h2>
                    <p className="text-gray-500">
                        At Career-Nexus, our mission is to empower professionals globally by bridging education and
                        employment, equipping you with the tools to own your career journey. Transparency is at our
                        core: we're committed to clarity about the data we collect, how it fuels your growth, and who it's
                        shared with.
                    </p>
                    <br />
                    <p className="text-gray-500">
                        This Privacy Policy governs your use of Career-Nexus Services, including AI-driven job matching,
                        VR skill simulations, blockchain-certified training, and global networking features. You have
                        control over your data through customizable privacy settings, granular consent options, and
                        choices outlined in this policy, our <a href="#" className="underline text-green-200">Cookie Guidelines</a>, and your <a href="#" className="underline text-green-200">Profile Controls</a>.
                    </p><br />
                    <h2 className="font-bold">Key Principles</h2>
                    <h2 className="font-bold">Your Choices, Your Power:</h2>
                    <ul className='list-disc list-inside text-gray-500'>
                        <li>Members manage data permissions via <a href="#" className="underline text-green-200">Career Dashboard.</a></li>
                        <li>Visitors control tracking preferences <a href="#" className="underline text-green-200">here.</a></li>
                        <li>Opt in/out of AI-driven insights, mentorship alerts, or VR progress sharing.</li>
                    </ul><br />
                    <h2 className="font-bold">Innovation with Integrity:</h2>
                    <p className="text-gray-500">We collect only what's essential to unlock opportunities; never sell your data.
                        Trust drives our community. Together, we're redefining career success.
                    </p><br />
                    <ol className="list-decimal list-inside text-gray-500">
                        <h2 className="font-bold">Tables of Contents</h2>
                        <li>Introduction </li>
                        <li>Data Collection</li>
                        <li>Data Usage</li>
                        <li>Information Sharing</li>
                        <li>Your Choices & Obligations</li>
                        <li>Other Important Information</li>
                    </ol><br />
                    <h1 className="font-bold">1. Introduction</h1>
                    <p className="text-gray-500">
                        Career-Nexus is a professional networking and career-development platform. Our Services help
                        Members and Visitors <span className="font-bold">build careers, access industry-specific training, and connect with
                            opportunities.</span> This Privacy Policy applies to all users of Career-Nexus Services, including
                        Members (registered users) and Visitors.
                    </p>
                    <ul className="text-gray-500 list-disc list-inside">
                        <h1 className="font-bold">Key Definitions:</h1>
                        <li><span className="font-bold">Members: </span>Registered users who share professional profiles, engage with career
                            resources, and network.
                        </li>
                        <li><span className="font-bold">Visitors: </span>Non-members who view public content.</li>
                        <li><span className="font-bold">Designated Countries:</span> Refers to the UK, EU, EEA, and Switzerland.</li>
                    </ul>
                    <h1 className="font-bold">Services Covered:
                    </h1>
                    <p className="text-gray-500">This policy applies to <span className="font-bold">Career-Nexus.com,</span> Career-Nexus-branded apps, VR training modules, AI
                        job-matching tools, and plugins like <span className="font-bold">"Apply with Career-Nexus".</span>
                    </p>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">Data Controller:</h1>
                        <li><span className="font-bold">UK/EU/EEA/Switzerland:</span> Career-Nexus UK Ltd. (registered in England).</li>
                        <li><span className="font-bold">Outside Designated Countries:</span> Career-Nexus Global Inc.</li>
                    </ul><br />
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">2. Data Collection</h1>
                        <h1 className="font-bold">2.1 Data You Provide</h1>
                        <li><span className="font-bold">Registration: </span>Name, email, mobile number, location (city), password, and payment
                            details for premium Services.</li>
                        <li><span className="font-bold">Profile:</span> Education, work history, skills, certifications (including blockchain-verified
                            credentials), and optional verifications.</li>
                        <li><span className="font-bold">Content: </span> Posts, resumes, job applications, and calendar data synced for networking</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">2.2 Data from Others</h1>
                        <li><span className="font-bold">Public Sources: </span>Professional news, accomplishments, or mentions.</li>
                        <li><span className="font-bold">Partners: </span> Employers, training providers, or recruitment platforms.</li>
                        <li><span className="font-bold">Affiliates: </span> Data from Career-Nexus Academy (e.g., VR training progress).</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">2.3 Automated Collection</h1>
                        <li><span className="font-bold">Usage Data: </span>Logins, clicks, searches, VR module interactions, and device/IP data.</li>
                        <li><span className="font-bold">Cookies: </span> Track activity across devices (see Cookie Policy).</li>
                        <li><span className="font-bold">Location: </span> Approximate location via IP or precise GPS (with consent).</li>
                    </ul><br />
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">3. Data Usage</h1>
                        <h1 className="font-bold">3.1 Core Services</h1>
                        <li><span className="font-bold">Networking: </span>Suggest connections via AI, sync calendars for events, and enable
                            collaboration.</li>
                        <li><span className="font-bold">Career Development:</span> Recommend jobs, skills, and VR training modules based on
                            profile gaps.</li>
                        <li><span className="font-bold">Employer Tools: </span> Help organizations manage talent pipelines and verify certifications.</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">3.2 Premium Services</h1>
                        <li><span className="font-bold">Career Coaching: </span>Match Members with industry mentors.</li>
                        <li><span className="font-bold">AI Job Matching: </span> Analyze profiles to connect employers with candidates.</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">3.3 Communications</h1>
                        <li>Send service updates, security alerts, and career tips.</li>
                        <li>Enable messaging between Members and employers.</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">3.4 Advertising</h1>
                        <li>Serve personalized ads using profile data, activity, and inferences (e.g.,
                            industry/seniority).</li>
                        <li><span className="font-bold">Opt-Out: </span> Adjust ad preferences <a href="#" className="underline text-green-200">here.</a></li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">3.5 Security & Compliance</h1>
                        <li>Detect fraud, enforce policies, and comply with UK/EU regulations.</li>
                    </ul><br />
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">4. Information Sharing</h1>
                        <h1 className="font-bold">4.1 Public Profile & Activity</h1>
                        <li>Profile visibility: Public to all Members/Visitors.</li>
                        <li>Posts, comments, and VR training achievements are shared per your settings.</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">4.2 Employers & Partners</h1>
                        <li>Employers using Career-Nexus Talent Solutions see limited profile data (name, title,
                            skills).</li>
                        <li>Training partners receive certification progress (with consent).</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">4.3 Legal & Mergers</h1>
                        <li>Disclose data if required by UK law (e.g., HMRC, ICO).</li>
                        <li>Share data during mergers or acquisitions.</li>
                    </ul><br />
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">5. Your Choices & Obligations</h1>
                        <h1 className="font-bold">5.1 Data Rights</h1>
                        <li><span className="font-bold">Access/Delete:</span> Request via <a href="#" className="underline text-green-200">Settings</a> or email <a href="#" className="underline text-green-200">DPO@career-nexus.com</a></li>
                        <li><span className="font-bold">Opt-Out:</span> Object to data processing or withdraw consent</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">5.2 Account Closure</h1>
                        <li>Deactivate or delete accounts in Settings. Residual data may persist in backups.</li>
                    </ul><br />
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">6. Other Important Information</h1>
                        <h1 className="font-bold">6.1 Security</h1>
                        <li>Use HTTPS, encryption, and 2FA (enable <a href="#" className="underline text-green-200">here.</a>) </li>
                        <li>Report vulnerabilities to <a href="#" className="underline text-green-200">security@career-nexus.com</a></li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">6.2 Cross-Border Transfers</h1>
                        <li>Data stored in UK/EU servers. Transfers outside EEA use GDPR-approved safeguards.</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">6.3 UK/EU Rights</h1>
                        <li>Lodge complaints with the <span className="font-bold">UK Information Commissioner's Office (ICO).</span></li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">6.4 Contact Us</h1>
                        <li className="font-bold"><span>Data Protection Officer:</span> <a href="#" className="underline text-green-200">DPO@career-nexus.com.</a></li>
                    </ul><br />
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">Career-Nexus Supplemental Notices</h1>
                        <h1 className="font-bold">UK & European Regional Addendum</h1>
                        <li ><span className="font-bold">Lawful Bases</span> Process data under UK GDPR/Data Protection Act 2018 (consent,
                            contract, legitimate interests).</li>
                        <li ><span className="font-bold">Data Transfers</span> Rely on Standard Contractual Clauses (SCCs) for non-UK transfers.</li>
                    </ul>
                    <ul className="list-disc list-inside text-gray-500">
                        <h1 className="font-bold">California Privacy Notice</h1>
                        <li ><span className="font-bold">CCPA Rights: </span>Opt out of data sales <a href="#" className="underline text-green-200"> here.</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
