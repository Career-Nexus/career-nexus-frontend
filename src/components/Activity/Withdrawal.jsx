"use client"

import { Button } from "@chakra-ui/react"
import { X } from "lucide-react"
import React from "react"

import { useState } from "react"

export function WithdrawFundsModal({ isOpen, onClose }) {
  console.log("[v0] WithdrawFundsModal render - isOpen:", isOpen)
  const [amount, setAmount] = useState("125.00")
  const [withdrawalMethod, setWithdrawalMethod] = useState("Bank Transfer")
  const [bankName, setBankName] = useState("GTBank")
  const [accountNumber, setAccountNumber] = useState("01234567891")
  const [accountHolder, setAccountHolder] = useState("Sarah Johnson")

  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle withdrawal request
    console.log("Withdrawal requested:", { amount, withdrawalMethod, bankName, accountNumber, accountHolder })
    onClose()
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 mt-20"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-2 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Withdraw Funds</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X/>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-6 py-2">
          {/* Withdrawal Amount */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 md:mb-2">Withdrawal Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent"
                placeholder="0.00"
              />
            </div>
            <p className="text-xs md:text-sm text-gray-500 mt-1">Available balance: $125.00</p>
          </div>

          {/* Withdrawal Method */}
          <div>
            <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">Withdrawal Method</label>
            <div className="relative">
              <select
                value={withdrawalMethod}
                onChange={(e) => setWithdrawalMethod(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent appearance-none bg-white"
              >
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="PayPal">PayPal</option>
                <option value="Crypto">Cryptocurrency</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Account Details */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs md:text-sm font-medium text-gray-700">Account Details</label>
              <span className="text-xs text-gray-500">Account details must match the profile</span>
            </div>

            <div className="space-y-1 md:space-y-3">
              <input
                type="text"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent"
                placeholder="Bank Name"
              />

              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent"
                placeholder="Account Number"
              />

              <input
                type="text"
                value={accountHolder}
                onChange={(e) => setAccountHolder(e.target.value)}
                className="w-full px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DA05D] focus:border-transparent"
                placeholder="Account Holder Name"
              />
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-xs md:text-sm text-[#5DA05D] text-center">
            No Additional Fees • Processed Every Friday • 1-2 Business Days
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="bg-[#5DA05D] hover:bg-[#5DA05D] text-white px-6 py-1 md:py-2">
              Request Withdrawal
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
