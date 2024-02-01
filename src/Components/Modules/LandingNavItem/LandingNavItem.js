import React from 'react'
import { RiArrowDropRightLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
export default function LandingNavItem({ text, href }) {
    return (
        <>
            <Link to={href} className='group px-4 py-1 rounded-full text-gray-600 font-bold z-50 hover:bg-sky-200 hover:text-sky-600 transition-colors'>
                <span className=' flex items-center relative  '><RiArrowDropRightLine className=' absolute -left-7 opacity-0 group-hover:opacity-100 group-hover:-left-4 transition-all mr-1 text-xl text-sky-600' />{text}</span>
            </Link>
        </>
    )
}
