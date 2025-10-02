import React, { useState } from "react";
import { X, Star } from "lucide-react";

function RatingModal({ isOpen, onClose, onSubmit, session }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit({
      sessionId: session?.id,
      rating,
      feedback,
    });
    setRating(0);
    setFeedback("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Rate Your Session</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Body */}
        <div className="flex flex-col gap-4">
          {/* Stars */}
          <div className="flex justify-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className="p-1"
              >
                <Star
                  className={`w-8 h-8 ${
                    (hover || rating) >= star
                      ? "fill-yellow-400 text-gray-100"
                      : "text-gray-300"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Feedback */}
          <textarea
            placeholder="Leave a short feedback (optional)..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#5DA05D]"
            rows={3}
          />
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm border border-gray-300 text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={rating === 0}
            className={`px-4 py-2 rounded-lg text-sm ${
              rating === 0
                ? "bg-gray-200 text-black cursor-not-allowed"
                : "bg-[#5DA05D] hover:bg-[#5DA05D] text-white"
            }`}
          >
            Submit Rating
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingModal;
