
import { useState, useEffect } from "react"
import { MessageSquare } from "lucide-react"
import ChatModal from "./ChatModal"
import { Link } from "react-router-dom"

export default function FloatingMessageIcon() {
  const [unreadCount, setUnreadCount] = useState(2)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Handle scroll events to show/hide based on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true)
      }
    //   } else if (currentScrollY > 50 && currentScrollY > lastScrollY) {
    //     setIsVisible(false)
    //   }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const handleClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleReadMessages = () => {
    setUnreadCount(0)
  }

  return (
    <>
      <div
        className={`fixed bottom-12 right-36 transition-all duration-300 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <Link to={'/chat'}>
            <button
          onClick={handleClick}
          className="relative flex items-center justify-center w-12 h-12 bg-[#5DA05D] rounded-full shadow-lg hover:bg-green-600 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
          aria-label="Open messages"
        >
          <MessageSquare className="w-5 h-5 text-white" />

          {unreadCount > 0 && (
            <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
              {unreadCount}
            </div>
          )}
        </button>
        </Link>
      </div>
      {/* <ChatModal isOpen={isModalOpen} onClose={handleCloseModal} onReadMessages={handleReadMessages} /> */}
    </>
  )
}
