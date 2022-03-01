import React, { useState, useEffect } from 'react'
import {
    useParams,
    useNavigate
} from "react-router-dom";

import { Divider } from '@material-ui/core';
import NavBar from "../NavBar/NavBar"

import axios from 'axios'

const FeedId = () => {
    const navigate = useNavigate();
    const [logs, setLogs] = useState([])
    const [username, setUsername] = useState("")

    let { id } = useParams();

    const float_cont = {
        padding: "20px",
    };

    const float_child = {
        width: "200px",
        float: "left",
        padding: "20px",
    };

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/log/get/" + id)
            .then(res => {
                console.log(res)
                setLogs(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


    console.log(id)

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/user/get/" + id)
            .then(res => {
                console.log(res)
                setUsername(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    function redirectToChat() {
        navigate(`/chat/${id}`);
    }

    return (
        <div style={float_cont}>
            <NavBar></NavBar>
            <div style={float_child}>
                <h1>Home Page</h1>
                <h1 style={{ paddingTop: "100px" }}>{username.name}</h1>

                <h3><button onClick={redirectToChat}>Chat</button></h3>

            </div>

            <div style={{ paddingLeft: "400px", width: "1300px" }}>

                <h1>Posts</h1>
                {logs.map(log =>
                    <div>

                        <li key={log.id}>Posted({log.dateTime}):   {log.content}</li>
                        <Divider></Divider>
                    </div>

                )}
            </div>
        </div>
    )
}

export default FeedId