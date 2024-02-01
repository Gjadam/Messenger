import React from 'react'
import LandingNavItem from '../../Modules/LandingNavItem/LandingNavItem'
export default function NavBar() {
  return (
    <div className=" fixed top-0 right-0 left-0  z-50  container m-auto p-8 flex justify-between items-center ">
      <div className=" flex items-center ">
        <LandingNavItem text={"Login"} href={"/Login"} />
        <LandingNavItem text={"Sign up"} href={"/Sign-up"} />
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
