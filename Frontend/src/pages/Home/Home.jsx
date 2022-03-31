import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Leftbar from "../../components/Leftbar/Leftbar";
import Feed from "../../components/Feed/Feed";
import "./home.css";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import SignIn from "../SignIn/SignIn";
import Message from "../../components/Message/Message";
import Drawspace from "../Drawspace/Drawspace";
import Profile from "../../components/Profile/Profile";

const Home = () => {
  const location = useLocation();
  const comp = location.state.comp;
  console.log(comp)

  if (Cookies.get("userId") === "null") {
    return <SignIn />;
  }

  const MiddleComp = () => {
    if (comp === "feed") {
      return <Feed />;
    } else if (comp === "message") {
      let user = { id: location.state.userId, name: location.state.username }
      return <Message user={user} />;
    } else if (comp === "profile") {
      let user = { id: location.state.userId, name: location.state.username }
      return <Profile user={user} />;
    }
  };

  if (comp === "drawspace") {
    return (
      <>
        <Topbar comp={comp} />
        <div className="homeContainer">
          <Drawspace />
        </div>
      </>
    );
  }

  return (
    <>
      <Topbar comp={comp} />
      <div className="homeContainer">
        <Leftbar state={location.state} />
        <MiddleComp />
      </div>
    </>
  );
};

export default Home;