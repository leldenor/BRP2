import React, { Fragment, useState } from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.min.css'
import ManageQuestions from './manageQuestions/ManageQuestions'
import Show from './showrun/Show'
import Login from './Login'
import Statistics from './statistics'
import HomePage from './HomePage'
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import _ from 'lodash'
import './ManagerLayout.css'

const ManagerLayout = ({ sendMessage, question }) => {

    const { message } = useSelector((state) => state.message)
    const { isLoggedIn } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.auth);

    console.log(user);
    const navigate = useNavigate()
    if (isLoggedIn && user.user.username != "TRICADMIN")
        navigate("/")

    console.log(isLoggedIn)
    //Redux for login
    const getContent = (cont) => {
        const nav = {
            "manage": (<ManageQuestions homePage={getContent} />),
            "start": (<Show content={getContent} sendMessage={sendMessage} question={question} />),
            "stats": (<Statistics homePage={getContent} />),
            "login": (<Login homePage={getContent} />),
            "home": (<HomePage getContent={getContent} />)
        }
        setContent(nav[cont])
    }

    const loggedIn = () => {
        console.log("Log");
        if (!isLoggedIn)
            return <Login homePage={getContent} />
        else
            return <HomePage getContent={getContent} />
    }

    const [content, setContent] = useState(loggedIn)

    return (
        <>
            {content}
        </>
    )
}

export default ManagerLayout