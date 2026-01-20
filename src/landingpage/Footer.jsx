"use client"

import { useState } from "react"
import { PrivacyPolicy } from "./PrivacyPolicy"
import { TermsOfService } from "./TermsOfService"
import ContactUs from "./ContactUs"
import { Facebook, Instagram, Linkedins, X } from '../icons/icon'
import { ActivityService } from "../api/ActivityServices"
import { toast } from "react-toastify"
export default function Footer() {
  const [isPrivacyPolicyOpen, setIsPrivacyPolicyOpen] = useState(false)
  const [isTermsOfServiceOpen, setIsTermsOfServiceOpen] = useState(false)
  const [isContactUsOpen, setIsContactUsOpen] = useState(false)
  const [email, setEmail] = useState("")

  //newsletter subscribe function
  const handleSubscribe = async () => {
    if (!email.trim()) {
      toast.error("Please enter a valid email address")
      return
    }
    try {
      const response = await ActivityService.newsletterSubscribe(email)
      if (response.success) {
        console.log("Newsletter subscription successful", response.data)
        toast.success("Subscribed to newsletter successfully!")
        setEmail("") // Reset email input
      } else {
        toast.error(response.error || "Failed to subscribe to newsletter. Please try again.")
      }
    } catch (error) {
      console.log("Newsletter subscription failed", error)
      toast.error("Failed to subscribe to newsletter. Please try again.")
    }
  }
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
            <h6 className="footer-title font-bold mt-8">Subscribe to our newsletter</h6>
            <div className="">
              <input 
                type="email" 
                className="mt-4 w-full max-w-2xl px-4 py-2 rounded-md text-black border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#5DA05D]" 
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <button onClick={handleSubscribe} className="mt-5 px-4 py-2 bg-[#5DA05D] text-white rounded-md hover:bg-[#4d8a4d] transition-colors">Subscribe</button>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          {/* <p className="text-center text-sm text-gray-400">Copyright © 2025 Career-Nexus Ltd. All rights reserved.</p> */}
          <p className="text-center text-sm text-gray-400">Career-Nexus is a UK-registered company building a global career development ecosystem focused on mentorship, guidance, and opportunity.</p>
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
