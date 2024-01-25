import React from 'react'
import { FaUserCircle } from "react-icons/fa";
export default function NavBar() {
    return (
        <>
            <div className="  flex justify-between items-center p-5 z-30 bg-blue-600 border-b-1 border-zinc-200">
                <div className=' flex'>
                    <img src="/images/png/logo.png" class=" w-40 " alt="FlowBite Logo" />
                </div>
                <div className=" flex justify-center items-center gap-2 text-white">
                    <span>Username</span>
                    <FaUserCircle className='text-4xl' />
                </div>
            </div>
        </>
    )
}
