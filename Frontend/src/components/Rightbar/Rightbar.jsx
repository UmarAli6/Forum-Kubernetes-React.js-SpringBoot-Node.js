import React, { Component, useState, useEffect } from 'react'
import { Legend, BarChart, Bar, AreaChart, Area, ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import { format, parseISO, subDays } from "date-fns"
import { Button, ButtonGroup } from '@material-ui/core'
import axios from 'axios'
import Cookies from "js-cookie"
import "./rightbar.css";
import { MessageSharp, SubscriptRounded } from '@mui/icons-material';

const Rightbar = () => {

    const [posts, setPosts] = useState([])
    const userId = Cookies.get("userId")

    useEffect(() => {
        axios.get("/api/v1/posts/get/" + userId)
            .then(res => {
                console.log(res)
                setPosts(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    posts.sort(function (a, b) {
        var keyA = new Date(a.createdAt),
            keyB = new Date(b.createdAt);
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
    });

    let postDate = ""
    let postCount = [0, 0, 0, 0]
    let index = 0
    let first = true

    const month = []

    let currentDate = subDays(new Date(), 1).toISOString().substring(0, 7)

    for (const [i, post] of posts.entries()) {
        postDate = post.createdAt.substring(0, 7);

        if (!(postDate == currentDate) && first) {
            currentDate = postDate
            first = false
            postCount[index]++
        } else if (!(postDate == currentDate)) {
            currentDate = postDate
            index++
            postCount[index]++
        }
        else {
            postCount[index]++
        }
    }

    month.push({
        date: "Dec",
        value: postCount[0]
    })

    month.push({
        date: "Jan",
        value: postCount[1]
    })

    month.push({
        date: "Feb",
        value: postCount[2]
    })

    month.push({
        date: "Mar",
        value: postCount[3]
    })

    const CustomTooltip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    <p className="label">{`${label} : ${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const rndInt = randomIntFromInterval(1, 2)

    function renderSwitch(cT) {
        switch (cT) {
            case 1:
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={month}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis dataKey="value" />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" barSize={20} fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer >
                )
            case 2:
                return (
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={month}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis dataKey="value" />
                            <Tooltip content={<CustomTooltip />} />
                            <Line dataKey="value" />
                        </LineChart>
                    </ResponsiveContainer >

                )
        }
    }


    return (
        <div>
            {renderSwitch(rndInt)}
        </div>
    );
}

export default Rightbar;