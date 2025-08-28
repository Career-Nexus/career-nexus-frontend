import { CheckCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function PaymentSuccess({onClose}) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center animate-fade-in">
          {/* Success Icon */}
          <div className="flex justify-center mb-4">
            <CheckCircle className="w-16 h-16 text-[#5DA05D]" />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Successful!
          </h2>
          <p className="text-gray-600 mb-6">
            Your payment has been processed successfully.
            Thank you for your purchase 🎉
          </p>

          {/* Transaction Details */}
          {/* <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left shadow-sm">
            <p className="flex justify-between text-gray-700">
              <span>Transaction ID:</span>
              <span className="font-medium">#TXN123456</span>
            </p>
            <p className="flex justify-between text-gray-700 mt-2">
              <span>Amount Paid:</span>
              <span className="font-medium">$150.00</span>
            </p>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              to="/"
              onClick={onClose}
              className="w-full bg-[#5DA05D] hover:bg-[#5DA05D] text-white py-3 rounded-xl font-medium transition"
            >
              Continue
            </Link>
            {/* <Link
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Download Receipt
            </button> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSuccess