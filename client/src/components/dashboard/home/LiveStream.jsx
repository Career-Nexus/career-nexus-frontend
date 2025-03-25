
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
          <Text fontSize="xs" fontWeight="normal">
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
          <Text fontSize="xs" fontWeight="normal">
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
          <Text fontSize="xs" fontWeight="normal">
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
          <Text fontSize="xs" fontWeight="normal">
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
            fontSize="sm"
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


// import { Button } from "@/components/ui/Button"
// import {
//   Dialog,
//   ModalContent,
//   AlertDialogHeader,
//   AlertTitle,
//   AlertDescription,
//   ModalFooter,
//   DialogClose,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Calendar as CalendarComponent } from "@/components/ui/calendar"
//import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"




// import { format } from "date-fns"
// import { AlertDescription, AlertDialog, AlertDialogCloseButton, AlertDialogHeader, AlertTitle, Button, Input, ModalContent, ModalFooter, Popover, PopoverContent, PopoverTrigger, Textarea } from "@chakra-ui/react"

// export default function SocialMediaToolbar() {
//   const [videoUploadOpen, setVideoUploadOpen] = useState(false)
//   const [liveStreamOpen, setLiveStreamOpen] = useState(false)
//   const [calendarOpen, setCalendarOpen] = useState(false)
//   const [articleOpen, setArticleOpen] = useState(false)
//   const [date, setDate] = useState();
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const fileInputRef = useRef(null);

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//     };

//   const simulateUpload = () => {
//     if (!selectedFile) return

//     setIsUploading(true)
//     setUploadProgress(0)

//     const interval = setInterval(() => {
//       setUploadProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval)
//           setIsUploading(false)
//           setTimeout(() => {
//             setVideoUploadOpen(false)
//             setSelectedFile(null)
//           }, 1000)
//           return 100
//         }
//         return prev + 10
//       })
//     }, 500)
//   }

//   const handlePost = () => {
//     // Handle the main post action
//     alert("Post created successfully!")
//   }

//   return (
//     <>
//       <div className="flex items-center gap-2 w-full max-w-3xl">
//         <Button
//           variant="ghost"
//           className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
//           onClick={() => {
//             fileInputRef.current?.click()
//             setVideoUploadOpen(true)
//           }}
//         >
//           <Upload className="h-4 w-4" />
//           <span className="text-sm font-medium">Upload Media</span>
//           <input
//             type="file"
//             ref={fileInputRef}
//             className="hidden"
//             accept="video/*,image/*"
//             onChange={handleFileChange}
//           />
//         </Button>

//         <Button
//           variant="ghost"
//           className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
//           onClick={() => setLiveStreamOpen(true)}
//         >
//           <Video className="h-4 w-4" />
//           <span className="text-sm font-medium">Start Live Video</span>
//         </Button>

//         <Button
//           variant="ghost"
//           className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
//           onClick={() => setCalendarOpen(true)}
//         >
//           <Calendar className="h-4 w-4" />
//           <span className="text-sm font-medium">Add Event</span>
//         </Button>

//         <Button
//           variant="ghost"
//           className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
//           onClick={() => setArticleOpen(true)}
//         >
//           <FileText className="h-4 w-4" />
//           <span className="text-sm font-medium">Add Article</span>
//         </Button>

//         <div className="ml-auto">
//           <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6" onClick={handlePost}>
//             Post
//           </Button>
//         </div>
//       </div>

//       {/* Video Upload Dialog */}
//       <AlertDialog open={videoUploadOpen} onOpenChange={setVideoUploadOpen}>
//         <ModalContent className="sm:max-w-md">
//           <AlertDialogHeader>
//             <AlertTitle>Upload Media</AlertTitle>
//             <AlertDescription>Upload videos or images to share with your audience</AlertDescription>
//           </AlertDialogHeader>
//           <div className="space-y-4 py-4">
//             {selectedFile ? (
//               <div className="space-y-2">
//                 <p className="text-sm font-medium">Selected file: {selectedFile.name}</p>
//                 <p className="text-xs text-gray-500">Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>

//                 {isUploading && (
//                   <div className="w-full bg-gray-200 rounded-full h-2.5">
//                     <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
//                   </div>
//                 )}

//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)} disabled={isUploading}>
//                     Change File
//                   </Button>
//                   <Button size="sm" onClick={simulateUpload} disabled={isUploading}>
//                     {isUploading ? "Uploading..." : "Upload Now"}
//                   </Button>
//                 </div>
//               </div>
//             ) : (
//               <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                 <Upload className="mx-auto h-8 w-8 text-gray-400" />
//                 <p className="mt-2 text-sm text-gray-500">Drag and drop your files here or click to browse</p>
//                 <Button variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
//                   Select Files
//                 </Button>
//               </div>
//             )}
//           </div>
//           <ModalFooter className="sm:justify-start">
//             <AlertDialogCloseButton asChild>
//               <Button type="Button" variant="secondary">
//                 Cancel
//               </Button>
//             </AlertDialogCloseButton>
//           </ModalFooter>
//         </ModalContent>
//       </AlertDialog>

//       {/* Live Stream Dialog */}
//       <AlertDialog open={liveStreamOpen} onOpenChange={setLiveStreamOpen}>
//         <ModalContent className="sm:max-w-md">
//           <AlertDialogHeader>
//             <AlertTitle>Start Live Video</AlertTitle>
//             <AlertDescription>Set up your live stream and go live to your audience</AlertDescription>
//           </AlertDialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <label htmlFor="stream-title">Stream Title</label>
//               <Input id="stream-title" placeholder="Enter a title for your stream" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="stream-description">Description</label>
//               <Textarea id="stream-description" placeholder="Tell viewers what your stream is about" />
//             </div>
//             <div className="space-y-2">
//               <label>Privacy</label>
//               <div className="flex gap-4">
//                 <div className="flex items-center">
//                   <input type="radio" id="public" name="privacy" className="mr-2" defaultChecked />
//                   <label htmlFor="public">Public</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input type="radio" id="friends" name="privacy" className="mr-2" />
//                   <label htmlFor="friends">Friends</label>
//                 </div>
//                 <div className="flex items-center">
//                   <input type="radio" id="private" name="privacy" className="mr-2" />
//                   <label htmlFor="private">Private</label>
//                 </div>
//               </div>
//             </div>
//             <div className="bg-gray-100 p-4 rounded-lg">
//               <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
//                 <Video className="h-12 w-12 text-gray-400" />
//               </div>
//               <p className="text-xs text-center mt-2 text-gray-500">Camera preview will appear here</p>
//             </div>
//           </div>
//           <ModalFooter>
//             <Button variant="secondary" onClick={() => setLiveStreamOpen(false)}>
//               Cancel
//             </Button>
//             <Button className="bg-red-500 hover:bg-red-600">Go Live</Button>
//           </ModalFooter>
//         </ModalContent>
//       </AlertDialog>

//       {/* Calendar Event Dialog */}
//       <AlertDialog open={calendarOpen} onOpenChange={setCalendarOpen}>
//         <ModalContent className="sm:max-w-md">
//           <AlertDialogHeader>
//             <AlertTitle>Add Event</AlertTitle>
//             <AlertDescription>Create a new event and add it to your calendar</AlertDescription>
//           </AlertDialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <label htmlFor="event-title">Event Title</label>
//               <Input id="event-title" placeholder="Enter event title" />
//             </div>
//             <div className="space-y-2">
//               <label>Event Date</label>
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button variant="outline" className="w-full justify-start text-left font-normal">
//                     {date ? format(date, "PPP") : "Select a date"}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="w-auto p-0">
//                   {/* <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus /> */}
//                   <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div className="grid grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <label htmlFor="start-time">Start Time</label>
//                 <Input id="start-time" type="time" />
//               </div>
//               <div className="space-y-2">
//                 <label htmlFor="end-time">End Time</label>
//                 <Input id="end-time" type="time" />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="location">Location</label>
//               <Input id="location" placeholder="Add location" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="event-description">Description</label>
//               <Textarea id="event-description" placeholder="Add details about your event" />
//             </div>
//           </div>
//           <ModalFooter>
//             <Button variant="secondary" onClick={() => setCalendarOpen(false)}>
//               Cancel
//             </Button>
//             <Button>Create Event</Button>
//           </ModalFooter>
//         </ModalContent>
//       </AlertDialog>

//       {/* Article Dialog */}
//       <AlertDialog open={articleOpen} onOpenChange={setArticleOpen}>
//         <ModalContent className="sm:max-w-[800px]">
//           <AlertDialogHeader>
//             <AlertTitle>Create Article</AlertTitle>
//             <AlertDescription>Write and publish an article to share with your audience</AlertDescription>
//           </AlertDialogHeader>
//           <div className="space-y-4 py-4">
//             <div className="space-y-2">
//               <label htmlFor="article-title">Title</label>
//               <Input id="article-title" placeholder="Enter article title" className="text-lg" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="article-subtitle">Subtitle (optional)</label>
//               <Input id="article-subtitle" placeholder="Enter subtitle" />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="article-content">Content</label>
//               <div className="border rounded-md p-2">
//                 <div className="flex gap-2 border-b pb-2 mb-2">
//                   {["B", "I", "U", "H1", "H2", "Link", "Image"].map((tool) => (
//                     <Button key={tool} variant="outline" size="sm" className="h-8 px-2 text-xs">
//                       {tool}
//                     </Button>
//                   ))}
//                 </div>
//                 <Textarea
//                   id="article-content"
//                   placeholder="Write your article content here..."
//                   className="min-h-[300px] border-0 focus-visible:ring-0 resize-none p-0"
//                 />
//               </div>
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="article-tags">Tags</label>
//               <Input id="article-tags" placeholder="Add tags separated by commas" />
//             </div>
//           </div>
//           <ModalFooter>
//             <Button variant="outline">Save Draft</Button>
//             <Button>Publish Article</Button>
//           </ModalFooter>
//         </ModalContent>
//       </AlertDialog>
//     </>
//   )
// }