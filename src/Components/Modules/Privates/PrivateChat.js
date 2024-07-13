import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// User info
import AuthContext from '../../../context/authContext'

export default function PrivateChat({ children }) {
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    return (
        <>
            {
                authContext.isLoggedIn === true ? <>{children}</> : navigate('/login')
            }
        </>
    )
}
