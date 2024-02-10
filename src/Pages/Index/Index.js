import React, { useContext, useEffect, useState } from 'react'
import NavBarChat from '../../Components/Modules/NavBarChat/NavBarChat'
import { PiUserCircleFill } from "react-icons/pi";
import { IoMdSend } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { RiMenuUnfoldLine } from "react-icons/ri";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { RiChatOffLine } from "react-icons/ri";
import SideBar from '../../Components/Modules/SideBar/SideBar';
import { useParams } from 'react-router-dom';

export default function Index() {

    const [contactDatas, setContactDatas] = useState([])
    const { chatID } = useParams()


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

    // Get Contact information from server
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("user"))
        fetch(`https://chattak-alirh.koyeb.app/users/get-by-id/${chatID}/`, {
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setContactDatas(data)
            })
    }, [chatID])


    return (
        <>
            <NavBarChat />
            <div className=" flex min-h-screen h-full  ">
                {/* Start SideBar */}
                <form className=" w-96 md:block hidden overflow-auto bg-white dark:bg-zinc-900 " onSubmit={(e) => e.preventDefault()}>
                    <SideBar />
                </form>
                {/* End SideBar */}
                {/* Start SideBar For Mobile */}
                <form className="side-bar w-0 opacity-0 invisible md:invisible overflow-auto fixed left-0 bottom-0 top-0 z-40 bg-white  transition-all dark:bg-zinc-900" onSubmit={(e) => e.preventDefault()}>
                    <div className=" flex justify-between items-center p-2  bg-blue-600 dark:bg-zinc-950">
                        <img src="/images/png/landing-logo.png" class=" w-8 " alt="FlowBite Logo" />
                        <IoClose className='text-2xl text-white hover:text-red-700 transition-colors cursor-pointer' onClick={closeSideBar} />
                    </div>
                    <SideBar />
                </form>
                {/* End SideBar For Mobile */}
                <div className={` flex ${contactDatas.id ? 'justify-between' : 'justify-start'} items-start flex-col  w-full  bg-contain bg-zinc-50 dark:bg-zinc-950 relative`}>
                    {/* Start User Information */}
                    <div className={` flex ${contactDatas.id ? 'justify-between' : 'justify-end'}   items-center   w-full  z-10 bg-white dark:bg-zinc-900 dark:text-white`}>
                        {
                            contactDatas.id &&
                            <div className=" flex items-center px-3 py-1">
                                <PiUserCircleFill className='text-5xl text-blue-600 dark:text-zinc-300' />
                                <div className=" flex flex-col ms-2 gap-1">
                                    <span className=' font-bold'>{contactDatas.username}</span>
                                    <div className=" flex justify-start items-center">
                                        <span class="relative flex h-2 w-2 mr-1">
                                            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                                        </span>
                                        <span className=' text-xs'>{contactDatas.last_online}</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="md:hidden p-3" onClick={openSideBar}>
                            <RiMenuUnfoldLine className=' text-2xl text-blue-600 hover:text-blue-500 dark:text-zinc-500 dark:hover:text-zinc-600  transition-colors cursor-pointer' />
                        </div>
                    </div>
                    {/* End User Information */}
                    {
                        contactDatas.id ? (
                            <>
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
                                <div className=" flex justify-between items-center w-full mb-2 ">
                                    <input type="text" placeholder='Message' className='  w-full p-4 h-full rounded-full mx-2  outline-none bg-white dark:bg-zinc-900 dark:text-white' />
                                    <button className='absolute right-6 bottom-4.5 '>
                                        <IoMdSend className='  text-blue-600 text-2xl' />
                                    </button>
                                </div>
                                {/* End Input Chat */}

                            </>
                        ) : (
                            <div className=" flex justify-center items-center flex-col h-full w-full text-center bg-zinc-100 dark:bg-zinc-950 gap-2 p-5">
                                <RiChatOffLine className=' text-zinc-700  text-6xl dark:text-zinc-300' />
                                <span className=' text-zinc-700 text-xl font-bold text-center dark:text-zinc-300'>No chat messages</span>
                                <span className='text-zinc-500 text-sm dark:text-zinc-400  leading-6'>Start conversing to see your messages here.</span>
                            </div>
                        )
                    }
                </div>
            </div >
        </>
    )
}
