import React from 'react'
import { FaUserCircle } from "react-icons/fa";

export default function Contact() {
    return (
        <>
            <div className=" flex justify-start items-center gap-2 text-black p-5 border-b-1 border-zinc-200 hover:bg-blue-100 transition-colors">
                <FaUserCircle className='text-3xl text-blue-600' />
                <span className=' font-bold'>username</span>
            </div>
        </>
    )
}
