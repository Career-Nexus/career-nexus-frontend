import { X } from "lucide-react";

export default function IntroVideoModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[90%] max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold mb-2">How to Record Your Video Intro</h2>

        {/* Price */}
        <div className="space-y-2">
            <h3 className="font-semibold">Step 1: Prepare Your Setup</h3>
            <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">1</span> Find a quiet place with good lighting.</p>
            <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">2</span> Ensure your camera and microphone are working properly.</p>
        </div>
        <div className="space-y-2">
           <h3 className="font-semibold mt-3">Step 2: Start Recording</h3>
           <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">1</span> Click the "Start Recording" button.</p>
           <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">2</span> If prompted, allow access to your camera and microphone.</p>
        </div>

        <div className="space-y-2">
            <h3 className="font-semibold mt-3">Step 3: Record Your Introduction</h3>
            <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">1</span> Speak clearly and confidently.</p>
            <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">2</span> Keep your introduction concise (e.g., 30 seconds).</p>
        </div>

        <div className="space-y-2">
            <h3 className="font-semibold mt-3">Step 4: Review & Submit</h3>
            <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">1</span> After recording, preview your video.</p>
            <p><span className="border border-[#5DA05D] rounded-full px-2 text-[#5DA05D]">2</span> If satisfied, click "Submit" or "Save" to upload. If not, you can re-record.</p>
        </div>
      </div>
    </div>
  );
}