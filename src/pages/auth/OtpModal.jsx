
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
        <Container centerContent maxW="container.sm">
            <VStack spacing={6} align="center" w="full" maxW="md">
                {/* <Heading size="lg">OTP Verification Demo</Heading>
                <Text color="gray.600" textAlign="center">
                    Click the button below to open the OTP verification modal
                </Text> */}

                <Button colorScheme="blue" size="sm" onClick={() => setIsOpen(true)}>
                    Verify with OTP
                </Button>

                {/* <Card w="full" variant="outline">
                    <CardBody>
                        <VStack align="start" spacing={2}>
                            <Text fontWeight="medium">Demo Information:</Text>
                            <Text color="gray.600">
                                Use code <Code fontWeight="bold">123456</Code> for successful verification
                            </Text>
                        </VStack>
                    </CardBody>
                </Card> */}

                <OTPModal isOpen={isOpen} onClose={() => setIsOpen(false)} onVerify={handleVerify} />
            </VStack>
        </Container>
    )
}
