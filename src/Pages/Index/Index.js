import React, { useContext } from 'react'
import NavBarChat from '../../Components/Modules/NavBarChat/NavBarChat'
import Contact from '../../Components/Modules/Contact/Contact'
import { FaUserCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { FaBarsStaggered } from "react-icons/fa6";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import AuthContext from '../../context/authContext';
import SideBar from '../../Components/Modules/SideBar/SideBar';

export default function Index() {

    const authContext = useContext(AuthContext)

    // Sidebar opening classes
    const openSideBar = () => {
        const sideBar = document.querySelector(".side-bar")
        sideBar.classList.remove("invisible")
        sideBar.classList.remove("opacity-0")
        sideBar.classList.remove("w-0")
        sideBar.classList.add("visible")
        sideBar.classList.add("opacity-100")
        sideBar.classList.add("w-full")
    }

    // Sidebar closing classes
    const closeSideBar = () => {
        const sideBar = document.querySelector(".side-bar")
        sideBar.classList.add("invisible")
        sideBar.classList.add("opacity-0")
        sideBar.classList.add("w-0")
        sideBar.classList.remove("visible")
        sideBar.classList.remove("opacity-100")
        sideBar.classList.remove("w-full")
    }

    return (
        <>
            <NavBarChat />
            <div className=" flex h-svh ">
                {/* Start SideBar */}
                <form className=" w-96 md:block hidden overflow-auto bg-white border-r-1 border-zinc-200  dark:bg-zinc-900 dark:border-zinc-950" onSubmit={(e) => e.preventDefault()}>
                    <SideBar />
                </form>
                {/* End SideBar */}
                {/* Start SideBar For Mobile */}
                <form className="side-bar w-0 opacity-0 invisible md:invisible overflow-auto fixed left-0 bottom-0 top-0 z-40 bg-white  transition-all dark:bg-zinc-900" onSubmit={(e) => e.preventDefault()}>
                    <div className=" flex justify-between items-center p-2  bg-blue-600 dark:bg-zinc-950">
                        <img src="/images/png/logo.png" class=" w-32 " alt="FlowBite Logo" />
                        <IoClose className='text-4xl text-white hover:text-red-700 transition-colors cursor-pointer' onClick={closeSideBar} />
                    </div>
                    <SideBar />
                </form>
                {/* End SideBar For Mobile */}
                <div className=" flex justify-between  items-start flex-col  w-full  bg-contain bg-zinc-100 dark:bg-zinc-950 relative">
                    {/* Start User Information */}
                    <div className=" flex  justify-between items-center   w-full p-3 z-10 bg-white dark:bg-zinc-900 dark:text-white">
                        <div className=" flex items-center">
                            <FaUserCircle className='text-5xl text-blue-600 dark:text-zinc-300' />
                            <div className=" flex flex-col ms-2">
                                <span className=' font-bold'>username</span>
                                <div className=" flex justify-start items-center">
                                    <span class="relative flex h-2 w-2 mr-1">
                                        <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                        <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                    </span>
                                    <span className=' text-xs'>online</span>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden" onClick={openSideBar}>
                            <FaBarsStaggered className=' text-2xl text-blue-600 cursor-pointer' />
                        </div>
                    </div>
                    {/* End User Information */}
                    {/* Start Chat */}
                    <div className=" flex flex-col  w-full z-0 overflow-auto px-3">
                        {/* User Chats */}
                        <div className=" max-w-96 rounded-e-xl rounded-bl-3xl bg-blue-600 text-white  px-3 pb-6 pt-3 my-2 relative">
                            <span className=' text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi error facilis quam eos aspernatur impedit beatae nam iusto? Commodi enim libero veritatis ducimus quis repudiandae expedita nemo. Voluptatem, vitae illo.</span>
                            <span className=' absolute bottom-1 right-3 text-xs'>12:11</span>
                            <IoCheckmarkDoneOutline className=' absolute bottom-1 right-11 text-lg text-blue-200' />
                        </div>
                        <div className=" max-w-96 rounded-e-xl rounded-bl-3xl bg-blue-600 text-white  px-3 pb-6 pt-3 my-2 relative">
                            <span className=' text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi error facilis quam eos aspernatur impedit beatae nam iusto? Commodi enim libero veritatis ducimus quis repudiandae expedita nemo. Voluptatem, vitae illo.</span>
                            <span className=' absolute bottom-1 right-3 text-xs'>12:11</span>
                            <IoCheckmarkDoneOutline className=' absolute bottom-1 right-11 text-lg text-blue-200' />
                        </div>
                        {/* Contact Chats  */}
                        <div className=" self-end max-w-96 rounded-s-xl rounded-br-3xl bg-zinc-600 text-white px-3 pb-6 pt-3 my-2 relative">
                            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem nihil doloremque dolorum quisquam inventore. Corrupti quia debitis reiciendis nostrum earum odit esse, aliquid doloribus modi officiis quo nemo et eaque.</span>
                            <span className=' absolute bottom-1 left-3 text-xs'>12:11</span>

                        </div>
                    </div>
                    {/* End Chat */}
                    {/* Start Input Chat */}
                    <div className=" flex justify-between items-center w-full ">
                        <input type="text" placeholder='Message' className='  w-full p-4 h-full  outline-none border-t-1 border-b-0 border-zinc-200 bg-white dark:bg-zinc-900 dark:border-zinc-950 dark:text-white' />
                        <button className='absolute right-3 bottom-3 '>
                            <RiSendPlaneFill className='  text-blue-600 text-2xl' />
                        </button>
                    </div>
                    {/* End Input Chat */}
                </div>
            </div>
        </>
    )
}
