import { Camera, X } from "lucide-react";
import { useEffect, useState } from "react";

export function CoverPhotoPreviewModal({ open, onClose, image }) {
  if (!open) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in duration-300"
    >
      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="fixed top-28 right-4 md:top-10 md:right-36 z-50 bg-white/20 backdrop-blur-md hover:bg-white/40 p-3 rounded-full transition-all duration-200 shadow-lg"
        aria-label="Close"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Image Container */}
      <div className="relative max-w-6xl w-[95vw] max-h-[95vh]">
        <div className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10">
          <img
            src={image}
            alt="Cover preview"
            className="w-full h-full max-h-[90vh] object-contain bg-gray-900"
            style={{ imageRendering: "-webkit-optimize-contrast" }}
          />
        </div>

        {/* Optional: Subtle zoom hint */}
        <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-medium tracking-wider">
          Click outside to close
        </p>
      </div>
    </div>
  );
}

export function ProfilePhotoPreviewModal({ open, onClose, image }) {
  if (!open) return null;

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 animate-in fade-in duration-300 p-4"
    >
      {/* Close Button - Top Right */}
      <button
        onClick={onClose}
        className="fixed top-6 right-6 z-50 bg-white/20 backdrop-blur-md hover:bg-white/40 p-4 rounded-full transition-all duration-300 shadow-2xl"
        aria-label="Close"
      >
        <X className="w-7 h-7 text-white" />
      </button>

      {/* Profile Image with Elegant Frame */}
      <div className="relative">
        {/* Outer Glow Ring */}
        <div className="absolute inset-0 rounded-full bg-white/20 blur-3xl scale-110 -z-10 animate-pulse"></div>
        
        {/* Main Image Container */}
        <div className="rounded-full overflow-hidden shadow-2xl ring-8 ring-white/30 p-2 bg-gradient-to-br from-white/10 to-transparent">
          <div className="rounded-full overflow-hidden ring-8 ring-black/50">
            <img
              src={image}
              alt="Profile preview"
              className="w-80 h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] object-cover rounded-full transition-transform duration-500 hover:scale-105"
            />
          </div>
        </div>

        {/* Zoom Hint */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium">
          Click outside to close
        </div>
      </div>
    </div>
  );
}
export function CoverPhotoUserModal({ open, onClose, image, onUpload }) {
  const [localPreview, setLocalPreview] = useState("");

  // Sync preview when modal opens or image prop changes
  useEffect(() => {
    if (open && image) {
      setLocalPreview(image);
    }
  }, [open, image]);

  // Cleanup object URL when component unmounts or file changes
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  if (!open) return null;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Revoke previous blob URL to prevent memory leaks
    if (localPreview && localPreview.startsWith("blob:")) {
      URL.revokeObjectURL(localPreview);
    }

    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    onUpload(file);
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
    >
      <div className="relative max-w-5xl w-full">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 md:top-4 md:right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Upload Button */}
        <label
          htmlFor="coverUploadModal"
          className="absolute top-4 left-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full cursor-pointer transition z-10"
        >
          <Camera className="w-6 h-6 text-white" />
        </label>

        <input
          id="coverUploadModal"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Image Preview */}
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl">
          <img
            src={localPreview || "/placeholder-cover.jpg"}
            alt="Cover preview"
            className="w-full max-h-[85vh] object-contain"
            onError={() => setLocalPreview("/placeholder-cover.jpg")} // fallback
          />
        </div>
      </div>
    </div>
  );
}

export function ProfilePhotoUserModal({ open, onClose, image, onUpload }) {
  const [localPreview, setLocalPreview] = useState("");

  // Keep preview in sync with prop
  useEffect(() => {
    if (open && image) {
      setLocalPreview(image);
    }
  }, [open, image]);

  // Cleanup blob URLs
  useEffect(() => {
    return () => {
      if (localPreview && localPreview.startsWith("blob:")) {
        URL.revokeObjectURL(localPreview);
      }
    };
  }, [localPreview]);

  if (!open) return null;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (localPreview && localPreview.startsWith("blob:")) {
      URL.revokeObjectURL(localPreview);
    }

    const url = URL.createObjectURL(file);
    setLocalPreview(url);
    onUpload(file);
  };

  const handleClickOutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black/70 z-50 flex items-start justify-center pt-20 md:pt-32"
    >
      <div className="relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-16 right-0 md:-top-12 md:-right-12 bg-white/20 backdrop-blur-sm hover:bg-white/30 p-3 rounded-full transition z-10"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        {/* Upload Button - centered over image */}
        <label
          htmlFor="profileUploadModal"
          className="absolute inset-0 flex items-center justify-center cursor-pointer z-10"
        >
          <div className="bg-white/20 backdrop-blur-sm hover:bg-white/30 p-6 rounded-full transition">
            <Camera className="w-10 h-10 text-white" />
          </div>
        </label>

        <input
          id="profileUploadModal"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Profile Image */}
        <div className="rounded-full overflow-hidden ring-8 ring-white/20 shadow-2xl">
          <img
            src={localPreview || "/placeholder-profile.jpg"}
            alt="Profile preview"
            className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-full"
            onError={() => setLocalPreview("/placeholder-profile.jpg")}
          />
        </div>
      </div>
    </div>
  );
}