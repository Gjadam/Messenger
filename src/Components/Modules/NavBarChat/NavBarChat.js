import React, { useEffect } from 'react'
import { LuUser2 } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { Link } from 'react-router-dom';
export default function NavBar() {

    // Dark Mode Logic
    useEffect(() => {
        window.onload = function () {
            const htmlTag = document.querySelector('html')
            const darkModeCheck = document.querySelector('.darkModeCheck')
            const getLocalStorageTheme = localStorage.getItem("theme")
            if (getLocalStorageTheme == "dark") {
                htmlTag.classList.add("dark")
                darkModeCheck.checked = true
            } else {
                htmlTag.classList.remove("dark")
                darkModeCheck.checked = false
            }
        }
    }, [])

    const darkModeHandler = (e) => {
        const htmlTag = document.querySelector('html')
        if (e.target.checked) {
            htmlTag.classList.add("dark")
            localStorage.setItem('theme', 'dark')
        } else {
            htmlTag.classList.remove("dark")
            localStorage.setItem('theme', 'light')
        }
    }

    return (
        <>
            <div className="  flex justify-between items-center p-2 md:p-5 z-30 bg-blue-600 border-b-1 border-zinc-200 dark: dark:bg-zinc-950 dark:border-zinc-900">
                <Link to={'/'} className=' flex'>
                    <img src="/images/png/logo.png" class=" w-32 " alt="FlowBite Logo" />
                </Link>
                <div className="group relative ">
                    <FiMoreVertical className='  text-white text-xl cursor-pointer ' />
                    <div className=" opacity-0 hidden group-hover:block  group-hover:opacity-100 absolute right-2 top-5 w-44  rounded-md z-50  shadow bg-white overflow-hidden  dark:bg-zinc-950 dark:text-white">
                        <div className="flex justify-end items-center  gap-2 p-3 font-bold bg-gray-50 border-b-1  dark:bg-zinc-900 dark:text-white dark:border-zinc-950">
                            <span>Options</span>
                            <IoMdSettings className='text-xl text-gray-600' />
                        </div>
                        <div className="flex justify-end items-center  gap-2 p-3">
                            <span className=' text-sm'>Username</span>
                            <LuUser2 className='text-xl text-blue-600' />
                        </div>
                        <div className="flex justify-end items-center  gap-2 p-3 group  cursor-pointer hover:bg-red-100 transition-colors">
                            <span className=' group-hover:text-red-600 text-sm'>Logout</span>
                            <RiLogoutCircleRLine className='text-xl text-red-600' />
                        </div>
                        <div className="flex justify-center items-center  py-3 border-t-1 dark:border-zinc-900 dark:hover:bg-zinc-900 transition-colors cursor-pointer">
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" value="" class="darkModeCheck sr-only peer" onChange={(e) => darkModeHandler(e)} />
                                <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span class="ms-3 text-sm font-medium text-gray-900 dark:text-zinc-300">Dark Mode</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
