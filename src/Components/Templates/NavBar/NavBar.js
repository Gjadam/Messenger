import React, { useContext } from 'react'
import LandingNavItem from '../../Modules/LandingNavItem/LandingNavItem'
import AuthContext from '../../../context/authContext'
import { MdLogin } from 'react-icons/md'
import { BiSolidPencil } from "react-icons/bi";
import { TbExternalLink } from 'react-icons/tb';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { Link } from 'react-router-dom';
export default function NavBar() {

  const authContext = useContext(AuthContext)



  return (
    <div className=" fixed top-0 right-0 left-0  z-50  container m-auto p-8 flex justify-between items-center ">
      <div className=" flex items-center text-sm md:text-base ">
        {
          authContext.isLoggedIn ? (
            <>
              <LandingNavItem text={"Open Chat"} icon={<TbExternalLink className=' mr-1 ' />} href={"/chat"} />
              <LandingNavItem text={"Logout"} icon={<RiLogoutCircleRLine className=' mr-1 ' />} href={"/"} />

            </>
          ) : (
            <>
              <LandingNavItem text={"Login"} icon={<MdLogin className=' mr-1 ' />} href={"/login"} />
              <LandingNavItem text={"Sign up"} icon={<BiSolidPencil className=' mr-1 ' />} href={"/sign-up"} />
            </>
          )
        }
      </div>
      <Link to='/' className=" hidden md:block">
        <img src="/images/png/logo.png" alt="logo" className=' w-32' />
      </Link>
      <Link to='/' className=" block md:hidden">
        <img src="/images/png/landing-logo.png" alt="logo" className=' w-9' />
      </Link>
    </div>
  )
}
