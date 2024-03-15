import React from 'react'

export default function FormIntroduction({title, text}) {
  return (
    <div className=" flex justify-center items-start flex-col gap-2 h-full">
    <span className=' font-bold text-4xl drop-shadow-md text-gray-50'>{title}</span>
    <span className='max-w-[30rem] text-lg text-gray-100'>{text}</span>
  </div>
  )
}
