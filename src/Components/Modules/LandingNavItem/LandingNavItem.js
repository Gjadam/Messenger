import { useContext } from 'react'
import { Link } from 'react-router-dom';

// Icons
import { RiArrowDropRightLine } from "react-icons/ri";

// User info
import AuthContext from '../../../context/authContext';

export default function LandingNavItem({ text, icon, href }) {

    const authContext = useContext(AuthContext)

    const logOut = () => {
        authContext.logout()
    }

    return (
        <>
            {
                text === "Logout" ? (
                    <div className='group px-4 py-1 rounded-full cursor-pointer text-gray-600 font-bold z-50 hover:bg-red-200 hover:text-red-600 transition-colors' onClick={logOut}>
                        <span className=' flex items-center relative  '><RiArrowDropRightLine className=' absolute -left-7 opacity-0 group-hover:opacity-100 group-hover:-left-4 transition-all mr-1 text-xl text-red-600' />{icon}{text}</span>
                    </div>
                ) : (
                    <Link to={href} className='group px-4 py-1 rounded-full text-gray-600 font-bold z-50 hover:bg-sky-200 hover:text-sky-600 transition-colors'>
                        <span className=' flex items-center relative  '><RiArrowDropRightLine className=' absolute -left-7 opacity-0 group-hover:opacity-100 group-hover:-left-4 transition-all mr-1 text-xl text-sky-600' />{icon}{text}</span>
                    </Link>
                )
            }
        </>
    )
}
