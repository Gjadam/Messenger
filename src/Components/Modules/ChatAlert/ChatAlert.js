import React from 'react'
import { RiChatOffLine } from "react-icons/ri";

export default function ChatAlert() {
    return (
        <>
            <div className=" flex justify-center items-center flex-col h-full w-full text-center bg-zinc-100 dark:bg-zinc-950 gap-2 p-5">
                <RiChatOffLine className=' text-zinc-700  text-6xl dark:text-zinc-300' />
                <span className=' text-zinc-700 text-xl font-bold text-center dark:text-zinc-300'>No chat messages</span>
                <span className='text-zinc-500 text-sm dark:text-zinc-400  leading-6'>Start conversing to see your messages here.</span>
            </div>
        </>
    )
}
