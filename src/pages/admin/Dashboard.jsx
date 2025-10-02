import React, { useState, useEffect } from "react";
import TicketModal from "../../components/dashboard/admin/TicketModal";
import {
  Bell,
  LogOut,
  LayoutDashboard,
  Trash2,
  Menu,
  X,
  Search
} from "lucide-react";
import { ActivityService } from "../../api/ActivityServices";
import {toast} from 'react-toastify'


export default function Dashboard() {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [disputeData, setDisputesData] = useState([]);

    const fetchDisputesData = async () => {
      try {
        const data = await ActivityService.AdminGetDispute();
        setDisputesData(data.results || []);
      } catch (error) {
        console.error("Error fetching disputes data:", error);
        toast.error("Error fetching disputes data");
      }
  }
  
  useEffect(() => {
    fetchDisputesData();
  }, [])
  
  const accountIssues = disputeData.filter(d => d.category === "account").length;
  const billingTickets = disputeData.filter(d => d.category === "billing").length;
  const featureRequests = disputeData.filter(d => d.category === "features").length;
  const technicalSupport = disputeData.filter(d => d.category === "technical").length;


  return (
    <div
      style={{ fontFamily: "Roboto, sans-serif" }}
      className="min-h-screen flex bg-gray-50"
    >
      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r flex flex-col justify-between transform transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div>
          {/* Logo */}
          <div className="p-6">
            <h1 className="text-xl font-bold">
              <span className="text-black">CAREER-</span>
              <span className="text-black">NEXUS</span>
              <span className="text-[#5DA05D]">.Com</span>
            </h1>
          </div>

          {/* Menu */}
          <nav className="mt-6">
            <button className="flex items-center gap-2 w-full px-6 py-3 text-sm font-medium text-green-700 bg-[#D9FFDB] rounded-r-full">
              <LayoutDashboard className="w-5 h-5" />
              DASHBOARD
            </button>
          </nav>
        </div>

        {/* Logout */}
        <div className="p-6">
          <button className="flex items-center gap-2 text-red-600 font-medium">
            <LogOut className="w-5 h-5" />
            LOGOUT
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:ml-0">
        {/* Top bar */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            {/* Drawer button only visible on mobile */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center gap-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 p-2 rounded-full bg-blue-600 text-white flex items-center justify-center font-semibold">
                AD
              </div>
              <span className="text-gray-700">Admin</span>
            </div>
            <button className="text-gray-600 hover:text-gray-900 bg-gray-200 p-2 rounded-full">
              <Bell className="w-6 h-6" />
            </button>
          </div>
        </div>

          <div className="mb-8">            
            <h2 className="text-2xl font-bold">SUPPORT DASHBOARD</h2>
          </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
            <div>
              <div>
                
              </div>
            </div>
            <p className="text-2xl font-bold">{accountIssues}</p>
            <p className="text-gray-600">Account Issues</p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold">{billingTickets}</p>
            <p className="text-gray-600">Billing Tickets</p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold">{featureRequests}</p>
            <p className="text-gray-600">Feature Requests</p>
          </div>
          <div className="rounded-lg border-2 border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold">{technicalSupport}</p>
            <p className="text-gray-600">Technical Support</p>
          </div>
        </div>

        {/* Recent Tickets */}
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-2xl">Recent Tickets</h3>
            <div className="flex items-center gap-3">
              <div className="bg-gray-100 flex items-center px-3 py-1 rounded">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="bg-transparent border-none outline-none focus:outline-none focus:ring-0 w-80 px-3 py-2 text-sm"
                />
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-2 text-[16px] rounded bg-[#5DA05D] text-white">
                  All
                </button>
                <button className="px-3 py-2 text-[16px] rounded bg-gray-100 text-gray-700">
                  New
                </button>
                <button className="px-3 py-2 text-[16px] rounded bg-gray-100 text-gray-700">
                  In progress
                </button>
              </div>
            </div>
          </div>

          <table className="w-full text-left text-sm">
            <thead className="text-gray-600 border-b">
              <tr>
                <th className="p-2">Ticket ID</th>
                <th className="p-2">Category</th>
                <th className="p-2">Subject</th>
                <th className="p-2">Priority</th>
                <th className="p-2">Status</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {disputeData.length > 0 ? (
                disputeData.map((ticket) => (
                  <tr
                    key={ticket.id}
                    className="border-b hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <td className="p-2 text-green-600 font-medium">{ticket.id}</td>
                    <td className="p-2 capitalize">{ticket.category}</td>
                    <td className="p-2 truncate max-w-[200px]">{ticket.message}</td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          ticket.priority === "urgent"
                            ? "bg-red-100 text-red-700"
                            : ticket.priority === "high"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {ticket.priority}
                      </span>
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          ticket.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : ticket.status === "resolved"
                            ? "bg-green-100 text-green-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                         {ticket.status === "in_progress"
                            ? "In Progress"
                            : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                    </td>
                    <td className="p-2">
                      <button className="text-red-500 hover:text-red-700">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No disputes found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>

      {/* Ticket Modal */}
      <TicketModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
}
