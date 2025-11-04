import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

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
}]);


export default router;