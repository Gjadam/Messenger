import React from 'react'
import { TbExternalLink } from "react-icons/tb";
import { HiOutlineDownload } from "react-icons/hi";
import { IoMdArrowDropright } from "react-icons/io";
import LandingNavItem from '../../Components/Modules/LandingNavItem/LandingNavItem';
import { Link } from 'react-router-dom';
export default function Landing() {
    return (
        <div className=' h-svh flex md:overflow-hidden'>
            {/* Start NavBar */}
            <div className=" fixed top-0 right-0 left-0  z-50  container m-auto p-8 flex justify-between items-center ">
                <div className=" flex items-center ">
                    <LandingNavItem text={"Login"}  />
                    <LandingNavItem text={"Sign up"} />
                </div>
                <a href='' className=" hidden md:block">
                    <img src="/images/png/logo.png" alt="logo" className=' w-32' />
                </a>
                <a href='' className=" block md:hidden">
                    <img src="/images/png/landing-logo.png" alt="logo" className=' w-10' />
                </a>
            </div>
            {/* End NavBar */}
            {/* Start Main */}
            <div className=" flex justify-center items-center flex-wrap md:mt-0 mt-10 md:w-1/2 w-full h-full relative after:hidden  after:md:block after:absolute after:-right-10 after:-top-5 after:h-[90rem] after:w-32 after:rotate-6 after:bg-white after:z-10 bg-transparent before:absolute before:w-full before:h-96 before:-top-64 md:before:-top-44 before:bg-radial-gradient-left before:z-30">
                <div className="  container-fluid  z-20 text-center md:text-start md:ms-5">
                    <div className=" flex justify-center md:justify-start items-center">
                        <img src="/images/png/landing-logo.png" alt="png" />
                    </div>
                    <div className="flex justify-center flex-col">
                        <span className=' text-4xl font-bold'>ChatOnly</span>
                        <span className=' text-2xl text-gray-600'>A new era in communication</span>
                    </div>
                    <div className=" flex justify-center md:justify-start items-center flex-wrap gap-2 mt-7  ">
                        <Link to="/chat" className=' bg-sky-500 rounded-full px-4 py-1 text-white hover:text-sky-500 hover:bg-transparent transition-colors'>
                            <span className=' flex items-center'><TbExternalLink className=' mr-1' /> Open ChatOnly Web</span>
                        </Link>
                        <a href="" className=' bg-sky-100 rounded-full px-4 py-1 text-gray-700 md:text-base text-sm hover:text-sky-500 hover:bg-transparent transition-colors'>
                            <span className=' flex items-center'><HiOutlineDownload className=' mr-1' /> Download ChatOnly Desktop for PC</span>
                        </a>
                    </div>
                </div>
                <div className=" md:hidden mb-10">
                    <img src="/images/png/landing-img2.png" alt="img" className=' w-64' />
                </div>
            </div>
            <div className=" hidden md:flex justify-center items-center w-1/2 h-full bg-gray-950">
                <div className=" relative before:absolute before:w-full before:h-96 before:-top-96 before:bg-radial-gradient-right ">
                    <img src="/images/png/landing-img.png" className=' z-0' alt="img" />
                </div>
            </div>
            {/* End Main */}
            {/* Start Footer */}
            <div className=" fixed bottom-5 left-5 font-bold text-center z-50">
                <span className=' text-sm ' >
                    &copy; Created By
                    <a href="https://github.com/Gjadam" className=' mx-1 hover:text-sky-500 transition-colors'>
                        TheGjad
                    </a>
                    &
                    <a href="https://github.com/alirahmnicode" className=' mx-1 hover:text-sky-500 transition-colors'>
                        AliRahmaniCode
                    </a>
                    | 2024 ChatOnly
                </span>
            </div>
            {/* End Footer */}
        </div>
    )
}
