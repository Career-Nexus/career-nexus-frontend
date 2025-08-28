import { XCircle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

function PaymentFailure({ onRetry, onClose }) {
  return (
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center animate-fade-in">
          {/* Error Icon */}
          <div className="flex justify-center mb-4">
            <XCircle className="w-16 h-16 text-red-500" />
          </div>

          {/* Error Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Payment Failed
          </h2>
          <p className="text-gray-600 mb-6">
            Oops! Something went wrong while processing your payment.
            Please try again or use a different payment method.
          </p>

          {/* Transaction Details */}
          {/* <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left shadow-sm">
            <p className="flex justify-between text-gray-700">
              <span>Transaction ID:</span>
              <span className="font-medium">#TXN789012</span>
            </p>
            <p className="flex justify-between text-gray-700 mt-2">
              <span>Amount Attempted:</span>
              <span className="font-medium">$150.00</span>
            </p>
          </div> */}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              to="/booked"
              onClick={onRetry}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition"
            >
              Try Again
            </Link>
            <Link
              to="/"
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-100 transition"
            >
              Cancel
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentFailure