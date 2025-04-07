// import { X } from "lucide-react"
// import { useEffect } from "react"

// export default function Modal({
//   isOpen,
//   onClose,
//   title,
//   children,
//   footer,
//   size = "md", // sm, md, lg, xl
// }) {
//   // Close modal when Escape key is pressed
//   useEffect(() => {
//     const handleEscapeKey = (e) => {
//       if (e.key === "Escape" && isOpen) {
//         onClose()
//       }
//     }

//     window.addEventListener("keydown", handleEscapeKey)

//     return () => {
//       window.removeEventListener("keydown", handleEscapeKey)
//     }
//   }, [isOpen, onClose])

//   // Prevent scrolling when modal is open
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = "auto"
//     }

//     return () => {
//       document.body.style.overflow = "auto"
//     }
//   }, [isOpen])

//   if (!isOpen) return null

//   // Size classes
//   const sizeClasses = {
//     sm: "max-w-sm",
//     md: "max-w-md",
//     lg: "max-w-lg",
//     xl: "max-w-xl",
//     full: "max-w-full mx-4",
//   }

//   // Handle click outside to close
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={handleBackdropClick}>
//       <div
//         className={`${sizeClasses[size]} w-full bg-white rounded-lg shadow-lg overflow-hidden animate-in fade-in duration-300`}
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Modal Header */}
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="text-xl font-bold">{title}</h2>
//           <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors" aria-label="Close">
//             <X className="h-5 w-5" />
//           </button>
//         </div>

//         {/* Modal Content */}
//         <div className="p-4">{children}</div>

//         {/* Modal Footer */}
//         {footer && <div className="p-4 border-t">{footer}</div>}
//       </div>
//     </div>
//   )
// }


import { Modal, Button } from "flowbite-react";

const ReusableModal = ({ isOpen, onClose, title, children }) => {
  return (
    <Modal dismissible show={isOpen} onClose={onClose}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-6">{children}</div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button type="submit" onClick={onClose} className="w-full text-white bg-[#5b9a68]">Close</Button>
        <Button type="submit" className="w-full text-white bg-[#5b9a68]">Save</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default ReusableModal;