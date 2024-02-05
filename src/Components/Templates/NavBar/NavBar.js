import React, { useContext } from 'react'
import LandingNavItem from '../../Modules/LandingNavItem/LandingNavItem'
import AuthContext from '../../../context/authContext'
export default function NavBar() {

  const authContext = useContext(AuthContext)

  return (
    <div className=" fixed top-0 right-0 left-0  z-50  container m-auto p-8 flex justify-between items-center ">
      <div className=" flex items-center ">
        {
          authContext.isLoggedIn ? (
            <LandingNavItem text={"Go to Chat"} href={"/chat"} />
          ) : (
            <>
            <LandingNavItem text={"Login"} href={"/login"} />
            <LandingNavItem text={"Sign up"} href={"/sign-up"} />    
            </>
          )
        }
        
      </div>
      <a href='' className=" hidden md:block">
        <img src="/images/png/logo.png" alt="logo" className=' w-32' />
      </a>
      <a href='' className=" block md:hidden">
        <img src="/images/png/landing-logo.png" alt="logo" className=' w-10' />
      </a>
    </div>
  )
}
