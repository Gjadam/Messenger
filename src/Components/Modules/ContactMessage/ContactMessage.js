import React from 'react'

export default function ContactMessage(props) {
    return (
        <>
        <div className="flex justify-start items-center">

            <div className="  break-words  max-w-96 self-end rounded-e-xl rounded-bl-xl bg-zinc-600 text-white px-3 pb-6 pt-3 my-2 relative">
                <p>{props.text}</p>
                <span className=' absolute bottom-1 left-3 text-xs'>{props.date_send?.slice(11, 16)}</span>
            </div>
        </div>
        </>
    )
}
