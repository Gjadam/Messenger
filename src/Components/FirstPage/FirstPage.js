import React, { useContext } from 'react'
import AuthContext from '../../context/authContext'
import Index from '../../Pages/Index/Index'
import Landing from '../../Pages/Landing/Landing'
import { useNavigate } from 'react-router-dom'

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
