import React, { useContext, useEffect, useState } from 'react'
import { LuUser2 } from "react-icons/lu";
import { FiMoreVertical } from "react-icons/fi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import { IoIosMoon } from "react-icons/io";
import { GrSun } from "react-icons/gr";
import { CiBatteryCharging } from "react-icons/ci";
import { CiBatteryFull } from "react-icons/ci";
import AuthContext from '../../../context/authContext';
export default function NavBar() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const [isDark, setIsDark] = useState(false)
    const [batteryLevel, setBatteryLevel] = useState(0)
    const [batteryCharging, satBatteryCharging] = useState(false)


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
            setIsDark(true)
        } else {
            htmlTag.classList.remove("dark")
            localStorage.setItem('theme', 'light')
            setIsDark(false)
        }
    }

    const logOut = () => {
        authContext.logout()
        navigate('/')
    }

    useEffect(() => {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function (battery) {
                const level = battery.level;
                const charging = battery.charging;
                setBatteryLevel(level)
                satBatteryCharging(charging)

            });
        }
    }, [batteryLevel, batteryCharging])



    return (
        <>
            <div className=" flex justify-between items-center p-2 z-30 bg-zinc-100 dark:dark:bg-zinc-950">
                <Link to={'/'} className=' hidden items-center md:flex'>
                    <img src="/images/png/landing-logo.png" class=" w-8 " alt="FlowBite Logo" />
                    <span className=' font-bold text-zinc-950 dark:text-blue-600 '>ChatOnly</span>
                </Link>
                <label htmlFor="theme" className=' -order-1'>
                    <div className=' rounded-full p-2 cursor-pointer hover:bg-blue-600 hover:text-zinc-100  dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 border-zinc-900  transition-colors'>
                        {
                            isDark ? (
                                <IoIosMoon className=' text-2xl' />
                            ) : (
                                <GrSun className=' text-2xl' />
                            )
                        }
                    </div>
                    <input type="checkbox" id='theme' className='darkModeCheck hidden' onChange={(e) => darkModeHandler(e)} />
                </label>
                <div className="flex items-center gap-5">
                    <div className=" relative flex justify-center items-center flex-col  text-blue-600 dark:text-zinc-100">
                        {
                            batteryCharging ? (
                                <>
                                <CiBatteryCharging className=' text-2xl ' />
                                <span className=' absolute -left-1 top-[1.1rem] text-[0.5rem]  font-bold'>Charging</span>
                                </>
                            ) : (
                                <>
                                <CiBatteryFull className=' text-2xl ' />
                                <span className=' absolute  top-[1.1rem] text-[0.5rem]  font-bold'>{+batteryLevel * 100}%</span>
                                </>
                            )
                        }
                    </div>
                    <div className="group relative  ">
                        <div className=" p-2 rounded-full hover:bg-blue-600 hover:text-zinc-100  dark:text-zinc-100 dark:hover:bg-zinc-100 dark:hover:text-zinc-900 transition-colors ">
                            <FiMoreVertical className=' text-xl cursor-pointer ' />
                        </div>
                        <div className=" opacity-0 hidden group-hover:block  group-hover:opacity-100 absolute right-2 top-8 w-44  rounded-md z-50  shadow bg-white overflow-hidden  dark:bg-zinc-950 dark:text-white">
                            <div className="flex justify-end items-center  gap-2 p-3 font-bold bg-gray-50 border-b-1  dark:bg-zinc-900 dark:text-white dark:border-zinc-950">
                                <span>Options</span>
                                <IoMdSettings className='text-xl text-gray-600' />
                            </div>
                            <div className="flex justify-end items-center  gap-2 p-3">
                                <span className=' text-sm'>{authContext.userInfos.username}</span>
                                <LuUser2 className='text-xl text-blue-600' />
                            </div>
                            <div className="flex justify-end items-center  gap-2 p-3 group  cursor-pointer hover:bg-red-100 transition-colors" onClick={logOut}>
                                <span className=' group-hover:text-red-600 text-sm'>Logout</span>
                                <RiLogoutCircleRLine className='text-xl text-red-600' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
