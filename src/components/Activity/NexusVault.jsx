
import { Button, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { TransactionHistoryModal } from "./TransactionHistory";
import { WithdrawFundsModal } from "./Withdrawal";
import { Clock, TrendingUp } from "lucide-react";
import { ActivityService } from "../../api/ActivityServices";

// export default function NexusVault() {
//     const [isModalOpen, setIsModalOpen] = useState(false)
//     const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false)
//     const [vaultData, setVaultData] = useState(null);

//     const fetchVaultTransactions = async () => {
//         const response = await ActivityService.GetVaultData()
//         if (response.success) {
//             setVaultData(response.data)
//         } else {
//             console.log("Failed to fetch vault transactions")
//         }
//     }
//     useEffect(() => {
//         fetchVaultTransactions()
//     }, []);
//     console.log("Vault data:", vaultData)
//     return (
//         <div className="space-y-6">
//             {/* Header */}
//             <h1 className="text-3xl font-bold text-gray-900">Nexus Vault</h1>

//             {/* Wallet Balance Card */}
//             <div className="relative overflow-hidden rounded-lg shadow-sm z-10">
//                 {/* Background image */}
//                 <img
//                     src="/images/vault.png"
//                     alt="vault banner"
//                     className="w-full h-40 object-cover"
//                 />

//                 {/* Overlay content */}
//                 <div className="absolute inset-0 md:flex justify-between items-center md:p-6 p-2">
//                     <div className="mb-2">
//                         <p className="text-white md:text-lg font-medium mb-1">Wallet Balance</p>
//                         {/* <p className="text-2xl md:text-5xl font-bold mb-2 md:mb-5 text-white">$125.00</p> */}
//                         <p className="text-2xl md:text-5xl font-bold mb-2 md:mb-5 text-white">
//                             {vaultData ? `$${vaultData.amount.amount.toFixed(2)}` : "$0.00"}
//                         </p>

//                         <p className="text-white md:text-lg">Minimum withdrawal: $20</p>
//                     </div>
//                     <Button
//                         variant="secondary"
//                         className="bg-white text-[#5DA05D] hover:bg-gray-50 font-medium"
//                         onClick={() => {
//                             console.log("[v0] Withdraw button clicked")
//                             setIsWithdrawModalOpen(true)
//                         }}
//                     >
//                         Withdraw Funds
//                     </Button>
//                 </div>

//                 {/* Withdraw modal */}
//                 <WithdrawFundsModal
//                     isOpen={isWithdrawModalOpen}
//                     onClose={() => {
//                         console.log("[v0] Closing withdraw modal")
//                         setIsWithdrawModalOpen(false)
//                     }}
//                 />
//             </div>


//             {/* Stats Cards */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <Card className="p-6">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <p className="text-2xl font-bold text-gray-900">$250.00</p>
//                             <p className="text-gray-400 text-sm">Earnings This Month</p>
//                         </div>
//                         <div className="text-[#5DA05D] shadow p-1 rounded-lg">
//                             <TrendingUp />
//                         </div>
//                     </div>
//                 </Card>

//                 <Card className="p-6">
//                     <div className="flex justify-between items-start">
//                         <div>
//                             <p className="text-2xl font-bold text-gray-900">$35.00</p>
//                             <p className="text-gray-400 text-sm">Pending Payouts</p>
//                         </div>
//                         <div className="text-[#FFCA28] shadow p-1 rounded-lg">
//                             <Clock />
//                         </div>
//                     </div>
//                 </Card>
//             </div>

//             {/* Transaction History */}
//             <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                     <h2 className="text-xl font-semibold text-gray-900">Transaction History</h2>
//                     {/* <button className="text-green-600 text-sm font-medium hover:text-green-700">See more</button> */}
//                     <button
//                         onClick={() => setIsModalOpen(true)}
//                         className="text-[#5DA05D] text-sm font-medium hover:text-[#5DA05D]"
//                     >
//                         See more
//                     </button>
//                 </div>
//                 <TransactionHistoryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

//                 {/* <div className="">
//                     <div className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg">
//                         <div className="flex items-center space-x-3">
//                             <div>
//                                 <p className="font-medium text-gray-900">Session with John Doe</p>
//                                 <p className="text-sm text-gray-400">Aug 12</p>
//                             </div>
//                         </div>
//                         <p className="font-semibold text-[#5DA05D]">+ $45.00</p>
//                     </div>


//                     <div className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg">
//                         <div className="flex items-center space-x-3">
//                             <div>
//                                 <p className="font-medium text-gray-900">Weekly Payout - GTBank</p>
//                                 <p className="text-sm text-gray-400">Aug 10</p>
//                             </div>
//                         </div>
//                         <p className="font-semibold text-[#FF383C]">- $75.00</p>
//                     </div>

//                     <div className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg">
//                         <div className="flex items-center space-x-3">
//                             <div>
//                                 <p className="font-medium text-gray-900">Session with Sarah O.</p>
//                                 <p className="text-sm text-gray-400">Aug 8</p>
//                             </div>
//                         </div>
//                         <div className="text-right">
//                             <p className="font-semibold text-[#FFCA28]">+ $45.00</p>
//                             <p className="text-xs text-gray-400">Pending Completion</p>
//                         </div>
//                     </div>
//                 </div> */}
//                 <div className="">
//                     {vaultData && vaultData.recent_transaction_history.length > 0 ? (
//                         vaultData.recent_transaction_history.map((tx, index) => (
//                             <div
//                                 key={index}
//                                 className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg"
//                             >
//                                 <div className="flex items-center space-x-3">
//                                     <div>
//                                         <p className="font-medium text-gray-900">{tx.title}</p>
//                                         <p className="text-sm text-gray-400">
//                                             {new Date(tx.date).toLocaleDateString()}
//                                         </p>
//                                     </div>
//                                 </div>
//                                 <p
//                                     className={`font-semibold ${tx.amount < 0
//                                             ? "text-[#FF383C]"
//                                             : tx.status === "pending"
//                                                 ? "text-[#FFCA28]"
//                                                 : "text-[#5DA05D]"
//                                         }`}
//                                 >
//                                     {tx.amount < 0 ? `- $${Math.abs(tx.amount)}` : `+ $${tx.amount}`}
//                                 </p>
//                             </div>
//                         ))
//                     ) : (
//                         <p className="text-gray-500">No transactions yet</p>
//                     )}
//                 </div>

//             </div>
//         </div>
//     )
// }

export default function NexusVault() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
    const [vaultData, setVaultData] = useState(null);

    const fetchVaultData = async () => {
        const response = await ActivityService.GetVaultData();
        if (response.success) {
            setVaultData(response.data);
        }
    };

    useEffect(() => {
        fetchVaultData();
    }, []);

    console.log("Vault data:", vaultData);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-900">Nexus Vault</h1>

            {/* Wallet Balance */}
            <div className="relative overflow-hidden rounded-lg shadow-sm z-10">
                <img
                    src="/images/vault.png"
                    alt="vault banner"
                    className="w-full h-40 object-cover"
                />
                <div className="absolute inset-0 md:flex justify-between items-center md:p-6 p-2">
                    <div className="mb-2">
                        <p className="text-white md:text-lg font-medium mb-1">
                            Wallet Balance
                        </p>
                        <p className="text-2xl md:text-5xl font-bold mb-2 md:mb-5 text-white">
                            {vaultData
                                ? `${vaultData.amount.currency} ${vaultData.amount.amount.toFixed(
                                    2
                                )}`
                                : "NGN 0.00"}
                        </p>
                        <p className="text-white md:text-lg">Minimum withdrawal: NGN 20</p>
                    </div>
                    <Button
                        variant="secondary"
                        className="bg-white text-[#5DA05D] hover:bg-gray-50 font-medium"
                        onClick={() => setIsWithdrawModalOpen(true)}
                    >
                        Withdraw Funds
                    </Button>
                </div>

                <WithdrawFundsModal
                    isOpen={isWithdrawModalOpen}
                    onClose={() => setIsWithdrawModalOpen(false)}
                />
            </div>

            {/* Stats (optional placeholders for now) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">—</p>
                            <p className="text-gray-400 text-sm">Earnings This Month</p>
                        </div>
                        <div className="text-[#5DA05D] shadow p-1 rounded-lg">
                            <TrendingUp />
                        </div>
                    </div>
                </Card>

                <Card className="p-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-2xl font-bold text-gray-900">—</p>
                            <p className="text-gray-400 text-sm">Pending Payouts</p>
                        </div>
                        <div className="text-[#FFCA28] shadow p-1 rounded-lg">
                            <Clock />
                        </div>
                    </div>
                </Card>
            </div>

            {/* Transaction History */}
            <div className="space-y-4">
                {/* <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            Transaction History
          </h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-[#5DA05D] text-sm font-medium hover:text-[#5DA05D]"
          >
            See more
          </button>
        </div> */}
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold text-gray-900">
                        Transaction History
                    </h2>
                    {vaultData?.recent_transaction_history?.length > 10 && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="text-[#5DA05D] text-sm font-medium hover:text-[#5DA05D]"
                        >
                            See more
                        </button>
                    )}
                </div>

                <TransactionHistoryModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />

                <div>
                    {vaultData && vaultData.recent_transaction_history.length > 0 ? (
                        vaultData.recent_transaction_history.map((tx) => (
                            <div
                                key={tx.id}
                                className="p-4 flex items-center justify-between border border-gray-200 mb-2 shadow rounded-lg"
                            >
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {tx.action === "EARN" ? "Earning" : "Withdrawal"}
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {new Date(tx.timestamp).toLocaleDateString()}
                                    </p>
                                </div>
                                <p
                                    className={`font-semibold ${tx.action === "WITHDRAW"
                                            ? "text-[#FF383C]"
                                            : "text-[#5DA05D]"
                                        }`}
                                >
                                    {tx.action === "WITHDRAW" ? "-" : "+"}{" "}
                                    {tx.amount.currency} {tx.amount.value}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No transactions yet</p>
                    )}
                </div>
            </div>
        </div>
    );
}
