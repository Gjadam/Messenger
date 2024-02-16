import React from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { IoCheckmarkOutline } from "react-icons/io5";
export default function UserMessage(props) {


    return (
        <>
            <div className=" flex justify-end items-center ">

                <div className=" break-words max-w-96 min-w-4 rounded-s-xl overflow-hidden rounded-br-xl bg-blue-600 text-white text-wrap  px-3 pb-6 pt-3 my-2 relative">
                    <p>{props.text}</p>
                    {
                        props.role === "User" ? (
                            <span className=' absolute bottom-1 right-3 text-xs'>{props.date_send}</span>
                        ) : (
                            <span className=' absolute bottom-1 right-3 text-xs'>{props.date_send?.slice(11, 16)}</span>
                        )
                    }
                    {
                        props.is_seen ? (
                            <IoCheckmarkDoneOutline className=' absolute bottom-1 right-11 text-lg text-blue-200' />
                        ) : (
                            <IoCheckmarkOutline className=' absolute bottom-1 right-11 text-lg text-blue-200' />
                        )
                    }
                </div>
            </div>
        </>
    )
}
