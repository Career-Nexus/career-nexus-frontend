import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Loader2 as LoaderIcon, CheckCircle } from "lucide-react";
import { MentorServices } from "../../api/MentorServices";
import { CorporateServices } from "../../api/CoporateServices";
import { toast } from "react-toastify";

const AddOrgMembersModal = ({ isOpen, onClose, onMemberAdded }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* === SEARCH USERS === */
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    const delay = setTimeout(() => searchUsers(), 400);
    return () => clearTimeout(delay);
  }, [searchQuery]);

  const searchUsers = async () => {
    try {
      setLoading(true);
      const { success, data } = await MentorServices.searchuser({
        keyword: searchQuery.trim(),
      });
      setSearchResults(success ? data : []);
    } catch (error) {
      console.error("Search failed", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  console.log(searchResults)
  /* === ADD USER === */
  const handleSubmit = async () => {
    if (!selectedUser) {
      toast.warning("Select a user first.");
      return;
    }
    try {
      setSubmitting(true);
      const { success } = await CorporateServices.addOrgMembers([selectedUser]);
      if (success) {
        onMemberAdded(selectedUser);
        onClose();
        setSearchResults([]);
        setSearchQuery("");
        setSelectedUser(null);
      } else {
        toast.error("Failed to add member.");
      }
    } catch (err) {
      console.error("Error adding member:", err);
      toast.error("Error adding member.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 p-5 relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="text-xl font-semibold mb-4 text-center">
              Add Organization Member
            </h2>

            {/* Search Bar */}
            <div className="flex items-center bg-[#FAFAFA] border border-gray-300 rounded-full px-3 py-2">
              <Search className="h-4 w-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search by name or skill..."
                className="flex-grow bg-[#FAFAFA] border-none focus:outline-none text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {loading && <LoaderIcon className="animate-spin w-4 h-4 text-gray-500" />}
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="mt-3 max-h-48 overflow-y-auto border rounded-md border-gray-100">
                {searchResults.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => setSelectedUser(u)}
                    className={`flex items-center gap-3 px-3 py-2 cursor-pointer ${
                      selectedUser?.id === u.id
                        ? "bg-green-50 border-l-4 border-green-600"
                        : "hover:bg-gray-100"
                    } transition`}
                  >
                    <img
                      src={u.profile_photo}
                      alt={u.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{u.name}</p>
                      <p className="text-xs text-gray-500">{u.qualification}</p>
                    </div>
                    {selectedUser?.id === u.id && (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Submit */}
            <div className="mt-5 flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={!selectedUser || submitting}
                className="bg-[#5DA05D] text-white text-sm px-4 py-2 rounded-full hover:bg-[#4CAF50] transition disabled:opacity-50"
              >
                {submitting ? "Adding..." : "Add Member"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddOrgMembersModal;
