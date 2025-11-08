import React, { useState, useEffect, useContext } from "react";
import { CorporateServices } from "../../api/CoporateServices";
import AddOrgMembersModal from "./AddOrganisationMembersModal";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-toastify";
import { Trash2, LoaderCircle } from "lucide-react";

const OrganizationMembers = () => {
  const { user } = useContext(UserContext);
  const [accountMembers, setAccountMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addMemberModal, setAddMemberModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    if (user?.members) setAccountMembers(user.members);
  }, [user]);

  /* === Remove Member === */
  const handleRemoveMember = async (memberId) => {
    setDeletingId(memberId);
    try {
      const { success } = await CorporateServices.deleteOrgMember(memberId);
      if (success) {
        setAccountMembers((prev) => prev.filter((m) => m.member.id !== memberId));
        toast.success("Member removed.");
      } else {
        toast.error("Failed to remove member.");
      }
    } catch (err) {
      console.error("Remove member failed:", err);
      toast.error("Error removing member.");
    } finally {
      setDeletingId(null);
    }

  };

  /* === After Adding Member === */
  const handleMemberAdded = async (newMember) => {
    toast.success("Member added successfully!");
    setAddMemberModal(false);
    setAccountMembers((prev) => [...prev, { member: newMember }]);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold">Organization Members</h3>
        <button
          onClick={() => setAddMemberModal(true)}
          className="bg-[#5DA05D] text-white px-3 py-2 rounded-md text-sm hover:bg-[#4CAF50]"
        >
          + Add Member
        </button>
      </div>

      { accountMembers.length === 0 ? (
        <p className="text-center text-gray-500 py-4">No members yet.</p>
      ) : (
        <div className="space-y-3">
          {accountMembers.map(({ member }) => (
            <div
              key={member.id}
              className="flex justify-between items-center border p-3 rounded-md hover:shadow-sm transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.profile_photo || "/images/profile2.png"}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.qualification || "No qualification info"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveMember(member.id)}
                className="text-gray-500 hover:text-red-600 transition"
              >{deletingId === member.id ? (
                  <LoaderCircle className="w-4 h-4 animate-spin text-[#5DA05D]" />
                ) : (
                  <Trash2 className="inline-block w-4 h-4 mr-1" />
              )}
              </button>
            </div>
          ))}
        </div>
      )}

      {addMemberModal && (
        <AddOrgMembersModal
          isOpen={addMemberModal}
          onClose={() => setAddMemberModal(false)}
          onMemberAdded={handleMemberAdded}
        />
      )}
    </div>
  );
};

export default OrganizationMembers;
