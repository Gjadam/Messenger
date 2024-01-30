import Index from "./Pages/Index/Index";
import Landing from "./Pages/Landing/Landing";

const routes= [
    { path: '/', element: <Landing /> },
    { path: '/chat', element: <Index /> },
]

export default routes