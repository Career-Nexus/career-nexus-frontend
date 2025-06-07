"use client"

import { useState, useEffect } from "react";
import { authService } from "../../api/ApiServiceThree";

const TermsAndPrivacyModal = ({ isOpen, onClose, title, tos }) => {
  const [content, setContent] = useState("");
  const [updated, setUpdated] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch terms and conditions when the modal opens
  useEffect(() => {
    let isMounted = true;

    const fetchTermsAndConditions = async () => {
      if (isOpen && !content) {
        setLoading(true);
        setError("");
        try {
          const response = await authService.getTermsAndConditions(tos);
          console.log("Response:", response);
          if (response.status === "Success") {
            if (isMounted) {
              setContent(response.content.content || "No content available.");
              setUpdated(response.content.updated || "No update available.");
            }
          } else {
            throw new Error("Unexpected response status");
          }
        } catch (err) {
          if (isMounted) {
            setError("Failed to load terms and conditions. Please try again.");
            setContent("");
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchTermsAndConditions();

    // Cleanup to prevent state updates on unmounted component
    return () => {
      isMounted = false;
    };
  }, [isOpen, content, tos]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6 relative">
        {/* Header */}
        <div className="text-[#3a1c64] px-4 pt-4">
          <h2 className="text-lg font-extrabold">{title}</h2>
        </div>
        <p className="px-4"><strong>Last updated:</strong> {new Date(updated || "2025-05-29").toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })}</p>
        {/* Body */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {loading && <p className="text-center text-gray-600">Loading...</p>}
          {error && (
            <p className="text-center text-red-500">{error}</p>
          )}
          {!loading && !error && content && (
            <div className="text-gray-700 space-y-2">
              
              <p>{content}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 flex justify-end">
          <button
            onClick={onClose}
            className="bg-[#5b9a68] hover:bg-[#4e8559] text-white font-medium py-2 px-4 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsAndPrivacyModal;