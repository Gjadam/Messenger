import { useContext } from 'react'

// Components
import Index from '../../Pages/Index/Index'
import Landing from '../../Pages/Landing/Landing'

// User infos
import AuthContext from '../../context/authContext'

export default function FirstPage() {
    const authContext = useContext(AuthContext)
    return (
        authContext.isLoggedIn ? (
            <>
                <Index />
            </>
        ) : (
            <>
                <Landing />
            </>
        )
    )
}
