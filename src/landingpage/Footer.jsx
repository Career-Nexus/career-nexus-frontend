"use client"

import { useState } from "react"

export default function Footer() {
  const [email, setEmail] = useState("")

  const handleSubscribe = (e) => {
    e.preventDefault()
    // Handle subscription logic here
    console.log("Subscribed with email:", email)
    setEmail("")
  }

  const footerSections = [
    {
      title: "Services",
      links: [
        "Workforce Upskilling",
        "Career Advancement",
        "Talent Acquisition & Freelancing",
        "Enterprise Consulting",
        "Professional Networking",
      ],
    },
    {
      title: "Company",
      links: ["About us", "Contact", "Jobs"],
    },
    {
      title: "Social",
      links: ["Privacy Policy", "Terms of Service", "Refund Policy", "Cookie Policy"],
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
                  <h3 className="text-base font-semibold leading-6">{section.title}</h3>
                  <ul className="mt-6 space-y-4">
                    {section.links.map((link) => (
                      <li key={link}>
                        <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter subscription */}
          <div className="md:col-span-1">
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-lg bg-white px-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5DA05D]"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-[#5DA05D] px-4 py-2 text-sm font-medium text-white hover:bg-[#5DA05D] transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Copyright section */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
          <p className="text-center text-sm text-gray-400">Copyright © 2025 Career-Nexus Ltd. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
