import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/Contact";

const router = createBrowserRouter([{
    path: "/",
    element: <Home />,
}
    , {
    path: "/register",
    element: <Register />
},
{
    path: "/login",
    element: <Login />
},
{
    path: "/about",
    element: <About />
},
{
    path: "/contact",
    element: <Contact />
},

]);


export default router;