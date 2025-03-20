
import React from "react"

import { useState, useRef } from "react"
import { Upload, Video, Calendar, FileText } from "lucide-react"
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
import { format } from "date-fns"
import { AlertDescription, AlertDialog, AlertDialogCloseButton, AlertDialogHeader, AlertTitle, Button, Input, ModalContent, ModalFooter, Popover, PopoverContent, PopoverTrigger, Textarea } from "@chakra-ui/react"

export default function SocialMediaToolbar() {
  const [videoUploadOpen, setVideoUploadOpen] = useState(false)
  const [liveStreamOpen, setLiveStreamOpen] = useState(false)
  const [calendarOpen, setCalendarOpen] = useState(false)
  const [articleOpen, setArticleOpen] = useState(false)
  const [date, setDate] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
    };

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
            setVideoUploadOpen(false)
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
      <div className="flex items-center gap-2 w-full max-w-3xl">
        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
          onClick={() => {
            fileInputRef.current?.click()
            setVideoUploadOpen(true)
          }}
        >
          <Upload className="h-4 w-4" />
          <span className="text-sm font-medium">Upload Media</span>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="video/*,image/*"
            onChange={handleFileChange}
          />
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
          onClick={() => setLiveStreamOpen(true)}
        >
          <Video className="h-4 w-4" />
          <span className="text-sm font-medium">Start Live Video</span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
          onClick={() => setCalendarOpen(true)}
        >
          <Calendar className="h-4 w-4" />
          <span className="text-sm font-medium">Add Event</span>
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 rounded-full px-4 py-2 h-auto"
          onClick={() => setArticleOpen(true)}
        >
          <FileText className="h-4 w-4" />
          <span className="text-sm font-medium">Add Article</span>
        </Button>

        <div className="ml-auto">
          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-md px-6" onClick={handlePost}>
            Post
          </Button>
        </div>
      </div>

      {/* Video Upload Dialog */}
      <AlertDialog open={videoUploadOpen} onOpenChange={setVideoUploadOpen}>
        <ModalContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertTitle>Upload Media</AlertTitle>
            <AlertDescription>Upload videos or images to share with your audience</AlertDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            {selectedFile ? (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected file: {selectedFile.name}</p>
                <p className="text-xs text-gray-500">Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>

                {isUploading && (
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${uploadProgress}%` }}></div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setSelectedFile(null)} disabled={isUploading}>
                    Change File
                  </Button>
                  <Button size="sm" onClick={simulateUpload} disabled={isUploading}>
                    {isUploading ? "Uploading..." : "Upload Now"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">Drag and drop your files here or click to browse</p>
                <Button variant="outline" className="mt-4" onClick={() => fileInputRef.current?.click()}>
                  Select Files
                </Button>
              </div>
            )}
          </div>
          <ModalFooter className="sm:justify-start">
            <AlertDialogCloseButton asChild>
              <Button type="Button" variant="secondary">
                Cancel
              </Button>
            </AlertDialogCloseButton>
          </ModalFooter>
        </ModalContent>
      </AlertDialog>

      {/* Live Stream Dialog */}
      <AlertDialog open={liveStreamOpen} onOpenChange={setLiveStreamOpen}>
        <ModalContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertTitle>Start Live Video</AlertTitle>
            <AlertDescription>Set up your live stream and go live to your audience</AlertDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="stream-title">Stream Title</label>
              <Input id="stream-title" placeholder="Enter a title for your stream" />
            </div>
            <div className="space-y-2">
              <label htmlFor="stream-description">Description</label>
              <Textarea id="stream-description" placeholder="Tell viewers what your stream is about" />
            </div>
            <div className="space-y-2">
              <label>Privacy</label>
              <div className="flex gap-4">
                <div className="flex items-center">
                  <input type="radio" id="public" name="privacy" className="mr-2" defaultChecked />
                  <label htmlFor="public">Public</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="friends" name="privacy" className="mr-2" />
                  <label htmlFor="friends">Friends</label>
                </div>
                <div className="flex items-center">
                  <input type="radio" id="private" name="privacy" className="mr-2" />
                  <label htmlFor="private">Private</label>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-4 rounded-lg">
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <Video className="h-12 w-12 text-gray-400" />
              </div>
              <p className="text-xs text-center mt-2 text-gray-500">Camera preview will appear here</p>
            </div>
          </div>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setLiveStreamOpen(false)}>
              Cancel
            </Button>
            <Button className="bg-red-500 hover:bg-red-600">Go Live</Button>
          </ModalFooter>
        </ModalContent>
      </AlertDialog>

      {/* Calendar Event Dialog */}
      <AlertDialog open={calendarOpen} onOpenChange={setCalendarOpen}>
        <ModalContent className="sm:max-w-md">
          <AlertDialogHeader>
            <AlertTitle>Add Event</AlertTitle>
            <AlertDescription>Create a new event and add it to your calendar</AlertDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="event-title">Event Title</label>
              <Input id="event-title" placeholder="Enter event title" />
            </div>
            <div className="space-y-2">
              <label>Event Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    {date ? format(date, "PPP") : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  {/* <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus /> */}
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="start-time">Start Time</label>
                <Input id="start-time" type="time" />
              </div>
              <div className="space-y-2">
                <label htmlFor="end-time">End Time</label>
                <Input id="end-time" type="time" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="location">Location</label>
              <Input id="location" placeholder="Add location" />
            </div>
            <div className="space-y-2">
              <label htmlFor="event-description">Description</label>
              <Textarea id="event-description" placeholder="Add details about your event" />
            </div>
          </div>
          <ModalFooter>
            <Button variant="secondary" onClick={() => setCalendarOpen(false)}>
              Cancel
            </Button>
            <Button>Create Event</Button>
          </ModalFooter>
        </ModalContent>
      </AlertDialog>

      {/* Article Dialog */}
      <AlertDialog open={articleOpen} onOpenChange={setArticleOpen}>
        <ModalContent className="sm:max-w-[800px]">
          <AlertDialogHeader>
            <AlertTitle>Create Article</AlertTitle>
            <AlertDescription>Write and publish an article to share with your audience</AlertDescription>
          </AlertDialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="article-title">Title</label>
              <Input id="article-title" placeholder="Enter article title" className="text-lg" />
            </div>
            <div className="space-y-2">
              <label htmlFor="article-subtitle">Subtitle (optional)</label>
              <Input id="article-subtitle" placeholder="Enter subtitle" />
            </div>
            <div className="space-y-2">
              <label htmlFor="article-content">Content</label>
              <div className="border rounded-md p-2">
                <div className="flex gap-2 border-b pb-2 mb-2">
                  {["B", "I", "U", "H1", "H2", "Link", "Image"].map((tool) => (
                    <Button key={tool} variant="outline" size="sm" className="h-8 px-2 text-xs">
                      {tool}
                    </Button>
                  ))}
                </div>
                <Textarea
                  id="article-content"
                  placeholder="Write your article content here..."
                  className="min-h-[300px] border-0 focus-visible:ring-0 resize-none p-0"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="article-tags">Tags</label>
              <Input id="article-tags" placeholder="Add tags separated by commas" />
            </div>
          </div>
          <ModalFooter>
            <Button variant="outline">Save Draft</Button>
            <Button>Publish Article</Button>
          </ModalFooter>
        </ModalContent>
      </AlertDialog>
    </>
  )
}