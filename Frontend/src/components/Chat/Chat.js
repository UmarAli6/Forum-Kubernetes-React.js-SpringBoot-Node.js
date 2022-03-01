import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import Cookies from "js-cookie"
import axios from 'axios'
import NavBar from "../NavBar/NavBar"

const Chat = () => {

    const [chats, setChats] = useState([])
    const receiverId = Cookies.get("userId")
    let { id } = useParams();

    console.log("The receiver: " + receiverId + "\nThe sender: " + id)

    useEffect(() => {
        axios.get("http://localhost:8080/api/v1/message/get/sender/" + id + "/receiver/" + receiverId)
            .then(res => {
                console.log(res)
                setChats(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const handleSubmit = event => {
        event.preventDefault();
        const data = new FormData(event.currentTarget)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: data.get("content"), senderId: receiverId, receiverId: id })
        }
        fetch('http://localhost:8080/api/v1/message/create', requestOptions)
            .then(response => response.json())
            .then(() => {
                window.location.reload();
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div>
            <NavBar></NavBar>
            <h1>Chat</h1>
            {chats.map(chat => <li key={chat.id}>{chat.sender.name} said (at {chat.dateTime}): {chat.content}</li>)}
            <h1>Write new message</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <p></p>
                    <input name="content" />
                </label>
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default Chat