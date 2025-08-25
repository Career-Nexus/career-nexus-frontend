import { ChevronDown, Search } from "lucide-react";
import { useState } from "react";

export default function SubmitTicket() {
    const [billing, setBilling] = useState("");
    const [category, setCategory] = useState("");
    const [priority, setPriority] = useState("");
    const [message, setMessage] = useState("");
    

    return (
        <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Help Center</h1>
            {/* Search Bar */}
            <div className="flex items-center mb-6">
                <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden">
                    <div className="flex items-center pl-3 text-gray-500">
                        {/* Search Icon */}
                        <Search />
                    </div>
                    <input
                        type="text"
                        placeholder="Search for help, FAQs..."
                        className="w-full px-2 py-2 outline-none focus:ring-0 border-0"
                    />
                </div>
                <div className="relative ml-3">
                    <select
                        value={billing}
                        onChange={(e) => setBilling(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-2 appearance-none pr-8 outline-none 
                         focus:border-gray-200 focus:ring-1 focus:ring-gray-200"
                    >
                        <option value="">All</option>
                        <option value="billing">Billing</option>
                        <option value="account">Account</option>
                        <option value="technical">Technical</option>
                    </select>
                    {/* Dropdown Icon */}
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-200">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
                <button className="mx-3 bg-[#5DA05D] text-white px-4 py-2 rounded-lg">
                    Search
                </button>
            </div>

            {/* Form */}
            <h2 className="text-xl font-semibold mb-4">Submit A Ticket</h2>

            {/* Category */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Category</label>
                <div className="relative">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none pr-8 outline-none 
                         focus:border-gray-200 focus:ring-1 focus:ring-gray-200"
                    >
                        <option value="">Select Category</option>
                        <option value="billing">Billing and payments</option>
                        <option value="account">Account issues</option>
                        <option value="technical">Technical support</option>
                        <option value="features">Features request</option>
                        <option value="others">Others</option>
                    </select>
                    {/* Dropdown Icon */}
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-200">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Priority */}
            <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Priority</label>
                <div className="relative">
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 appearance-none pr-8 focus:border-gray-200 focus:ring-1 focus:ring-gray-200"
                    >
                        <option value="">Priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                    </select>
                    {/* Dropdown Icon */}
                    <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none text-gray-200">
                        <ChevronDown className="w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Message */}
            <div className="mb-6 relative">
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Please provide detailed information about your issue..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 h-28 focus:border-gray-200 focus:ring-1 focus:ring-gray-200 resize-none outline-none"
                ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
                <button className="bg-[#5DA05D] text-white p-3 rounded-lg font-medium hover:bg-[#4CAF50] transition">
                    Submit Ticket
                </button>
            </div>
        </div>
    );
}