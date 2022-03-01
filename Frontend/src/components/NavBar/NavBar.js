import React, { } from "react"
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"

export default function NavBar() {
    const navigate = useNavigate();

    function redirectHome() {
        navigate(`/feed/`);
    }
    function redirectLogout() {
        Cookies.remove("username")
        Cookies.remove("userId")
        navigate(`/`)
    }
    return (
        <h1>
            <button onClick={() => redirectHome()}>
                Home
            </button >
            <button onClick={() => redirectLogout()}>
                Logout
            </button >
        </h1>
    )
}