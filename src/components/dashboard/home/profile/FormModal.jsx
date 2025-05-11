import { useRef, useState } from "react"
import Modal from "./ModalDesign"
import { Button } from "@chakra-ui/react"
export default function ProjectFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }))
    }
  }

  const handleFileChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }))
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = "This field is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "This field is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
      onClose()
    }
  }

  //file upload component
function FileUpload({ label, name, onChange, accept = "image/*", required = false, error }) {
  const [fileName, setFileName] = useState("No file chosen")
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFileName(file.name)
      if (onChange) {
        onChange(file)
      }
    } else {
      setFileName("No file chosen")
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current.click()
  }

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 font-medium">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex items-center w-full border rounded-md overflow-hidden">
        <input
          ref={fileInputRef}
          type="file"
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="bg-gray-100 hover:bg-gray-200 px-4 py-2 text-sm font-medium transition-colors"
        >
          Choose File
        </button>
        <span className="px-3 py-2 text-gray-500 flex-1 truncate">{fileName}</span>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

//form field component
function FormField({
    label,
    name,
    type = "text",
    required = false,
    error,
    placeholder,
    value,
    onChange,
    children,
  }) {
    const id = `field-${name}`
  
    return (
      <div className="mb-4">
        {label && (
          <label htmlFor={id} className="block mb-1 font-medium">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
  
        {children ? (
          children
        ) : (
          <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        )}
  
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    )
  }
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add New Project"
      footer={
        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose} className="mr-2">
            Cancel
          </Button>
          <Button type="submit" form="project-form">
            Save
          </Button>
        </div>
      }
    >
      <form id="project-form" onSubmit={handleSubmit}>
        <FormField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter project title"
          required
          error={errors.title}
        />

        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter project Description"
          required
          error={errors.description}
        >
          <textarea
            id="field-description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter project Description"
            rows={1}
            className="w-full px-3 border rounded-md focus:outline-none focus:ring-0 focus:ring-green-500"
          />
        </FormField>

        <FileUpload label="Upload Image" name="image" onChange={handleFileChange} />
      </form>
    </Modal>
  )
}
