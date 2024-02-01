import Index from "./Pages/Index/Index";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import NotFound from './Pages/NotFound/NotFound'
import SignUp from "./Pages/SignUp/SignUp";
const routes= [
    { path: '/', element: <Landing /> },
    { path: '/chat', element: <Index /> },
    { path: '/Login', element: <Login /> },
    { path: '/Sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> },
]

export default routes