import React, { useRef, useState } from "react"
import ReactPlayer from "react-player"

export default function VideoTrimmer({ videoSrc, onTrim, onCancel }) {
  const playerRef = useRef(null)
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [duration, setDuration] = useState(0)

  const handleReady = () => {
    const dur = playerRef.current.getDuration()
    setDuration(dur)
    setEnd(dur)
  }

  const handleSeek = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time)
    }
  }

  return (
    <div className="space-y-4">
      <ReactPlayer
        ref={playerRef}
        url={videoSrc}
        controls
        width="100%"
        height="300px"
        onReady={handleReady}
      />
      <div className="space-y-2">
        <label className="text-sm">Start: {start.toFixed(1)}s</label>
        <input
          type="range"
          min="0"
          max={duration}
          step="0.1"
          value={start}
          onChange={(e) => {
            const value = parseFloat(e.target.value)
            setStart(value)
            handleSeek(value)
          }}
          className="w-full"
        />

        <label className="text-sm">End: {end.toFixed(1)}s</label>
        <input
          type="range"
          min={start}
          max={duration}
          step="0.1"
          value={end}
          onChange={(e) => {
            const value = parseFloat(e.target.value)
            setEnd(value)
            handleSeek(value)
          }}
          className="w-full"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
          Cancel
        </button>
        <button
          onClick={() => onTrim({ startTime: start, endTime: end, duration: end - start })}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Apply Trim
        </button>
      </div>
    </div>
  )
}