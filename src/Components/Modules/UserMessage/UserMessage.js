import React, { useContext, useEffect } from 'react'
import { IoCheckmarkDoneOutline } from 'react-icons/io5'
import { IoCheckmarkOutline } from "react-icons/io5";
import AuthContext from '../../../context/authContext';
export default function UserMessage(props) {



    return (
        <>
            <div className=" flex justify-end items-center ">

                <div className=" flex items-center break-words max-w-96 min-w-4 rounded-s-xl overflow-hidden rounded-br-xl bg-blue-600 text-white text-wrap  px-3 py-4  my-2 ">
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
                                props.is_seen ? (
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
