import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Profile } from "../pages/Profile";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <Profile />,
  },
  {
    path: "/signin",
    element: <SignIn />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
]);

export default routes;
