// import { Button } from "@/components/ui/button"
// import { Card } from "@/components/ui/card"

import { Button, Card } from "@chakra-ui/react";
import { useState } from "react";
import { TransactionHistoryModal } from "./TransactionHistory";
import { WithdrawFundsModal } from "./Withdrawal";
import { Clock, TrendingUp } from "lucide-react";

export default function NexusVault() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
    return (
        <div className="space-y-6">
            {/* Header */}
            <h1 className="text-3xl font-bold text-gray-900">Nexus Vault</h1>

            {/* Wallet Balance Card */}
            <div className="relative overflow-hidden rounded-lg shadow-sm z-10">
                {/* Background image */}
                <img
                    src="/images/vault.png"
                    alt="vault banner"
                    className="w-full h-40 object-cover"
                />

                {/* Overlay content */}
                <div className="absolute inset-0 md:flex justify-between items-center md:p-6 p-2">
                    <div className="mb-2">
                        <p className="text-white md:text-lg font-medium mb-1">Wallet Balance</p>
                        <p className="text-2xl md:text-5xl font-bold mb-2 md:mb-5 text-white">$125.00</p>
                        <p className="text-white md:text-lg">Minimum withdrawal: $20</p>
                    </div>
                    <Button
                        variant="secondary"
                        className="bg-white text-[#5DA05D] hover:bg-gray-50 font-medium"
                        onClick={() => {
                            console.log("[v0] Withdraw button clicked")
                            setIsWithdrawModalOpen(true)
                        }}
                    >
                        Withdraw Funds
                    </Button>
                </div>

                {/* Withdraw modal */}
                <WithdrawFundsModal
                    isOpen={isWithdrawModalOpen}
                    onClose={() => {
                        console.log("[v0] Closing withdraw modal")
                        setIsWithdrawModalOpen(false)
                    }}
                />
            </div>


            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">$250.00</p>
                            <p className="text-gray-400 text-sm">Earnings This Month</p>
                        </div>
                        <div className="text-[#5DA05D] shadow p-1 rounded-lg">
                            <TrendingUp/>
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">$35.00</p>
                            <p className="text-gray-400 text-sm">Pending Payouts</p>
                        </div>
                        <div className="text-[#FFCA28] shadow p-1 rounded-lg">
                            <Clock/>
                        </div>
                    </div>
                </Card>
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
                    {/* <button className="text-green-600 text-sm font-medium hover:text-green-700">See more</button> */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="text-[#5DA05D] text-sm font-medium hover:text-[#5DA05D]"
                    >
                        See more
                    </button>
                </div>
                <TransactionHistoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

                <div className="">
                    {/* Transaction 1 */}
                    <div className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="font-medium text-gray-900">Session with John Doe</p>
                                <p className="text-sm text-gray-400">Aug 12</p>
                            </div>
                        </div>
                        <p className="font-semibold text-[#5DA05D]">+ $45.00</p>
                    </div>

                    {/* Transaction 2 */}
                    <div className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="font-medium text-gray-900">Weekly Payout - GTBank</p>
                                <p className="text-sm text-gray-400">Aug 10</p>
                            </div>
                        </div>
                        <p className="font-semibold text-[#FF383C]">- $75.00</p>
                    </div>

                    {/* Transaction 3 */}
                    <div className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg">
                        <div className="flex items-center space-x-3">
                            <div>
                                <p className="font-medium text-gray-900">Session with Sarah O.</p>
                                <p className="text-sm text-gray-400">Aug 8</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-[#FFCA28]">+ $45.00</p>
                            <p className="text-xs text-gray-400">Pending Completion</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}