"use client"

import { MapPin, Building, Calendar, ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { Company1, Company2, Edit, Like } from "../../../../icons/icon"
import ReusableModal from "./ModalDesign"
import { CertificationModal, EducationModal, ExperienceModal } from "./AllModal"
import { UserContext } from "../../../../context/UserContext"
import { ExperienceService } from "../../../../api/ExperienceService"

const StatusToggle = ({ initialStatus = true, onChange }) => {
  const [status, setStatus] = useState(initialStatus)

  const toggleStatus = () => {
    const newStatus = !status
    setStatus(newStatus)
    if (onChange) onChange(newStatus)
  }

  return (
    <div
      onClick={toggleStatus}
      className="inline-flex items-center px-2 py-0.5 rounded-lg text-xs border-2 border-dashed cursor-pointer hover:bg-gray-50"
    >
      <span className="text-xs mr-1">
        <Like />
      </span>
      <span className="text-xs">{status ? "RECOMMENDED" : "REQUEST RECOMMENDATION"}</span>
    </div>
  )
}

// Section header component
const SectionHeader = ({ title, onAddClick }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-bold">{title}</h2>
      <button
        onClick={onAddClick}
        className="bg-[#5DA05D] hover:bg-green-600 text-white rounded-lg px-2 py-1 flex items-center"
      >
        <Plus className="h-3 w-3 mr-1" />
        <span className="text-xs">Add {title}</span>
      </button>
    </div>
  )
}

export default function ExperienceSection() {
  // Add these state variables at the top of the ExperienceSection component
  const [currentEditItem, setCurrentEditItem] = useState(null)
  const [currentEditEducation, setCurrentEditEducation] = useState(null)
  const [currentEditCertification, setCurrentEditCertification] = useState(null)

  const [expandedItems, setExpandedItems] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [openModaledu, setOpenModaledu] = useState(false)
  const [openModalcert, setOpenModalcert] = useState(false)
  const { user, fetchUser } = useContext(UserContext)

  // Add a new state variable for the delete confirmation modal
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [itemToDelete, setItemToDelete] = useState({ type: null, id: null })

  // Only fetch user data once when component mounts
  // useEffect(() => {
  //   fetchUser()
  // }, [fetchUser])

  const toggleExpand = (id) => {
    setExpandedItems((prev) => {
      // If the item is already expanded, collapse it
      if (prev[id]) {
        return {
          ...prev,
          [id]: false,
        }
      }

      // Otherwise, collapse all items and expand only the clicked one
      const resetExpanded = {}
      Object.keys(prev).forEach((key) => {
        resetExpanded[key] = false
      })

      return {
        ...resetExpanded,
        [id]: true,
      }
    })
  }

  const handleEdit = (itemType, itemId) => {
    console.log(`Editing ${itemType} with ID:`, itemId)

    // Open the appropriate modal based on item type
    if (itemType === "experience") {
      setCurrentEditItem(itemId)
      setOpenModal(true)
    } else if (itemType === "education") {
      setCurrentEditEducation(itemId)
      setOpenModaledu(true)
    } else if (itemType === "certification") {
      setCurrentEditCertification(itemId)
      setOpenModalcert(true)
    }
  }

  // Modify the handleDelete function to show the delete confirmation modal instead of deleting directly
  const handleDelete = (itemType, itemId) => {
    console.log(`Preparing to delete ${itemType} with ID:`, itemId)
    setItemToDelete({ type: itemType, id: itemId })
    setShowDeleteModal(true)
  }

  // Add a new function to handle the actual deletion after confirmation
  const confirmDelete = async () => {
    const { type, id } = itemToDelete
    console.log(`Confirming delete ${type} with ID:`, id)

    try {
      if (type === "experience") {
        await ExperienceService.deleteExperience(id)
        alert("Experience deleted successfully")
      } else if (type === "education") {
        await ExperienceService.deleteEducation(id)
        alert("Education deleted successfully")
      } else if (type === "certification") {
        await ExperienceService.deleteCertification(id)
        alert("Certification deleted successfully")
      }

      // Fetch user data once after deletion
      fetchUser()
      setShowDeleteModal(false)
    } catch (error) {
      console.error(`Delete ${type} Error:`, error)
      alert(error.message || `Failed to delete ${type}`)
      setShowDeleteModal(false)
    }
  }

  const ItemCard = ({ itemType, id, logo, title, company, duration, address, desc, initialStatus = true }) => {
    const uniqueId = `${itemType}-${id}`

    return (
      <div className="border rounded-lg mb-4 p-4 relative max-w-4xl w-full">
        <div className="absolute right-4 top-4 flex space-x-2">
          {itemType === "certification" ? (
            <button
              onClick={() => handleDelete(itemType, id)}
              className="h-8 w-8 border border-red-500 rounded-lg flex items-center justify-center hover:bg-red-50"
              title="Delete"
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </button>
          ) : (
            // For other items, show both edit and delete icons
            <>
              <button
                onClick={() => handleEdit(itemType, id)}
                className="h-8 w-8 border border-[#5DA05D] rounded-lg flex items-center justify-center hover:bg-gray-50"
                title="Edit"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDelete(itemType, id)}
                className="h-8 w-8 border border-red-500 rounded-lg flex items-center justify-center hover:bg-red-50"
                title="Delete"
              >
                <Trash2 className="h-4 w-4 text-red-500" />
              </button>
            </>
          )}
        </div>

        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-[#5DA05D] rounded-md flex items-center justify-center">{logo}</div>
          </div>

          <div className="flex-grow">
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <h3 className="font-semibold text-base">{title}</h3>
              {/* <StatusToggle initialStatus={initialStatus} /> */}
            </div>

            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Building className="h-4 w-4 mr-1 text-[#5DA05D]" />
              <span>{company}</span>
            </div>

            {duration && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <Calendar className="h-4 w-4 mr-1 text-[#5DA05D]" />
                <span>{duration}</span>
              </div>
            )}

            {address && (
              <div className="flex items-center text-sm text-gray-600 mt-1">
                <MapPin className="h-4 w-4 mr-1 text-[#5DA05D]" />
                <span>{address}</span>
              </div>
            )}
            <ul className="list-disc ml-5 text-sm">
              {/* {(Array.isArray(desc) ? desc : desc?.split(/[\n*-]/)) // split by newline, * or - */}
              {(Array.isArray(desc) ? desc : desc?.split(/[\n]/)) // split by newline
                .filter(Boolean) // remove empty strings
                .map((point, idx) => (
                  <li key={idx} className="mt-1">
                    {point.trim()}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }


  return (

    <div className="w-full max-w-4xl mx-auto mt-5">
      {/* Experience Section */}
      <SectionHeader
        title="Experience"
        onAddClick={() => {
          setCurrentEditItem(null)
          setOpenModal(true)
        }}
      />
      <div>
        {user.experience &&
          user.experience.map((item, index) => (
            <ItemCard
              key={item.id || index}
              itemType="experience"
              id={item.id || `experience-${index}`}
              logo={
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white font-bold">
                  {item.organization
                    .split(" ")
                    .map(word => word[0]?.toUpperCase())
                    .join("")
                    .slice(0, 2) || "?"}
                </div>
              }
              title={item.title || "Unknown Title"}
              initialStatus={index % 2 === 0} // Alternating for demo purposes
              company={item.organization || "Unknown Company"}
              duration={`${item.start_date || "Unknown"} - ${item.end_date || "Present"}`}
              address={item.location || "Unknown Location"}
              desc={item.detail || "No description provided."}
            />
          ))}
      </div>
      <ExperienceModal
        ModalComponent={ReusableModal}
        isOpen={openModal}
        onClose={() => {
          setOpenModal(false)
          setCurrentEditItem(null)
          // Fetch user data once after modal closes
          fetchUser()
        }}
        itemToEdit={currentEditItem}
      />

      {/* Education Section */}
      <SectionHeader
        title="Education"
        onAddClick={() => {
          setCurrentEditEducation(null)
          setOpenModaledu(true)
        }}
      />
      <div>
        {user.education &&
          user.education.map((item, index) => (
            <ItemCard
              key={item.id || index}
              itemType="education"
              id={item.id || `education-${index}`}
              logo={
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white font-bold">
                  {item.school
                    .split(" ")
                    .map(word => word[0]?.toUpperCase())
                    .join("")
                    .slice(0, 2) || "?"}
                </div>
              }
              title={item.course}
              initialStatus={index % 2 === 1} // Alternating for demo purposes
              company={item.school}
              duration={`${item.start_date || "Unknown"} - ${item.end_date || "Present"}`}
              address={item.location}
              desc={item.detail}
            />
          ))}
      </div>
      <EducationModal
        ModalComponent={ReusableModal}
        isOpen={openModaledu}
        onClose={() => {
          setOpenModaledu(false)
          setCurrentEditEducation(null)
          // Fetch user data once after modal closes
          fetchUser()
        }}
        itemToEdit={currentEditEducation}
      />

      {/* Certifications Section */}
      <SectionHeader
        title="Licenses & Certifications"
        onAddClick={() => {
          setCurrentEditCertification(null)
          setOpenModalcert(true)
        }}
      />
      <div>
        {user.certification &&
          user.certification.map((item, index) => (
            <ItemCard
              key={item.id || index}
              itemType="certification"
              id={item.id || `certification-${index}`}
              logo={
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5DA05D] text-white font-bold">
                  {item.school
                    .split(" ")
                    .map(word => word[0]?.toUpperCase())
                    .join("")
                    .slice(0, 2) || "?"}
                </div>
              }
              title={item.title}
              initialStatus={index % 2 === 0} // Alternating for demo purposes
              company={item.school}
              duration={item.issue_date}
              desc={item.skills}
            />
          ))}
      </div>
      <CertificationModal
        ModalComponent={ReusableModal}
        isOpen={openModalcert}
        onClose={() => {
          setOpenModalcert(false)
          setCurrentEditCertification(null)
          // Fetch user data once after modal closes
          fetchUser()
        }}
        itemToEdit={currentEditCertification}
      />

      {showDeleteModal && (
        <ReusableModal
          isOpen={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          title={`Delete ${itemToDelete.type}`}
        >
          <div className="max-w-xl mx-auto bg-white p-4">
            <p className="mb-4">
              Are you sure you want to delete this {itemToDelete.type.toLowerCase()}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                Delete
              </button>
            </div>
          </div>
        </ReusableModal>
      )}
    </div>
  )
}
