import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Cookies from "js-cookie"
import axios from 'axios'
import { Divider } from '@material-ui/core';
import NavBar from "../NavBar/NavBar"

const Feed = () => {
    const navigate = useNavigate();

    const [logs, setLogs] = useState([])
    const [users, setUsers] = useState([])
    const userId = Cookies.get("userId")
    const username = Cookies.get("username")

    const float_cont = {
        padding: "20px",
    };

    const float_child = {
        width: "200px",
        float: "left",
        padding: "20px",
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/log/get/" + userId)
            .then(res => {
                console.log(res)
                setLogs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/user")
            .then(res => {
                console.log(res)
                setUsers(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function goToUser(id) {
        navigate(`/feed/${id}`);
    }

    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: data.get("content"), id: userId })
        }
        fetch('http://localhost:8080/api/v1/log/create', requestOptions)
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={float_cont}>
            <NavBar></NavBar>
            <div style={float_child}>
                <h1>Home Page</h1>
                <h1 style={{ paddingTop: "100px" }}>{username}</h1>

                <h2>Other users</h2>
                {users.map(user => <button onClick={() => goToUser(user.id)} key={user.id}>{user.name}</button>)}

            </div>

            <div style={{ paddingLeft: "400px", width: "1300px" }}>

                <h1>Posts</h1>
                {logs.map(log =>
                    <div>

                        <li key={log.id}>Posted({log.dateTime}):   {log.content}</li>
                        <Divider></Divider>
                    </div>

                )}
                <h1>Write new post</h1>
                <form onSubmit={handleSubmit}>
                    <label>
                        <p></p>
                        <input name="content" />
                    </label>
                    <button type="submit">Post</button>
                </form>
            </div>
        </div >
    )
}

export default Feed