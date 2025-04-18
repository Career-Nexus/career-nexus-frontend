import { useState, useRef, useEffect } from "react"
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  Flex,
  Box,
  Avatar,
  Text,
} from "@chakra-ui/react"
import { Send } from "lucide-react"

// Sample message data
const initialMessages = [
  {
    id: 1,
    text: "Hello! How can I help you today?",
    sender: "agent",
    timestamp: new Date(Date.now() - 1000 * 60 * 5),
  },
  {
    id: 2,
    text: "I have a question about career opportunities.",
    sender: "user",
    timestamp: new Date(Date.now() - 1000 * 60 * 4),
  },
  {
    id: 3,
    text: "We have several premium resources tailored to your career growth. Would you like to learn more?",
    sender: "agent",
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
  },
]

export default function ChatModal({ isOpen, onClose, onReadMessages }) {
  const [messages, setMessages] = useState(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef(null)

  // Scroll to bottom of messages when new messages are added
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (isOpen) {
      scrollToBottom()
      // Mark messages as read when modal is opened
      onReadMessages()
    }
  }, [isOpen, messages, onReadMessages])

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return

    const newMsg = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages([...messages, newMsg])
    setNewMessage("")

    // Simulate agent response
    setTimeout(() => {
      const agentResponse = {
        id: messages.length + 2,
        text: "Thank you for your message. Our team will get back to you shortly.",
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentResponse])
    }, 1000)
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay className="bg-black/50" />
      <ModalContent className="max-w-md mx-4">
        <ModalHeader className="bg-green-500 text-white py-4 rounded-t-md">Chat Support</ModalHeader>
        <ModalCloseButton className="text-white" />

        <ModalBody className="p-0">
          <Box className="h-96 overflow-y-auto p-4">
            {messages.map((msg) => (
              <Flex key={msg.id} className={`mb-4 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                {msg.sender === "agent" && (
                  <Avatar size="sm" className="mr-2" name="Support Agent" src="/placeholder.svg?height=32&width=32" />
                )}

                <Box
                  className={`max-w-[70%] p-3 rounded-lg ${
                    msg.sender === "user" ? "bg-green-500 text-white rounded-tr-none" : "bg-gray-100 rounded-tl-none"
                  }`}
                >
                  <Text className="text-sm">{msg.text}</Text>
                  <Text className={`text-xs mt-1 ${msg.sender === "user" ? "text-green-100" : "text-gray-500"}`}>
                    {formatTime(msg.timestamp)}
                  </Text>
                </Box>

                {msg.sender === "user" && (
                  <Avatar size="sm" className="ml-2" name="You" src="/placeholder.svg?height=32&width=32" />
                )}
              </Flex>
            ))}
            <div ref={messagesEndRef} />
          </Box>
        </ModalBody>

        <ModalFooter className="border-t p-3">
          <Flex className="w-full items-center">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="mr-2 border-gray-300 focus:border-green-500 focus:ring-green-500"
              onKeyDown={(e) => {
            //   onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage()
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-green-500 hover:bg-green-600 text-white"
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
