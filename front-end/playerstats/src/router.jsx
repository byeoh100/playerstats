import { createBrowserRouter } from "react-router-dom"
import App from "./App"

import Homepage from "./pages/Homepage"
import GetPlayer from "./pages/GetPlayer"
import GetTeam from "./pages/GetTeam"
import Community from "./pages/Community"
import Profile from "./pages/Profile"
import { confirmUser } from "./utilities"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        loader: confirmUser,
        children: [
            {
                index: true,
                element: <Homepage />
            },
            {
                path: "/players",
                element: <GetPlayer />
            },
            {
                path: "/teams",
                element: <GetTeam />
            },
            {
                path: "/community",
                element: <Community />
            },
            {
                path: "/profile",
                element: <Profile />
            }
        ],
        // errorElement: <Error />
    }
])

export default router