import React from 'react'
import { FaUserCircle } from "react-icons/fa";

export default function Contact({ username, lastOnline }) {
    return (
        <>
            <div className=" flex justify-start items-center gap-2 text-black py-3 px-5 hover:bg-blue-100 transition-colors dark:text-white dark:hover:bg-gray-950">
                <FaUserCircle className='text-4xl text-blue-600 dark:text-gray-300' />
                <div className=" flex flex-col ">
                    <span className=' font-bold'>{username}</span>
                    <span className=' text-xs text-zinc-500'>{lastOnline}</span>
                </div>
            </div>
        </>
    )
}
