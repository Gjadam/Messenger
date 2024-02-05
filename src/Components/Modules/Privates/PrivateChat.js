import React, { useContext } from 'react'
import AuthContext from '../../../context/authContext'
import { useNavigate } from 'react-router-dom'

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
