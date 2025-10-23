"use client"

import { useState } from "react"
import { PrivacyPolicy } from "./PrivacyPolicy"
import { TermsOfService } from "./TermsOfService"
import ContactUs from "./ContactUs"
import { Facebook, Instagram, Linkedins, X } from '../icons/icon'
export default function Footer() {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false)
  const [isContactUsOpen, setIsContactUsOpen] = useState(false)

  const footerSections = [
    {
      title: "Services",
      links: [
        { name: "Workforce Upskilling", url: "#" },
        { name: "Career Advancement", url: "#" },
        { name: "Talent Acquisition & Freelancing", url: "#" },
        { name: "Enterprise Consulting", url: "#" },
        { name: "Professional Networking", url: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About us", url: "#" },
        { name: "Contact", onClick: () => setIsContactUsOpen(true) },
        { name: "Jobs", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { name: "Privacy Policy", onClick: () => setIsPrivacyPolicyOpen(true) },
        { name: "Terms of Service", onClick: () => setIsTermsOfServiceOpen(true) },
        { name: "Refund Policy", url: "#" },
        { name: "Cookie Policy", url: "#" },
      ],
    },
  ]


  return (
    <footer className="bg-black text-white">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Footer sections */}
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-base font-bold leading-6">{section.title}</h3>
                  <ul className="mt-6 space-y-4">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        {/* <a href={link.url} className="text-lg text-gray-400 hover:text-white transition-colors">
                          {link.name}
                        </a> */}
                        {link.onClick ? (
                          <button
                            onClick={link.onClick}
                            className="text-lg text-gray-400 hover:text-white transition-colors"
                          >
                            {link.name}
                          </button>
                        ) : (
                          <a
                            href={link.url}
                            className="text-lg text-gray-400 hover:text-white transition-colors"
                          >
                            {link.name}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          {/* social media links */}
          <div className="col-span-1">
            <h6 className="footer-title font-bold mb-5">Social</h6>
            <div className="flex gap-4">
              <a href='https://x.com/CareerNexusLtd'>
                <X />
              </a>
              <a href='https://www.linkedin.com/company/career-nexus-ltd/'>
                <Linkedins />
              </a>
              <a href='https://www.instagram.com/careernexus.ltd/'>
                <Instagram />
              </a>
              <a href='https://web.facebook.com/profile.php?id=61573074954161'>
                <Facebook />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <p className="text-center text-sm text-gray-400">Copyright © 2025 Career-Nexus Ltd. All rights reserved.</p>
        </div>
      </div>
      <PrivacyPolicy
        onOpen={isPrivacyPolicyOpen}
        onClose={() => setIsPrivacyPolicyOpen(false)}
      />
      <TermsOfService
        onOpen={isTermsOfServiceOpen}
        onClose={() => setIsTermsOfServiceOpen(false)}
      />
      <ContactUs
        onOpen={isContactUsOpen}
        onClose={() => setIsContactUsOpen(false)}
      />
    </footer>
  )
}
