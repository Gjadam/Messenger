import React from 'react'

export default function HeaderSideBar({ icon, text }) {
    return (
        <>
            <div className=" flex justify-start items-center text-blue-600  p-3 border-b-1 dark:border-zinc-950">
                <span className=' flex items-center font-bold'>{icon}{text}</span>
            </div>
        </>
    )
}
