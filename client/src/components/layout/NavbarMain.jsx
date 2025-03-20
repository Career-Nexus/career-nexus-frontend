import React from 'react'
import { Outlet } from 'react-router-dom'
import {Help, Home, Jobs, Mentorship, RightArrow, Search, Toggle, User } from '../../icons/icon';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
} from '@chakra-ui/react'
import { useRef } from 'react';

const NavbarMain = () => {
    const Toggler = () => {
        const { isOpen, onOpen, onClose } = useDisclosure()
        const btnRef = useRef()

        return (
            <div className=''>
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
                            <img src="/images/c-nlogo.png" alt="career-nexus logo" />
                        </DrawerHeader>
                        <hr />
                        <DrawerBody>
                            <div className='flex mb-3 mt-2' >
                                <input value={'Home'} disabled className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded' />
                                <div className='ml-[-2rem] flex items-center'>
                                    <RightArrow />
                                </div>
                            </div>
                            <div className='flex mb-3'>
                                <input value={'Mentorship'} disabled className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded' />
                                <div className='ml-[-2rem] flex items-center'>
                                    <RightArrow />
                                </div>
                            </div>
                            <div className='flex mb-3'>
                                <input value={'Network'} disabled className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded' />
                                <div className='ml-[-2rem] flex items-center'>
                                    <RightArrow />
                                </div>
                            </div>
                            <div className='flex mb-3'>
                                <input value={'Job'} disabled className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded' />
                                <div className='ml-[-2rem] flex items-center'>
                                    <RightArrow />
                                </div>
                            </div>
                            <div className='flex mb-3'>
                                <input value={'Mailbox'} disabled className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded' />
                                <div className='ml-[-2rem] flex items-center'>
                                    <RightArrow />
                                </div>
                            </div>
                            <div className='flex mb-3'>
                                <input value={'Notification'} disabled className='border p-2 bg-gray-50 dark:bg-gray-50 w-full rounded' />
                                <div className='ml-[-2rem] flex items-center'>
                                    <RightArrow />
                                </div>
                            </div>
                        </DrawerBody>

                        <DrawerFooter>
                            <Button variant='outline' mr={3} onClick={onClose}>
                                Cancel
                            </Button>
                        </DrawerFooter>
                    </DrawerContent>
                </Drawer>
            </div>
        )
    }
    return (
        <nav className='w-full'>
            <div className='bg-white shadow'>
                <div className='flex items-center justify-between mx-4 md:mx-20 py-3 px-10 md:p-0'>
                    {/* Logo for small and medium screens */}
                    <div className='block md:hidden'>
                        <img src="images/c-nicon.png" alt="Career-nexus icon" className='w-16 h-auto' />
                    </div>
                    <div className='hidden md:block'>
                        <img src="/images/c-nlogo.png" alt="Career-Nexus logo" className="h-16 w-auto" />
                    </div>

                    {/* Search Box */}
                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden flex-grow mx-4 md:mx-10">
                        <div className="flex items-center pl-3">
                            <Search />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="flex-grow py-2 px-1 border-0 focus:outline-none focus:ring-0"
                        />
                    </div>
                    {/* Navigation Links for Medium Screens and Up */}
                    <div className='hidden md:flex items-center justify-center space-x-4 mx-4 md:mx-20'>
                        <div className='flex flex-col items-center'>
                            <Home className='mx-auto' />
                            <h1 className='text-xs'>Home</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Mentorship className='mx-auto' />
                            <h1 className='text-xs'>Mentorship</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Jobs className='mx-auto' />
                            <h1 className='text-xs'>Jobs & Biz</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <User className='mx-auto' />
                            <h1 className='text-xs'>About</h1>
                        </div>
                        <div className='flex flex-col items-center'>
                            <Help className='mx-auto' />
                            <h1 className='text-xs'>Help & Support</h1>
                        </div>
                    </div>
                    {/* Profile Picture */}
                    <div className='flex items-center pl-4'>
                        <img src="/images/profile.png" alt="Profile picture" className="h-10 w-10 rounded-full" />
                    </div>
                </div>
            </div>
            <Outlet />
        </nav>
    )
}

export default NavbarMain
