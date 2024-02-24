import React from 'react'
import { useParams } from 'react-router-dom'

export default function ContactMessage(props) {


    return (
        <>
            <div className="flex justify-start items-center">

                <div className="  break-words  max-w-96 self-end rounded-e-xl overflow-hidden rounded-bl-xl bg-zinc-600 text-white px-3 py-4 my-2 ">
                    <p>{props.text}</p>
                    <div className="flex items-center mt-1 gap-1">
                        {
                            props.role === 'Contact' ? (
                                <span className='text-xs'>{props.date_send}</span>
                                ) : (
                                    <span className='text-xs'>{props.date_send?.slice(11, 16)}</span>
                            )
                        }
                    </div>

                </div>
            </div>
        </>
    )
}
