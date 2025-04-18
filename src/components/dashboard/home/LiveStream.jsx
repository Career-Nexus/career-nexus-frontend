
import React from "react"

import { Upload, Video, FileText } from "lucide-react"

import { useState, useRef } from "react"
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Textarea,
  Text,
  Radio,
  RadioGroup,
  Progress,
  AspectRatio,
  HStack,
  VStack,
  IconButton,
  useDisclosure,
  Center,
  FormLabel,
} from "@chakra-ui/react"
import { Calendar } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { format } from "date-fns"
import { FiUpload, FiVideo, FiCalendar, FiFileText } from "react-icons/fi"
import { EventIcon } from "../../../icons/icon"

export default function SocialMediaToolbar() {
  // Modal states
  const { isOpen: isVideoUploadOpen, onOpen: onVideoUploadOpen, onClose: onVideoUploadClose } = useDisclosure()

  const { isOpen: isLiveStreamOpen, onOpen: onLiveStreamOpen, onClose: onLiveStreamClose } = useDisclosure()

  const { isOpen: isCalendarOpen, onOpen: onCalendarOpen, onClose: onCalendarClose } = useDisclosure()

  const { isOpen: isArticleOpen, onOpen: onArticleOpen, onClose: onArticleClose } = useDisclosure()

  // File upload states
  const [date, setDate] = useState(new Date())
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const simulateUpload = () => {
    if (!selectedFile) return

    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          setTimeout(() => {
            onVideoUploadClose()
            setSelectedFile(null)
          }, 1000)
          return 100
        }
        return prev + 10
      })
    }, 500)
  }

  const handlePost = () => {
    // Handle the main post action
    alert("Post created successfully!")
  }

  return (
    <>
      <Flex gap={2} width="full" maxWidth="3xl">
        <Button
          variant="ghost"
          // leftIcon={<FiUpload />}
          leftIcon={<Upload className="w-5 h-5 text-gray-600"/>}
          bg="gray.100"
          _hover={{ bg: "gray.100" }}
          borderRadius="lg"
          px={4}
          py={2}
          height="auto"
          onClick={() => {
            fileInputRef.current?.click()
            onVideoUploadOpen()
          }}
        >
          <Text fontSize="xs" fontWeight="normal" className="md:hidden lg:block">
            Upload Media
          </Text>
          <Input type="file" ref={fileInputRef} display="none" accept="video/*,image/*" onChange={handleFileChange} />
        </Button>

        <Button
          variant="ghost"
          // leftIcon={<FiVideo />}
          leftIcon={<Video className="w-5 h-5 text-gray-600"/>}
          bg="gray.100"
          _hover={{ bg: "gray.100" }}
          borderRadius="lg"
          px={4}
          py={2}
          height="auto"
          onClick={onLiveStreamOpen}
        >
          <Text fontSize="xs" fontWeight="normal" className="md:hidden lg:block">
            Start Live Video
          </Text>
        </Button>

        <Button
          variant="ghost"
          // leftIcon={<FiCalendar />}
          leftIcon={<EventIcon className="w-5 h-5 text-gray-600"/>}
          bg="gray.100"
          _hover={{ bg: "gray.100" }}
          borderRadius="lg"
          px={4}
          py={2}
          height="auto"
          onClick={onCalendarOpen}
        >
          <Text fontSize="xs" fontWeight="normal" className="md:hidden lg:block">
            Add Event
          </Text>
        </Button>

        <Button
          variant="ghost"
          // leftIcon={<FiFileText />}
          leftIcon={<FileText className="w-5 h-5 text-gray-600"/>}
          bg="gray.100"
          _hover={{ bg: "gray.100" }}
          borderRadius="lg"
          px={4}
          py={2}
          height="auto"
          onClick={onArticleOpen}
        >
          <Text fontSize="xs" fontWeight="normal" className="md:hidden lg:block">
            Add Article
          </Text>
        </Button>

        <Box marginLeft="auto">
          <Button
            bg="#5DA05D"
            _hover={{ bg: "green.600" }}
            color="white"
            borderRadius="lg"
            px={6}
            onClick={handlePost}
            fontSize="xs"
            fontWeight="normal"
          >
            Post
          </Button>
        </Box>
      </Flex>

      {/* Video Upload Modal */}
      <Modal isOpen={isVideoUploadOpen} onClose={onVideoUploadClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="md">
          <ModalHeader>Upload Media</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} color="gray.600">
              Upload videos or images to share with your audience
            </Text>

            {selectedFile ? (
              <VStack spacing={2} align="stretch">
                <Text fontSize="sm" fontWeight="medium">
                  Selected file: {selectedFile.name}
                </Text>
                <Text fontSize="xs" color="gray.500">
                  Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                </Text>

                {isUploading && <Progress value={uploadProgress} size="sm" colorScheme="green" borderRadius="full" />}

                <HStack spacing={2}>
                  <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)} isDisabled={isUploading}>
                    Change File
                  </Button>
                  <Button size="sm" onClick={simulateUpload} isDisabled={isUploading} colorScheme="blue">
                    {isUploading ? "Uploading..." : "Upload Now"}
                  </Button>
                </HStack>
              </VStack>
            ) : (
              <Center
                border="2px"
                borderStyle="dashed"
                borderColor="gray.300"
                borderRadius="lg"
                p={8}
                textAlign="center"
              >
                <VStack>
                  <Box as={FiUpload} h={8} w={8} color="gray.400" />
                  <Text mt={2} fontSize="sm" color="gray.500">
                    Drag and drop your files here or click to browse
                  </Text>
                  <Button variant="outline" mt={4} onClick={() => fileInputRef.current?.click()}>
                    Select Files
                  </Button>
                </VStack>
              </Center>
            )}
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" onClick={onVideoUploadClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Live Stream Modal */}
      <Modal isOpen={isLiveStreamOpen} onClose={onLiveStreamClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="md">
          <ModalHeader>Start Live Video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} color="gray.600">
              Set up your live stream and go live to your audience
            </Text>

            <VStack spacing={4} align="stretch">
              <Box>
                <FormLabel htmlFor="stream-title">Stream Title</FormLabel>
                <Input id="stream-title" placeholder="Enter a title for your stream" />
              </Box>

              <Box>
                <FormLabel htmlFor="stream-description">Description</FormLabel>
                <Textarea id="stream-description" placeholder="Tell viewers what your stream is about" />
              </Box>

              <Box>
                <FormLabel>Privacy</FormLabel>
                <RadioGroup defaultValue="public">
                  <HStack spacing={4}>
                    <Radio value="public">Public</Radio>
                    <Radio value="friends">Friends</Radio>
                    <Radio value="private">Private</Radio>
                  </HStack>
                </RadioGroup>
              </Box>

              <Box bg="gray.100" p={4} borderRadius="lg">
                <AspectRatio ratio={16 / 9}>
                  <Center bg="black" borderRadius="lg">
                    <Box as={FiVideo} h={12} w={12} color="gray.400" />
                  </Center>
                </AspectRatio>
                <Text fontSize="xs" textAlign="center" mt={2} color="gray.500">
                  Camera preview will appear here
                </Text>
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onLiveStreamClose}>
              Cancel
            </Button>
            <Button colorScheme="red">Go Live</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Calendar Event Modal */}
      <Modal isOpen={isCalendarOpen} onClose={onCalendarClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth="md">
          <ModalHeader>Add Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} color="gray.600">
              Create a new event and add it to your calendar
            </Text>

            <VStack spacing={4} align="stretch">
              <Box>
                <FormLabel htmlFor="event-title">Event Title</FormLabel>
                <Input id="event-title" placeholder="Enter event title" />
              </Box>

              <Box>
                <FormLabel>Event Date</FormLabel>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                  <Calendar onChange={setDate} value={date} className="chakra-calendar" />
                </Box>
                <Text mt={2} fontSize="sm" color="blue.500">
                  Selected date: {format(date, "PPP")}
                </Text>
              </Box>

              <HStack spacing={4}>
                <Box flex="1">
                  <FormLabel htmlFor="start-time">Start Time</FormLabel>
                  <Input id="start-time" type="time" />
                </Box>
                <Box flex="1">
                  <FormLabel htmlFor="end-time">End Time</FormLabel>
                  <Input id="end-time" type="time" />
                </Box>
              </HStack>

              <Box>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input id="location" placeholder="Add location" />
              </Box>

              <Box>
                <FormLabel htmlFor="event-description">Description</FormLabel>
                <Textarea id="event-description" placeholder="Add details about your event" />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onCalendarClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Create Event</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Article Modal */}
      <Modal isOpen={isArticleOpen} onClose={onArticleClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Article</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} color="gray.600">
              Write and publish an article to share with your audience
            </Text>

            <VStack spacing={4} align="stretch">
              <Box>
                <FormLabel htmlFor="article-title">Title</FormLabel>
                <Input id="article-title" placeholder="Enter article title" fontSize="lg" />
              </Box>

              <Box>
                <FormLabel htmlFor="article-subtitle">Subtitle (optional)</FormLabel>
                <Input id="article-subtitle" placeholder="Enter subtitle" />
              </Box>

              <Box>
                <FormLabel htmlFor="article-content">Content</FormLabel>
                <Box border="1px" borderColor="gray.200" borderRadius="md" p={2}>
                  <Flex gap={2} borderBottom="1px" borderColor="gray.200" pb={2} mb={2}>
                    {["B", "I", "U", "H1", "H2", "Link", "Image"].map((tool) => (
                      <IconButton
                        key={tool}
                        aria-label={tool}
                        variant="outline"
                        size="sm"
                        h={8}
                        px={2}
                        fontSize="xs"
                        icon={<Text>{tool}</Text>}
                      />
                    ))}
                  </Flex>
                  <Textarea
                    id="article-content"
                    placeholder="Write your article content here..."
                    minH="300px"
                    border="0"
                    _focus={{ boxShadow: "none" }}
                    resize="none"
                    p={0}
                  />
                </Box>
              </Box>

              <Box>
                <FormLabel htmlFor="article-note">Note</FormLabel>
                <Textarea
                  id="article-note"
                  placeholder="Add a note about this article (internal use only)"
                  size="sm"
                  bg="yellow.50"
                  border="1px"
                  borderColor="yellow.200"
                />
              </Box>

              <Box>
                <FormLabel htmlFor="article-tags">Tags</FormLabel>
                <Input id="article-tags" placeholder="Add tags separated by commas" />
              </Box>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3}>
              Save Draft
            </Button>
            <Button colorScheme="blue">Publish Article</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}