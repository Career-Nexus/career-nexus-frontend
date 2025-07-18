
"use client"

import { useState, useRef, useEffect } from "react"
import { X, Video, Play, StopCircle, Pause, Volume2, VolumeX, AlertCircle, Camera, Mic } from "lucide-react"

export function VideoModal({ onSave, onClose }) {
  const [isOpen, setIsOpen] = useState(true)
  const [errorMessage, setErrorMessage] = useState("")
  const [modalState, setModalState] = useState("initial")
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.8) // Default volume at 80%
  const [isMuted, setIsMuted] = useState(false)
  const [audioLevel, setAudioLevel] = useState(0)
  const [deviceStatus, setDeviceStatus] = useState({
    video: "unknown", // unknown, available, unavailable
    audio: "unknown",
  })

  const timerRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])
  const recordedVideoUrlRef = useRef(null)
  const audioContextRef = useRef(null)
  const audioAnalyserRef = useRef(null)
  const audioDataRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Check device availability on component mount
  useEffect(() => {
    checkDeviceAvailability()
  }, [])

  // Clean up resources when component unmounts
  useEffect(() => {
    return () => {
      cleanupResources()
    }
  }, [])

  // Update video volume when volume state changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.volume = isMuted ? 0 : volume
    }
  }, [volume, isMuted])

  
  const checkDeviceAvailability = async () => {
    try {
      // Check if MediaDevices API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        setDeviceStatus({
          video: "unavailable",
          audio: "unavailable",
        })
        return
      }

      // Check for video devices
      const devices = await navigator.mediaDevices.enumerateDevices()
      const hasVideoDevice = devices.some((device) => device.kind === "videoinput")
      const hasAudioDevice = devices.some((device) => device.kind === "audioinput")

      setDeviceStatus({
        video: hasVideoDevice ? "available" : "unavailable",
        audio: hasAudioDevice ? "available" : "unavailable",
      })

      console.log("Device status:", { video: hasVideoDevice, audio: hasAudioDevice })
    } catch (error) {
      console.error("Error checking device availability:", error)
      setDeviceStatus({
        video: "unknown",
        audio: "unknown",
      })
    }
  }

  const cleanupResources = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }

    if (recordedVideoUrlRef.current) {
      URL.revokeObjectURL(recordedVideoUrlRef.current)
      recordedVideoUrlRef.current = null
    }

    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (videoRef.current) {
      videoRef.current.srcObject = null
      videoRef.current.src = ""
      videoRef.current.load()
    }

    if (audioContextRef.current) {
      audioContextRef.current.close().catch((err) => console.error("Error closing audio context:", err))
      audioContextRef.current = null
      audioAnalyserRef.current = null
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  // const closeModal = () => {
  //   cleanupResources()
  //   setIsOpen(false)
  // }
  const closeModal = () => {
    cleanupResources()
    if (onClose) onClose()
    setIsOpen(false)
  }
  const setupAudioAnalyser = (stream) => {
    try {
      // Check if stream has audio tracks
      if (!stream.getAudioTracks().length) {
        console.warn("No audio tracks found in stream")
        return
      }

      // Create audio context
      const AudioContext = window.AudioContext || window.webkitAudioContext
      if (!AudioContext) {
        console.warn("AudioContext not supported - audio visualization unavailable")
        return
      }

      const audioContext = new AudioContext()
      audioContextRef.current = audioContext

      // Create analyser
      const analyser = audioContext.createAnalyser()
      analyser.fftSize = 256
      audioAnalyserRef.current = analyser

      // Connect audio source to analyser
      const audioSource = audioContext.createMediaStreamSource(stream)
      audioSource.connect(analyser)

      // Create data array for analyser
      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      audioDataRef.current = dataArray

      // Start visualization loop
      const updateAudioLevel = () => {
        if (!audioAnalyserRef.current || !audioDataRef.current) return

        audioAnalyserRef.current.getByteFrequencyData(audioDataRef.current)

        // Calculate average level
        const average = audioDataRef.current.reduce((acc, val) => acc + val, 0) / audioDataRef.current.length
        const normalizedLevel = average / 255 // Normalize to 0-1

        setAudioLevel(normalizedLevel)

        animationFrameRef.current = requestAnimationFrame(updateAudioLevel)
      }

      updateAudioLevel()
    } catch (error) {
      console.warn("Audio visualization setup failed:", error)
    }
  }

  const startRecording = async () => {
    // Clean up any previous recording resources
    cleanupResources()
    setErrorMessage("")
    setAudioLevel(0)

    try {
      // Check if MediaDevices API is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Media devices not supported in this browser")
      }

      let stream = null
      let hasAudio = false
      let hasVideo = false

      try {
        // Try video + audio first if both seem available
        if (deviceStatus.video === "available" && deviceStatus.audio === "available") {
          try {
            stream = await navigator.mediaDevices.getUserMedia({
              video: true,
              audio: {
                echoCancellation: true,
                noiseSuppression: true,
                autoGainControl: true,
              },
            })
            hasVideo = true
            hasAudio = true
            console.log("Recording with video and audio")
          } catch (e) {
            console.warn("Failed to get video+audio:", e)
            // Fall through to next attempt
          }
        }

        // If that failed or wasn't attempted, try video only
        if (!stream && deviceStatus.video === "available") {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
            hasVideo = true
            console.log("Recording with video only (no audio)")
          } catch (e) {
            console.warn("Failed to get video only:", e)
            // Fall through to next attempt
          }
        }

        // If that failed or wasn't attempted, try audio only
        if (!stream && deviceStatus.audio === "available") {
          try {
            stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true })
            hasAudio = true
            console.log("Recording with audio only (no video)")
          } catch (e) {
            console.warn("Failed to get audio only:", e)
            // Fall through to error
          }
        }

        // If we still don't have a stream, throw an error
        if (!stream) {
          throw new Error("No recording devices available")
        }
      } catch (error) {
        console.error("All recording attempts failed:", error)
        throw new Error("Could not access camera or microphone. Please check your device connections and permissions.")
      }

      // Update device status based on what we actually got
      setDeviceStatus({
        video: hasVideo ? "available" : "unavailable",
        audio: hasAudio ? "available" : "unavailable",
      })

      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
        videoRef.current.muted = true // Mute during recording to prevent feedback
      }

      // Setup audio visualization if we have audio
      if (hasAudio) {
        setupAudioAnalyser(stream)
      }

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunksRef.current.push(e.data)
        }
      }

      mediaRecorder.onstop = () => {
        // Stop all tracks to release the camera
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop())
        }

        const blob = new Blob(chunksRef.current, { type: "video/webm" })
        const url = URL.createObjectURL(blob)
        recordedVideoUrlRef.current = url

        if (videoRef.current) {
          videoRef.current.srcObject = null
          videoRef.current.src = url
          videoRef.current.muted = isMuted // Apply mute setting
          videoRef.current.volume = volume
          videoRef.current.load() // Force load the new source
        }

        setModalState("preview")
      }

      mediaRecorder.start()
      setModalState("recording")

      // Start countdown timer
      let seconds = 30
      setTimeRemaining(seconds)

      timerRef.current = setInterval(() => {
        seconds -= 1
        setTimeRemaining(seconds)

        if (seconds <= 0) {
          stopRecording()
        }
      }, 1000)
    } catch (error) {
      console.error("Error starting recording:", error)
      setModalState("error")
      setErrorMessage(error.message || "Could not access recording devices")
    }
  }

  const stopRecording = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop()
    }

    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
      animationFrameRef.current = null
    }
  }

  const reRecord = () => {
    setIsPlaying(false)
    cleanupResources()
    setModalState("initial")
    setTimeRemaining(30)
    setAudioLevel(0)
  }

  const togglePlayback = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch((err) => {
          console.error("Error playing video:", err)
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    setIsMuted(!isMuted)
  }

  const handleVolumeChange = (e) => {
    setVolume(Number.parseFloat(e.target.value))
  }

  // const useVideo = () => {
  //   // Here you would typically save the video or process it further
  //   console.log("Video saved:", recordedVideoUrlRef.current)
  //   closeModal()
  // }
  const useVideo = () => {
    console.log("Video saved:", recordedVideoUrlRef.current)

    // Convert recorded blob to File
    const blob = new Blob(chunksRef.current, { type: "video/webm" })
    const file = new File([blob], "intro_video.webm", { type: "video/webm" })

    if (onSave) {
      onSave(file) // send back to parent
    }

    closeModal()
  }

  const formatTime = (seconds) => {
    return `00:${seconds < 10 ? "0" + seconds : seconds}`
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 rounded-lg overflow-hidden max-w-lg w-full relative">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-zinc-700">
          <h2 className="text-white text-xl font-bold">Video intro</h2>
          <button onClick={closeModal} className="text-white hover:bg-zinc-700 p-1 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Device Status Indicator */}
        {modalState === "initial" && (
          <div className="bg-zinc-700 px-4 py-2 flex items-center justify-center gap-4">
            <div className="flex items-center gap-1">
              <Camera className={`w-4 h-4 ${deviceStatus.video === "available" ? "text-green-500" : "text-red-500"}`} />
              <span className="text-sm text-white">
                {deviceStatus.video === "available" ? "Camera ready" : "No camera detected"}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Mic className={`w-4 h-4 ${deviceStatus.audio === "available" ? "text-green-500" : "text-red-500"}`} />
              <span className="text-sm text-white">
                {deviceStatus.audio === "available" ? "Microphone ready" : "No microphone detected"}
              </span>
            </div>
          </div>
        )}

        {/* Video Preview Area */}
        <div className="relative aspect-video bg-zinc-900">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay={modalState === "recording"}
            playsInline
          />

          {/* Play button overlay for preview state */}
          {modalState === "preview" && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlayback}>
              <div className="bg-white rounded-full p-3">
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-black" fill="currentColor" />
                ) : (
                  <Play className="w-6 h-6 text-black" fill="currentColor" />
                )}
              </div>
            </div>
          )}

          {/* Audio level indicator during recording */}
          {modalState === "recording" && deviceStatus.audio === "available" && (
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
              <div className="text-white">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="h-2 bg-zinc-700 rounded-full flex-1 overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all duration-100"
                  style={{ width: `${audioLevel * 100}%` }}
                />
              </div>
            </div>
          )}

          {/* No devices message */}
          {modalState === "initial" && deviceStatus.video === "unavailable" && deviceStatus.audio === "unavailable" && (
            <div className="absolute inset-0 flex items-center justify-center flex-col text-center p-6">
              <AlertCircle className="w-12 h-12 text-yellow-500 mb-2" />
              <h3 className="text-white text-xl font-bold mb-2">No Camera or Microphone Detected</h3>
              <p className="text-zinc-300 mb-4">
                We couldn't find any recording devices connected to your device. Please connect a camera or microphone
                and try again.
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="p-4 flex items-center justify-between">
          {/* Left side controls */}
          <div>
            {modalState === "initial" && (
              <button
                onClick={startRecording}
                className={`${
                  deviceStatus.video === "unavailable" && deviceStatus.audio === "unavailable"
                    ? "bg-zinc-600 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white px-4 py-2 rounded-md flex items-center gap-2`}
                disabled={deviceStatus.video === "unavailable" && deviceStatus.audio === "unavailable"}
              >
                <Video className="w-5 h-5" />
                Start recording
              </button>
            )}

            {modalState === "recording" && (
              <button
                onClick={stopRecording}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <StopCircle className="w-5 h-5" />
                Stop recording
              </button>
            )}

            {modalState === "preview" && (
              <button
                onClick={useVideo}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <Video className="w-5 h-5" />
                Use Video
              </button>
            )}
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            {(modalState === "recording" || modalState === "preview") && (
              <button
                onClick={reRecord}
                className="border border-zinc-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-zinc-700"
              >
                <Video className="w-5 h-5" />
                Re-record
              </button>
            )}

            {modalState === "preview" && deviceStatus.audio === "available" && (
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white hover:text-gray-300">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className="w-20 accent-green-500"
                />
              </div>
            )}

            <div className="text-white">Time remaining: {formatTime(timeRemaining)}</div>
          </div>
        </div>
        {/* Error State */}
        {modalState === "error" && (
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="text-red-500 mb-4 text-center">
              <p className="text-xl font-semibold mb-2">Recording Error</p>
              <p>{errorMessage}</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  checkDeviceAvailability()
                  setModalState("initial")
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Try Again
              </button>
              <button onClick={closeModal} className="bg-zinc-600 hover:bg-zinc-700 text-white px-4 py-2 rounded-md">
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
