import React, { useContext, useEffect, useState } from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { IoCheckmarkOutline } from "react-icons/io5";
import { useParams } from 'react-router-dom';
export default function UserMessage(props) {

    const { chatID } = useParams()
    const [isSeen, setIsSeen] = useState(false)
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    // Get Seen message information from server
    useEffect(() => {
        if (chatID) {
            fetch(`https://chattak-alirh.koyeb.app/chats/messages/seen/?chat_id=${chatID}`, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${localStorageData.token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setIsSeen(data)
                })
        }
    }, [chatID])

    
    return (
        <>
            <div className=" flex justify-end items-center ">

                <div className=" flex items-center break-words max-w-96 min-w-4 rounded-s-2xl overflow-hidden rounded-tr-2xl bg-blue-600 text-white text-wrap  px-3 py-4  my-2 ">
                    <p>{props.text}
                        <div className="flex items-center mt-1 gap-1">

                            {
                                props.role === "User" ? (
                                    <span className='  text-xs'>{props.date_send}</span>
                                ) : (
                                    <span className='  text-xs'>{props.date_send?.slice(11, 16)}</span>
                                )
                            }
                            {
                                isSeen ? (
                                    <IoCheckmarkDoneOutline className='  text-lg text-blue-100' />
                                ) : (
                                    <IoCheckmarkOutline className='  text-lg text-blue-100' />
                                )
                            }
                        </div>
                    </p>
                </div>
            </div>
        </>
    )
}
