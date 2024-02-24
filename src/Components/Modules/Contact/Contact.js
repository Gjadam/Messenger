import React, { useContext, useEffect, useState } from 'react'
import { PiUserCircleFill } from "react-icons/pi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdDataSaverOn } from "react-icons/md";
import Swal from 'sweetalert2';
import { NavLink, useParams } from 'react-router-dom';
import { host, webSocketProtocol } from '../../../WebSockekConfig/WebSockekConfig';
import AuthContext from '../../../context/authContext';

export default function Contact({ chatID, userID, username, lastOnline, type }) {

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const authContext = useContext(AuthContext)

    const addToContact = () => {
        fetch(`https://chattak-alirh.koyeb.app/users/contacts/${userID}/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${localStorageData.token}`
            }
        })
            .then(res => {
                if (res.ok) {
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Contact added successfully"
                    })
                }
            })
    }








    return (
        <>
            <NavLink to={`/chat/${userID}${typeof chatID === "number" ? `/${chatID}` : ''}`} className={(Link) => Link.isActive && ' block bg-blue-400 text-white dark:bg-zinc-700'} >
                <div className="  hover:bg-blue-300 dark:hover:bg-zinc-500 hover:text-white transition-colors dark:text-white ">
                    <div className=" flex justify-between items-center w-full py-3 px-5 border-b-1 dark:border-zinc-950">

                        <div className=" flex justify-start items-center gap-2">
                            <PiUserCircleFill className='text-4xl text-blue-700 dark:text-gray-300' />
                            <div className=" flex flex-col ">
                                <span className=' select-none font-bold'>{username.slice(0, 15)}{username.length > 15 && "..."}</span>
                            </div>
                        </div>
                        {
                            type === 'search' &&
                            <div className="" onClick={addToContact}>
                                <button className=' p-0.5 text-blue-600 border-2 border-blue-600 rounded-full  hover:bg-blue-600 hover:text-white  transition-colors' ><AiOutlineUserAdd className=' text-2xl' /></button>
                            </div>
                        }
                    </div>
                </div>
                
            </NavLink>
        </>
    )
}
