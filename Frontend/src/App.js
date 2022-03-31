import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import React from "react";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp"
import Home from "./pages/Home/Home";
import Drawspace from "./pages/Drawspace/Drawspace";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <SignIn /> },
    { path: "/signup", element: <SignUp /> },
    { path: "/home", element: <Home /> },
    { path: "/drawspace", element: <Drawspace /> },
  ]);
  return routes;
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;