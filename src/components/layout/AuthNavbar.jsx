
import React, { useRef } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { Help, Home, Jobs, Mentorship, Network, RightArrow, Toggle, User } from '../../icons/icon'
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react'

const AuthNavbar = () => {
  const Toggler = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
      <div>
        <Button ref={btnRef} colorScheme='whiteAlpha' onClick={onOpen}>
          <Toggle />
        </Button>
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>
              <img src="/images/c-nicon2.png" alt="career-nexus logo" className='h-12 w-auto' />
            </DrawerHeader>
            <hr />
            <DrawerBody>
              {['Home', 'Mentorship', 'Network', 'Jobs'].map((item, i) => (
                <div key={i} className='flex mb-3 mt-2' onClick={handleMenuClick}>
                  <input
                    value={item}
                    disabled
                    className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded'
                  />
                  <div className='ml-[-2rem] flex items-center'>
                    <RightArrow />
                  </div>
                </div>
              ))}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </div>
    )
  }

  // Modal control for login prompt
  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = useDisclosure()

  const handleMenuClick = () => {
    // Here you can later check if user is logged in
    // if (!user) openModal()
    openModal()
  }

  return (
    <nav className='sticky top-0 z-50 bg-white shadow'>
      <div className='bg-white shadow flex items-center justify-between'>
        {/* Logo Section */}
        <div className='ml-10 md:ml-20 pb-2 items-center hidden md:block '>
          <img src="/images/cnlogonew.png" alt="Career-Nexus logo" className="h-16 w-auto" />
        </div>
        <div className='ml-10 md:ml-20 pb-2 items-center block md:hidden'>
          <img src="/images/c-nicon2.png" alt="Career-Nexus logo" className="h-12 w-auto" />
        </div>

        {/* Drawer for mobile */}
        <div className='visible md:invisible ml-auto'>
          <Toggler />
        </div>

        {/* Navbar menu items */}
        <div className='gap-10 ml-auto hidden md:flex space-x-4 mr-10'>
          <div onClick={handleMenuClick} className='flex flex-col items-center cursor-pointer'>
            <Home />
            <h1>Home</h1>
          </div>
          <div onClick={handleMenuClick} className='flex flex-col items-center cursor-pointer'>
            <Mentorship />
            <h1>Mentorship</h1>
          </div>
          <div onClick={handleMenuClick} className='flex flex-col items-center cursor-pointer'>
            <Network />
            <h1>Network</h1>
          </div>
          <div onClick={handleMenuClick} className='flex flex-col items-center cursor-pointer'>
            <Jobs />
            <h1>Jobs</h1>
          </div>
        </div>
      </div>

      {/* Modal for login prompt */}
      <Modal isOpen={isModalOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login Required</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p className="text-gray-700">
              Login to enjoy this feature and access all Career-Nexus tools.
            </p>
          </ModalBody>
          <ModalFooter>
            <Link
              to="/login"
              className="bg-[#5DA05D] text-white px-4 py-2 rounded hover:bg-[#5DA05D]"
              onClick={closeModal}
            >
              Go to Login
            </Link>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Outlet />
    </nav>
  )
}

export default AuthNavbar

