import React, { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import getCroppedImg from "./utils"


export default function ImageCropper({ imageSrc, onCrop, onCancel }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }, [])

  const handleCrop = async () => {
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels)
    onCrop(croppedBlob)
  }

  return (
    <div className="space-y-4">
      <div className="relative w-full h-[400px] bg-black">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1} // square crop
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm">Zoom</label>
        <input
          type="range"
          min={1}
          max={3}
          step={0.1}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={handleCrop} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Apply Crop
        </button>
      </div>
    </div>
  )
}