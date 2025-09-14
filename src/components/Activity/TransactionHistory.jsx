"use client"

import { X } from "lucide-react"

export function TransactionHistoryModal({ isOpen, onClose }) {
  if (!isOpen) return null

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const transactions = [
    { id: 1, type: "session", name: "Session with John Doe", date: "Aug 12", amount: 45.0, status: "completed" },
    { id: 2, type: "session", name: "Session with John Doe", date: "Aug 12", amount: 45.0, status: "completed" },
    { id: 3, type: "session", name: "Session with John Doe", date: "Aug 12", amount: 45.0, status: "completed" },
    { id: 4, type: "payout", name: "Weekly Payout - GTBank", date: "Aug 11", amount: -75.0, status: "completed" },
    { id: 5, type: "payout", name: "Weekly Payout - GTBank", date: "Aug 10", amount: -75.0, status: "completed" },
    { id: 6, type: "session", name: "Session with John Doe", date: "Aug 9", amount: 45.0, status: "completed" },
    { id: 7, type: "session", name: "Session with John Doe", date: "Aug 8", amount: 45.0, status: "completed" },
    { id: 8, type: "payout", name: "Weekly Payout - GTBank", date: "Aug 7", amount: -75.0, status: "completed" },
    { id: 9, type: "payout", name: "Weekly Payout - GTBank", date: "Aug 6", amount: -75.0, status: "completed" },
    { id: 10, type: "payout", name: "Weekly Payout - GTBank", date: "Aug 5", amount: -75.0, status: "completed" },
    { id: 11, type: "session", name: "Session with Sarah O.", date: "Aug 4", amount: 45.0, status: "pending" },
  ]

  return (
    <div onClick={handleBackdropClick} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X/>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#D4FFD452] rounded-lg p-4 text-center">
            <p className="text-sm text-[#5DA05D] font-medium mb-1">Total Net Earned</p>
            <p className="text-2xl font-bold">$117.00</p>
            <p className="text-xs text-gray-400 mt-1">After platform commission</p>
          </div>
          <div className="bg-[#984CE32B] rounded-lg p-4 text-center">
            <p className="text-sm text-[#2A0D47] font-medium mb-1">Total Withdrawn</p>
            <p className="text-2xl font-bold">$115.00</p>
            <p className="text-xs text-gray-400 mt-1">Including processing fees</p>
          </div>
        </div>

        {/* Transaction List */}
        <div className="px-6 pb-6">
          <div className="max-h-96 overflow-y-auto">
            <div className="space-y-1">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{transaction.name}</p>
                      <p className="text-xs text-gray-400">{transaction.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-semibold text-sm ${transaction.amount > 0 ? "text-[#5DA05D]" : "text-red-600"}`}
                    >
                      {transaction.amount > 0 ? "+" : ""} ${Math.abs(transaction.amount).toFixed(2)}
                    </p>
                    {transaction.status === "pending" && <p className="text-xs text-gray-400">Pending Completion</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
