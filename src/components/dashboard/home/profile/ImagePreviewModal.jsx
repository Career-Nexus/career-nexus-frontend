import { X } from "lucide-react";

export function CoverPhotoPreviewModal({ open, onClose, image }) {
  if (!open) return null;
  const Clickoutside = (e) => {
        if (e.target === e.currentTarget) onClose();
    }
  return (
    <div onClick={Clickoutside} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-[95%]">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
          onClick={onClose}
        >
          <X className="text-white w-5 h-5" />
        </button>

        {/* Image */}
        <img
          src={image}
          alt="Preview"
          className="w-full max-h-[90vh] h-full object-contain rounded-lg"
        />
      </div>
    </div>
  );
}
export function ProfilePhotoPreviewModal({ open, onClose, image }) {
  if (!open) return null;
  const Clickoutside = (e) => {
        if (e.target === e.currentTarget) onClose();
    }
  return (
    <div onClick={Clickoutside} className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="relative max-w-4xl w-[95%]">
        {/* Close Button */}
        <button
          className="absolute top-3 left-44 bg-black/60 p-2 rounded-full"
          onClick={onClose}
        >
          <X className="text-white w-5 h-5" />
        </button>

        {/* Image */}
        <img
          src={image}
          alt="Preview"
          className="w-96 h-96 rounded-full"
        />
      </div>
    </div>
  );
}