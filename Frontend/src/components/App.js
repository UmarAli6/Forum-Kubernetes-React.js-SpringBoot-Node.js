import React, { } from "react"
import {
    BrowserRouter as Router,
    useRoutes,
} from "react-router-dom"

import SignIn from "./SignIn/SignIn"
import SignUp from "./SignUp/SignUp"
import Feed from "./Feed/Feed"
import FeedId from "./FeedId/FeedId"
import Chat from "./Chat/Chat"

const App = () => {
    let routes = useRoutes([
        { path: "/", element: <SignIn /> },
        { path: "/feed/", element: <Feed /> },
        { path: "/feed/:id", element: <FeedId /> },
        { path: "/signup", element: <SignUp /> },
        { path: "/chat/:id", element: <Chat /> }
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