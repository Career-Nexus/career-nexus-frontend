import { Camera, X } from "lucide-react";
import { useState } from "react";

export function CoverPhotoPreviewModal({ open, onClose, image }) {
  if (!open) return null;
  const Clickoutside = (e) => {
        if (e.target === e.currentTarget) onClose();
    }
  return (
    <div onClick={Clickoutside} className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center">
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
    <div onClick={Clickoutside} className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center">
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
export function CoverPhotoUserModal({ open, onClose, image, onUpload }) {
  const [localPreview, setLocalPreview] = useState(image);

  if (!open) return null;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setLocalPreview(url);

    onUpload(file);
  };

  const Clickoutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={Clickoutside}
      className="fixed inset-0 bg-black/45 z-50 flex items-center justify-center"
    >
      <div className="relative max-w-4xl w-[95%]">
        
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 bg-black/60 p-2 rounded-full"
          onClick={onClose}
        >
          <X className="text-white w-5 h-5" />
        </button>

        {/* Upload Button */}
        <label
          htmlFor="coverUploadModal"
          className="absolute top-3 left-3 bg-black/60 p-2 rounded-full cursor-pointer"
        >
          <Camera className="text-white w-5 h-5" />
        </label>

        <input
          id="coverUploadModal"
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Image */}
        <img
          src={localPreview}
          alt="Preview"
          className="w-full max-h-[90vh] h-full object-contain rounded-lg"
        />
        {/* <img
          src={image}
          alt="Preview"
          className="w-full max-h-[90vh] h-full object-contain rounded-lg"
        /> */}
      </div>
    </div>
  );
}
export function ProfilePhotoUserModal({ open, onClose, image, onUpload }) {
  const [localPreview, setLocalPreview] = useState(image);

  if (!open) return null;

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setLocalPreview(url);

    onUpload(file);
  };

  const Clickoutside = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      onClick={Clickoutside}
      className="fixed inset-0 bg-black/45 z-50 flex pl-5 pt-20 md:pl-20"
    >
      <div className="relative w-96 h-96">

        {/* Close */}
        <button
          className="absolute top-1 md:top-3 left-24 md:left-44 bg-black/60 p-2 rounded-full"
          onClick={onClose}
        >
          <X className="text-white w-5 h-5" />
        </button>

        {/* Upload */}
        <label
          htmlFor="profileUploadModal"
          className="absolute top-24 left-24 md:top-44 md:left-44 bg-black/60 p-2 rounded-full cursor-pointer flex items-center justify-center"
        >
          <Camera className="text-white w-5 h-5" />
        </label>

        <input
          id="profileUploadModal"
          type="file"
          accept="image/jpeg,image/png"
          className="hidden"
          onChange={handleUpload}
        />

        {/* Image */}
        <img
          src={localPreview}
          alt="Preview"
          className="w-60 h-60 md:w-96 md:h-96 rounded-full"
        />
        {/* <img
          src={image}
          alt="Preview"
          className="w-60 h-60 md:w-96 md:h-96 rounded-full"
        /> */}
      </div>
    </div>
  );
}