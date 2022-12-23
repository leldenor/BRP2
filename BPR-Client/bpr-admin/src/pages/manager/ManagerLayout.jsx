import React, { useState } from 'react'
import ManageQuestions from './manageQuestions/ManageQuestions'
import Login from './Login'
import Statistics from './statistics'
import HomePage from './HomePage'
import { useSelector } from "react-redux";
import _ from 'lodash'
import './ManagerLayout.css'

const ManagerLayout = ({ setIsShowStarted }) => {

    const { isLoggedIn } = useSelector((state) => state.auth);

    const getContent = (cont) => {
        if (cont == "show")
            setIsShowStarted(true)
        else {
            const nav = {
                "manage": (<ManageQuestions homePage={getContent} />),
                "stats": (<Statistics homePage={getContent} />),
                "login": (<Login homePage={getContent} />),
                "home": (<HomePage getContent={getContent} />)
            }
            setContent(nav[cont])
        }
    }



    const loggedIn = () => {
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