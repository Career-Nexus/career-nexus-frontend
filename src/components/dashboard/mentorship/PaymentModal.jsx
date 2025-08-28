import { CalendarDays, Clock, X } from 'lucide-react';
import React, { useState } from 'react'

const paymentData = [
  {
    user: {
      name: "Sarah Johnson",
      role: "Senior Product Manager",
      avatar: "/images/avatar.png",
    },
    session: {
      date: "August 16, 2025",
      time: "2:00 PM - 3:00 PM",
      duration: "1 hour",
      fee: 8.0,
    },
    fees: [
      { label: "Platform fee", amount: 0.8 },
      { label: "Payment processing", amount: 0.25 },
    ],
  },
];

function PaymentModal({ isOpen, onClose, onPayment }) {
  const [method, setMethod] = useState("paystack");

  const { user, session, fees } = paymentData[0];
  const total = session.fee + fees.reduce((acc, item) => acc + item.amount, 0);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose} // clicking backdrop closes
    >
      <div
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold mb-3">Review & Pay</h2>

        {/* User Info */}
        <div className="flex items-center gap-3 mb-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-10 h-10 rounded-full"
          />
          <div>
            <h3 className="font-semibold">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.role}</p>
          </div>
        </div>

        {/* Date & Time */}
        <div className='flex items-center justify-between'>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <CalendarDays className="w-5 h-5" />
            <span>{session.date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 mb-6">
            <Clock className="w-5 h-5" />
            <span>{session.time}</span>
          </div>
        </div>

        {/* Pricing Breakdown */}
        <h3 className="font-semibold mb-2">Pricing Breakdown</h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>Session ({session.duration})</span>
            <span className="font-medium">${session.fee.toFixed(2)}</span>
          </div>
          {fees.map((fee, index) => (
            <div key={index} className="flex justify-between">
              <span>{fee.label}</span>
              <span className="font-medium">${fee.amount.toFixed(2)}</span>
            </div>
          ))}
        </div>
        <hr className="my-3" />
        <div className="flex justify-between font-bold text-[#5DA05D]">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Payment Method */}
        <h3 className="font-semibold mt-4 mb-2">Payment Method</h3>
        <div className="space-y-3">
          {/* Paystack */}
          <label className="flex items-center border gap-3 cursor-pointer rounded-lg p-2 hover:bg-gray-50">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <rect x="4" y="4" width="16" height="16" rx="3" />
            </svg>
            <div className='flex gap-1 items-center'>
              <p className="font-medium">Stripe</p>
              <p className="text-xs text-gray-500">(outside Africa)</p>
            </div>
            <input
              type="radio"
              name="payment"
              value="paystack"
              checked={method === "paystack"}
              onChange={() => setMethod("paystack")}
              className="accent-[#5DA05D] text-[#5DA05D] focus:ring-0 focus:outline-none ml-auto"
            />
          </label>

          {/* Flutterwave */}
          <label className="flex items-center gap-3 cursor-pointer border rounded-lg p-2 hover:bg-gray-50">

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-purple-500"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <circle cx="12" cy="12" r="10" />
            </svg>
            <div className='flex gap-1 items-center'>
              <p className="font-medium">Flutterwave</p>
              <p className="text-xs text-gray-500">(within Africa)</p>
            </div>
            <input
              type="radio"
              name="payment"
              value="flutterwave"
              checked={method === "flutterwave"}
              onChange={() => setMethod("flutterwave")}
              className="accent-[#5DA05D] text-[#5DA05D] focus:ring-0 focus:outline-none ml-auto"
            />
          </label>
        </div>

        {/* Book Button */}
        <button
          onClick={() => onPayment(method)}
          className="w-full mt-6 bg-[#5DA05D] text-white font-medium py-2 rounded-lg hover:bg-[#4CAF50] transition"
        >
          Book & Pay ${total.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
export default PaymentModal

