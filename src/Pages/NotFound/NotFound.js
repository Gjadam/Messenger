import { Link } from 'react-router-dom'

// Components
import NavBar from '../../Components/Templates/NavBar/NavBar'

// Icons
import { IoIosHome } from "react-icons/io";

export default function NotFoundNotFound() {
  return (
    <div className=' flex justify-center items-center w-full h-svh bg-bg-Notfound bg-no-repeat bg-center overflow-hidden'>
      <NavBar />
      <div className=" container flex justify-center items-center flex-col gap-12">
        <img src="/images/png/NotFound.png" alt="NotFound" className=' w-48 md:w-96' />
        <span className=' tracking-wide text-center text-5xl font-bold md:text-3xl text-white'>Ooops...Something went wront</span>
        <Link to={'/'} className=' rounded-full p-4 text-sky-600 bg-white font-bold  hover:bg-sky-600 hover:text-white transition-colors'>
          <span className=' flex items-center gap-1'><IoIosHome className=' text-2xl' /> Go To Home</span>
        </Link>
      </div>
    </div>
  )
}
