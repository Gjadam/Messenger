import React from 'react'
import NavBar from '../../Components/Modules/NavBar/NavBar'
import Contact from '../../Components/Modules/Contact/Contact'
import { FaUserCircle } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
export default function Index() {
    return (
        <>
            <NavBar />
            <div className=" flex h-[91.6vh] ">
                <form className=" w-96 bg-white border-r-1 border-zinc-200 ">
                    <input type="search" placeholder='Search' className=' w-full border-b-1 outline-none px-5 py-6' />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                    <Contact />
                </form>
                <div className=" flex justify-between  items-start flex-col  w-full  bg-contain bg-bg-chat relative">
                    <div className=" flex items-center   w-full p-3 z-10 bg-white">
                        <FaUserCircle className='text-5xl text-blue-600' />
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
                    <div className=" flex flex-col  w-full z-0 overflow-auto px-3">
                        {/* User Chats */}
                        <div className=" max-w-96 rounded-e-xl rounded-bl-3xl bg-blue-600 text-white  px-3 pb-6 pt-3 my-2 relative">
                            <span className=' text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi error facilis quam eos aspernatur impedit beatae nam iusto? Commodi enim libero veritatis ducimus quis repudiandae expedita nemo. Voluptatem, vitae illo.</span>
                            <span className=' absolute bottom-1 right-3 text-xs'>12:11</span>
                        </div>
                        <div className=" max-w-96 rounded-e-xl rounded-bl-3xl bg-blue-600 text-white  px-3 pb-6 pt-3 my-2 relative">
                            <span className=' text-wrap'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi error facilis quam eos aspernatur impedit beatae nam iusto? Commodi enim libero veritatis ducimus quis repudiandae expedita nemo. Voluptatem, vitae illo.</span>
                            <span className=' absolute bottom-1 right-3 text-xs'>12:11</span>
                        </div>
                        {/* Contact Chats  */}
                        <div className=" self-end max-w-96 rounded-s-xl rounded-br-3xl bg-gray-600 text-white px-3 pb-6 pt-3 my-2 relative">
                            <span>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem nihil doloremque dolorum quisquam inventore. Corrupti quia debitis reiciendis nostrum earum odit esse, aliquid doloribus modi officiis quo nemo et eaque.</span>
                            <span className=' absolute bottom-1 left-3 text-xs'>12:11</span>
                            <IoCheckmarkDoneOutline className=' absolute bottom-1 left-11 text-lg text-blue-400' />
                        </div>
                    </div>
                    <div className=" flex justify-between items-center w-full ">
                        <input type="text" placeholder='Message' className='  w-full h-16 px-3 outline-none border-t-1 border-zinc-200 bg-white ' />
                        <button className='absolute right-5 '>
                            <RiSendPlaneFill className='  text-blue-600 text-3xl' />
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
