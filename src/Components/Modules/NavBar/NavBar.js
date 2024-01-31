import React from 'react'
import { FaUserCircle } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
export default function NavBar() {
    return (
        <>
            <div className="  flex justify-between items-center p-2 md:p-5 z-30 bg-blue-600 border-b-1 border-zinc-200">
                <div className=' flex'>
                    <img src="/images/png/logo.png" class=" w-32 " alt="FlowBite Logo" />
                </div>
                <div className="group relative">
                    <FiMoreVertical className='  text-white text-xl cursor-pointer ' />
                    <div className=" opacity-0 hidden group-hover:block  group-hover:opacity-100 absolute right-2 top-5 w-36  rounded-md z-50  shadow bg-white overflow-hidden">
                        <div className="flex justify-end items-center  gap-2 p-3 font-bold bg-gray-50 border-b-1">
                            <span>Options</span>
                            <IoMdSettings className='text-2xl text-gray-600' />
                        </div>
                        <div className="flex justify-end items-center  gap-2 p-3">
                            <span className=' text-sm'>Username</span>
                            <FaUserCircle className='text-xl text-blue-600' />
                        </div>
                        <div className="flex justify-end items-center  gap-2 p-3 group  cursor-pointer hover:bg-red-200 transition-colors">
                            <span className=' group-hover:text-red-600 text-sm'>Logout</span>
                            <RiLogoutCircleRLine className='text-xl text-red-600' />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
