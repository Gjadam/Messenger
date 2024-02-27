import FirstPage from "./Components/FirstPage/FirstPage";
import PrivateChat from "./Components/Modules/Privates/PrivateChat";
import Index from "./Pages/Index/Index";
import Landing from "./Pages/Landing/Landing";
import Login from "./Pages/Login/Login";
import NotFound from './Pages/NotFound/NotFound'
import SignUp from "./Pages/SignUp/SignUp";


const routes = [
    { path: '/', element: <FirstPage /> },
    { path: '/chat', element: <Index />},
    { path: '/chat/:targetUserID', element: <Index />},
    { path: '/chat/:targetUserID/:chatID', element: <Index />},
    { path: '/login', element: <Login /> },
    { path: '/sign-up', element: <SignUp /> },
    { path: '*', element: <NotFound /> },
]

export default routes