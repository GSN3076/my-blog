import React, { useState } from 'react'
import Link from "next/link"
import Modal from 'react-modal';
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router"
import { clearUser } from '../redux/actions/userAction';
import Image from "next/image"
import { removeFromfollowing } from '../redux/actions/followingActions';

export default function CustomHeader() {
    const [menuVisible, setmenuVisible] = useState(false);
    const userReducer = useSelector(state => state.userReducer)
    const { user } = userReducer
    const router = useRouter()
    const dispatch = useDispatch()
    const variants = {
        hidden: { x: 0 },
        visible: { x: -8 },
    }
    const logout = () => {
        dispatch(clearUser(userReducer))
    }

    return (
        <div className="shadow-md sticky top-0 z-10  ">
            <header className="flex flex-row justify-between container mx-auto  bg-white">
                <div className="p-4">
                    <Link href="/">
                        <a>
                            <Image src={"/assets/images/logo.png"} width={100} height={30} objectFit="contain" />
                        </a>
                    </Link>
                </div>
                <nav className="flex flex-row px-2">

                    <Link href="/notifications">
                        <a className="p-2 px-4 pt-4 hover:bg-green-500 hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                            </svg>
                        </a>
                    </Link>
                    <a onClick={() => { setmenuVisible(true) }} className="p-2 px-4 pt-4 hover:bg-green-500 hover:text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 7a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 13a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        </svg>
                    </a>
                </nav>
                {userReducer ? null : <div className="hidden md:block">
                    <button className="bg-green-600 rounded-full p-3 mt-2  font-bold text-white">Login</button>
                </div>}
            </header>
            {
                menuVisible ?
                    <AnimatePresence >
                        <Modal
                            isOpen={menuVisible}
                            // onAfterOpen={afterOpenModal}
                            onRequestClose={() => setmenuVisible(false)}
                            // style={customStyles}
                            className="absolute right-0 top-0 bottom-0 w-1/2 focus:outline-none"
                            contentLabel="Menu" >
                            <motion.div
                                layout
                                initial="hidden"
                                animate="visible"
                                variants={variants}
                                className="absolute right-0 top-0 bottom-0 bg-white border-l-2 border-gray-200 w-full focus:outline-none">

                                {user ?
                                    <div className="p-2 mt-20 ">
                                        <Link href="/">
                                            <a className="font-bold p-3 flex hover:text-green-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                {user.username}
                                            </a>
                                        </Link>
                                        <Link href="/settings">
                                            <a className="font-bold p-3 flex hover:text-green-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                Settings
                                            </a>
                                        </Link>
                                        <Link href="/account">
                                            <a className="font-bold p-3 flex hover:text-green-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                Account
                                            </a>
                                        </Link>
                                        <Link href="/create">
                                            <a onClick={logout} className="font-bold p-3 flex hover:text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                                New Article
                                            </a>
                                        </Link>
                                        
                                        <Link href="/new-member">
                                            <a onClick={logout} className="font-bold p-3 flex hover:text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                                Become a Writer
                                            </a>
                                        </Link>

                                        <Link href="/">
                                            <a onClick={logout} className="font-bold p-3 flex hover:text-green-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                </svg>
                                                Logout
                                            </a>
                                        </Link>
                                        
                                        <Link href="/policy">
                                            <a className="font-bold p-3 flex hover:text-green-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                                </svg>
                                                Policy
                                            </a>
                                        </Link>
                                    </div>
                                    :
                                   
                                    <div className="p-2 mt-20 ">
                                    
                                    <Link href="/create">
                                        <a onClick={logout} className="font-bold p-3 flex hover:text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                            New Article
                                        </a>
                                    </Link>
                                    
                                    <Link href="/new-member">
                                        <a onClick={logout} className="font-bold p-3 flex hover:text-green-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                            Become a Writer
                                        </a>
                                    </Link>

                                    <Link href="/login">
                                        <a onClick={logout} className="font-bold p-3 flex hover:text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Login
                                        </a>
                                    </Link>
                                    
                                    <Link href="/policy">
                                        <a className="font-bold p-3 flex hover:text-green-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                            </svg>
                                            Policy
                                        </a>
                                    </Link>
                                </div>}
                            </motion.div>
                        </Modal>
                    </AnimatePresence>
                    : null
            }
        </div>
    )
}


