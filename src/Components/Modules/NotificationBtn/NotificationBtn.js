import React from 'react'

export default function NotificationBtn({ text }) {
    return (
        <>
            <button className=' text-xs text-blue-600 relative after:absolute hover:after:opacity-100 after:opacity-0  after:h-[1px] after:w-full after:bg-blue-600 dark:after:bg-white dark:text-white after:rounded-tr-full after:-left-3 after:hover:left-0 after:bottom-1 after:transition-all border-blue-600 p-2 font-bold'>{text}</button>

        </>
    )
}
