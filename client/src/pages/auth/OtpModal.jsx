
import { useState, useRef, useEffect } from "react"
import {
    Heading,
    useToast,
    Container,
    Card,
    CardBody,
    Code,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Text,
    VStack,
    HStack,
    useColorModeValue,
    PinInput,
    PinInputField,
    Link,
} from "@chakra-ui/react"
import { ShieldCloseIcon } from "lucide-react"
// import { CloseIcon } from "@chakra-ui/icons"

function OTPModal({
    isOpen,
    onClose,
    onVerify,
    length = 6,
    title = "Verification Required",
    description = "Please enter the verification code sent to your device",
}) {
    const [isVerifying, setIsVerifying] = useState(false)
    const [otpValue, setOtpValue] = useState("")
    const pinInputRef = useRef(null)

    // Focus first input on open
    useEffect(() => {
        if (isOpen && pinInputRef.current) {
            setTimeout(() => {
                pinInputRef.current?.focus()
            }, 100)
        }
    }, [isOpen])

    const handleVerify = async () => {
        if (otpValue.length === length) {
            setIsVerifying(true)
            try {
                await onVerify(otpValue)
            } finally {
                setIsVerifying(false)
            }
        }
    }

    const handleClear = () => {
        setOtpValue("")
        pinInputRef.current?.focus()
    }

    const handleComplete = (value) => {
        setOtpValue(value)
    }

    const handleChange = (value) => {
        setOtpValue(value)
    }

    const borderColor = useColorModeValue("gray.200", "gray.600")
    const focusBorderColor = useColorModeValue("blue.500", "blue.300")
    const mutedTextColor = useColorModeValue("gray.600", "gray.400")
    const bgHover = useColorModeValue("gray.100", "gray.700")

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
            <ModalOverlay />
            <ModalContent borderRadius="lg">
                <ModalHeader>{title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text color={mutedTextColor} mb={6}>
                        {description}
                    </Text>

                    <VStack spacing={6}>
                        <HStack spacing={2} justify="center" w="full">
                            <PinInput
                                size="lg"
                                value={otpValue}
                                onChange={handleChange}
                                onComplete={handleComplete}
                                focusBorderColor={focusBorderColor}
                                otp
                            >
                                {Array.from({ length }).map((_, index) => (
                                    <PinInputField
                                        key={index}
                                        ref={index === 0 ? pinInputRef : undefined}
                                        borderColor={borderColor}
                                        fontSize="xl"
                                        h={14}
                                        w={12}
                                        _focus={{
                                            boxShadow: "outline",
                                            borderColor: focusBorderColor,
                                        }}
                                    />
                                ))}
                            </PinInput>
                        </HStack>

                        <Text fontSize="sm" color={mutedTextColor} textAlign="center">
                            Didn't receive a code?{" "}
                            <Link color="blue.500" _hover={{ textDecoration: "underline" }}>
                                Resend
                            </Link>
                        </Text>
                    </VStack>
                </ModalBody>

                <ModalFooter display="flex" flexDir={["column", "row"]} gap={2}>
                    <Button
                        leftIcon={<ShieldCloseIcon boxSize={3} />}
                        variant="outline"
                        onClick={handleClear}
                        mr={["0", "auto"]}
                        w={["full", "auto"]}
                    >
                        Clear
                    </Button>
                    <Button
                        colorScheme="blue"
                        onClick={handleVerify}
                        isLoading={isVerifying}
                        loadingText="Verifying"
                        isDisabled={otpValue.length !== length}
                        w={["full", "auto"]}
                    >
                        Verify
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}



export default function OtpModalDemo() {
    const [isOpen, setIsOpen] = useState(false)
    const toast = useToast()

    const handleVerify = async (otp) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // For demo purposes, we'll consider "123456" as the correct OTP
        if (otp === "123456") {
            toast({
                title: "Success!",
                description: "OTP verified successfully",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
            setIsOpen(false)
        } else {
            toast({
                title: "Invalid OTP",
                description: "Please check the code and try again",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "top",
            })
        }
    }

    return (
        <Container centerContent py={10}>
            <VStack spacing={6} align="center" w="full" maxW="md">
                <Heading size="lg">OTP Verification Demo</Heading>
                <Text color="gray.600" textAlign="center">
                    Click the button below to open the OTP verification modal
                </Text>

                <Button colorScheme="blue" size="lg" onClick={() => setIsOpen(true)}>
                    Verify with OTP
                </Button>

                <Card w="full" variant="outline">
                    <CardBody>
                        <VStack align="start" spacing={2}>
                            <Text fontWeight="medium">Demo Information:</Text>
                            <Text color="gray.600">
                                Use code <Code fontWeight="bold">123456</Code> for successful verification
                            </Text>
                        </VStack>
                    </CardBody>
                </Card>

                <OTPModal isOpen={isOpen} onClose={() => setIsOpen(false)} onVerify={handleVerify} />
            </VStack>
        </Container>
    )
}


// import { useState, useRef, useEffect } from "react"
// import { X } from "lucide-react"
// //import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"

// export default function OtpModal({
//   isOpen,
//   onClose,
//   onVerify,
//   length = 6,
//   title = "Verification Required",
//   description = "Please enter the verification code sent to your device",
// }) {
//   const [otp, setOtp] = useState(Array(length).fill(""))
//   const inputRefs = useRef([])
//   const [isVerifying, setIsVerifying] = useState(false)

//   // Initialize refs array
//   useEffect(() => {
//     inputRefs.current = inputRefs.current.slice(0, length)
//   }, [length])

//   // Focus first input on open
//   useEffect(() => {
//     if (isOpen && inputRefs.current[0]) {
//       setTimeout(() => {
//         inputRefs.current[0]?.focus()
//       }, 100)
//     }
//   }, [isOpen])

//   const handleChange = (index, value) => {
//     if (value.length > 1) {
//       // Handle paste or multiple characters
//       const chars = value.split("")
//       const newOtp = [...otp]

//       chars.forEach((char, charIndex) => {
//         const targetIndex = index + charIndex
//         if (targetIndex < length && /^[0-9]$/.test(char)) {
//           newOtp[targetIndex] = char
//         }
//       })

//       setOtp(newOtp)

//       // Focus on next empty input or last input
//       const nextEmptyIndex = newOtp.findIndex((val) => val === "")
//       if (nextEmptyIndex !== -1) {
//         inputRefs.current[nextEmptyIndex]?.focus()
//       } else {
//         inputRefs.current[length - 1]?.focus()
//       }
//     } else if (/^[0-9]$/.test(value)) {
//       // Handle single digit
//       const newOtp = [...otp]
//       newOtp[index] = value
//       setOtp(newOtp)

//       // Auto-focus next input
//       if (index < length - 1) {
//         inputRefs.current[index + 1]?.focus()
//       }
//     }
//   }

//   const handleKeyDown = (index, e) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       // Move to previous input on backspace if current is empty
//       inputRefs.current[index - 1]?.focus()
//     } else if (e.key === "ArrowLeft" && index > 0) {
//       // Move to previous input on left arrow
//       inputRefs.current[index - 1]?.focus()
//     } else if (e.key === "ArrowRight" && index < length - 1) {
//       // Move to next input on right arrow
//       inputRefs.current[index + 1]?.focus()
//     }
//   }

//   const handlePaste = (e) => {
//     e.preventDefault()
//     const pasteData = e.clipboardData.getData("text").trim()

//     if (/^[0-9]+$/.test(pasteData)) {
//       const digits = pasteData.split("").slice(0, length)
//       const newOtp = [...otp]

//       digits.forEach((digit, i) => {
//         newOtp[i] = digit
//       })

//       setOtp(newOtp)

//       // Focus on next empty input or last input
//       const nextEmptyIndex = newOtp.findIndex((val) => val === "")
//       if (nextEmptyIndex !== -1) {
//         inputRefs.current[nextEmptyIndex]?.focus()
//       } else {
//         inputRefs.current[length - 1]?.focus()
//       }
//     }
//   }

//   const handleVerify = async () => {
//     const otpString = otp.join("")
//     if (otpString.length === length) {
//       setIsVerifying(true)
//       try {
//         await onVerify(otpString)
//       } finally {
//         setIsVerifying(false)
//       }
//     }
//   }

//   const handleClear = () => {
//     setOtp(Array(length).fill(""))
//     inputRefs.current[0]?.focus()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>{title}</DialogTitle>
//           <DialogDescription>{description}</DialogDescription>
//         </DialogHeader>
//         <div className="flex justify-center my-6">
//           <div className="flex gap-2 sm:gap-3">
//             {Array.from({ length }).map((_, index) => (
//               <div key={index} className="relative">
//                 <input
//                   ref={(el) => (inputRefs.current[index] = el)}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={otp[index]}
//                   onChange={(e) => handleChange(index, e.target.value)}
//                   onKeyDown={(e) => handleKeyDown(index, e)}
//                   onPaste={handlePaste}
//                   className="w-10 h-12 sm:w-12 sm:h-14 text-center text-xl font-semibold border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//                   aria-label={`Digit ${index + 1} of verification code`}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//         <div className="text-center text-sm text-muted-foreground">
//           Didn't receive a code? <button className="text-primary hover:underline">Resend</button>
//         </div>
//         <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
//           <Button type="button" variant="outline" onClick={handleClear} className="sm:mr-auto">
//             <X className="mr-2 h-4 w-4" />
//             Clear
//           </Button>
//           <Button type="button" onClick={handleVerify} disabled={otp.join("").length !== length || isVerifying}>
//             {isVerifying ? "Verifying..." : "Verify"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }


// import { useState } from "react"
// //import { Button } from "@/components/ui/button"
// import OtpModal from "./otp-modal"
// import { useToast } from "@/hooks/use-toast"
// import { Button } from "flowbite-react"

// export default function OtpModalDemo() {
//   const [isOpen, setIsOpen] = useState(false)
//   const { toast } = useToast()

//   const handleVerify = async (otp) => {
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     // For demo purposes, we'll consider "123456" as the correct OTP
//     if (otp === "123456") {
//       toast({
//         title: "Success!",
//         description: "OTP verified successfully",
//         variant: "default",
//       })
//       setIsOpen(false)
//     } else {
//       toast({
//         title: "Invalid OTP",
//         description: "Please check the code and try again",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
//       <h1 className="text-2xl font-bold">OTP Verification Demo</h1>
//       <p className="text-muted-foreground mb-4">Click the button below to open the OTP verification modal</p>

//       <Button onClick={() => setIsOpen(true)}>Verify with OTP</Button>

//       <div className="mt-4 p-4 bg-muted rounded-md">
//         <p className="text-sm font-medium">Demo Information:</p>
//         <p className="text-sm text-muted-foreground">
//           Use code <span className="font-mono font-bold">123456</span> for successful verification
//         </p>
//       </div>

//       <OtpModal isOpen={isOpen} onClose={() => setIsOpen(false)} onVerify={handleVerify} />
//     </div>
//   )
// }
