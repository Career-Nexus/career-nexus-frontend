
"use client"

import { useState, useRef } from "react"

function EmojiPicker({ isOpen, onClose, onEmojiSelect }) {
    const emojis = [
        "😀",
        "😃",
        "😄",
        "😁",
        "😆",
        "😅",
        "😂",
        "🤣",
        "😊",
        "😇",
        "🙂",
        "🙃",
        "😉",
        "😌",
        "😍",
        "🥰",
        "😘",
        "😗",
        "😙",
        "😚",
        "😋",
        "😛",
        "😝",
        "😜",
        "🤪",
        "🤨",
        "🧐",
        "🤓",
        "😎",
        "🤩",
        "🥳",
        "😏",
        "😒",
        "😞",
        "😔",
        "😟",
        "😕",
        "🙁",
        "☹️",
        "😣",
        "😖",
        "😫",
        "😩",
        "🥺",
        "😢",
        "😭",
        "😤",
        "😠",
        "👍",
        "👎",
        "👌",
        "✌️",
        "🤞",
        "🤟",
        "🤘",
        "🤙",
        "👈",
        "👉",
        "👆",
        "👇",
        "☝️",
        "✋",
        "🤚",
        "🖐️",
        "❤️",
        "🧡",
        "💛",
        "💚",
        "💙",
        "💜",
        "🖤",
        "🤍",
        "💯",
        "💢",
        "💥",
        "💫",
        "💦",
        "💨",
        "🕳️",
        "💬",
    ]

    if (!isOpen) return null

    return (
        <>
            {/* Backdrop */}
            <div className="fixed inset-0 bg-black bg-opacity-25 z-40" onClick={onClose} />

            {/* Emoji Modal */}
            <div className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50 w-80 max-h-64 overflow-y-auto">
                <div className="grid grid-cols-8 gap-2">
                    {emojis.map((emoji, index) => (
                        <button
                            key={index}
                            onClick={() => {
                                onEmojiSelect(emoji)
                                onClose()
                            }}
                            className="text-2xl hover:bg-gray-100 rounded-lg p-2 transition-colors"
                        >
                            {emoji}
                        </button>
                    ))}
                </div>
            </div>
        </>
    )
}

export default function Chats() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey PrisGirl! 👋 I saw your post about getting into freelance UI/UX. Mind if I ask how you got your first client?",
            sender: "other",
            timestamp: "5:36",
        },
        {
            id: 2,
            text: "Hey Daniel! Not at all 😊\nI actually started on Upwork — created a niche portfolio and focused on landing page designs.",
            sender: "user",
            timestamp: "12:35",
        },
        {
            id: 3,
            text: "Ohh nice! How long did it take before you got your first gig?",
            sender: "other",
            timestamp: "5:36",
        },
        {
            id: 4,
            text: "About 2 weeks. I sent personalized proposals and made sure my Behance was solid.\nAlso joined a few Discord design groups — super helpful!",
            sender: "user",
            timestamp: "12:35",
        },
        {
            id: 5,
            text: "That's really encouraging, thanks!",
            sender: "other",
            timestamp: "",
        },
    ])

    const [newMessage, setNewMessage] = useState("")
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null)
    const fileInputRef = useRef(null)

    const handleEmojiSelect = (emoji) => {
        setNewMessage((prev) => prev + emoji)
    }

    const handleFileSelect = (event) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedFile(file)
        }
    }

    const handleSendMessage = () => {
        if (newMessage.trim() || selectedFile) {
            const message = {
                id: messages.length + 1,
                text: newMessage,
                sender: "user",
                timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                file: selectedFile
                    ? {
                        name: selectedFile.name,
                        type: selectedFile.type,
                        url: URL.createObjectURL(selectedFile),
                    }
                    : undefined,
            }
            setMessages([...messages, message])
            setNewMessage("")
            setSelectedFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ""
            }
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            handleSendMessage()
        }
    }

    return (
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow w-full">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
                        <img
                            src="/placeholder.svg?height=40&width=40"
                            alt="Dianne Russell"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <h2 className="font-semibold text-gray-900">Dianne Russell</h2>
                </div>
                <div className="flex space-x-2">
                    {/* Phone Icon */}
                    <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                        <svg className="w-5 h-5 text-[#5DA05D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>
                    </button>
                    {/* Video Icon */}
                    <button className="p-2 rounded-full border border-gray-200 hover:bg-gray-50">
                        <svg className="w-5 h-5 text-[#5DA05D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-2">
                {/* Today Divider */}
                <div className="flex justify-center">
                    <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Today</span>
                </div>

                {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                        <div className="max-w-xs">
                            <div
                                className={`p-3 rounded-2xl ${message.sender === "user"
                                    ? "bg-[#D9FFDB] rounded-br-md"
                                    : "bg-gray-100 text-gray-900 rounded-bl-md"
                                    }`}
                            >
                                {message.file && (
                                    <div className="mb-2">
                                        {message.file.type.startsWith("image/") ? (
                                            <img
                                                src={message.file.url || "/placeholder.svg"}
                                                alt={message.file.name}
                                                className="max-w-full h-auto rounded-lg"
                                            />
                                        ) : (
                                            <div
                                                className={`flex items-center space-x-2 p-2 rounded-lg ${message.sender === "user" ? "bg-[#D9FFDB]" : "bg-gray-200"
                                                    }`}
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                                    />
                                                </svg>
                                                <span className="text-sm truncate">{message.file.name}</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {message.text && <p className="text-sm whitespace-pre-line">{message.text}</p>}
                            </div>
                            {message.timestamp && (
                                <p className={`text-xs text-gray-500 mt-1 ${message.sender === "user" ? "text-right" : "text-left"}`}>
                                    {message.timestamp}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100">
                {/* Selected File Preview */}
                {selectedFile && (
                    <div className="mb-3 p-2 bg-gray-50 rounded-lg flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                                />
                            </svg>
                            <span className="text-sm text-gray-700 truncate">{selectedFile.name}</span>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedFile(null)
                                if (fileInputRef.current) {
                                    fileInputRef.current.value = ""
                                }
                            }}
                            className="text-gray-400 hover:text-gray-600"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                )}

                <div className="flex items-center space-x-3">
                    {/* Hidden File Input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileSelect}
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                    />

                    {/* Attachment Button */}
                    <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-gray-100 rounded-full">
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                        </svg>
                    </button>

                    {/* Input Field */}
                    <div className="flex-1 relative">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Write a Message..."
                            className="w-full px-4 py-2 bg-gray-50 rounded-full border-none outline-none focus:ring-2 focus:ring-[#5DA05D] focus:bg-white"
                        />
                    </div>

                    {/* Emoji Button */}
                    <div className="relative">
                        <button
                            onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
                            className="p-2 hover:bg-gray-100 rounded-full"
                        >
                            🙂
                        </button>

                        <EmojiPicker
                            isOpen={isEmojiPickerOpen}
                            onClose={() => setIsEmojiPickerOpen(false)}
                            onEmojiSelect={handleEmojiSelect}
                        />
                    </div>

                    {/* Send Button */}
                    <button
                        onClick={handleSendMessage}
                        disabled={!newMessage.trim() && !selectedFile}
                        className="p-2 bg-[#5DA05D] hover:bg-[#5DA05F] disabled:bg-gray-300 disabled:cursor-not-allowed rounded-full text-white transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
