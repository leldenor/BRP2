import React, { Fragment, useState } from 'react'
import { Button } from 'antd'
import 'antd/dist/antd.min.css'
import ManageQuestions from './manageQuestions/ManageQuestions'
import Show from './showrun/Show'
import Login from './Login'
import Statistics from './statistics'
import HomePage from './HomePage'
import './ManagerLayout.css'

const ManagerLayout = () => {

    const getContent = (cont) => {
        const nav = {
            "manage": (<ManageQuestions homePage={getContent} />),
            "start": (<Show content={getContent} />),
            "stats": (<Statistics homePage={getContent} />),
            "login": (<Login homePage={getContent} />),
            "home": (<HomePage getContent={getContent} />)
        }
        setContent(nav[cont])
    }

    const [content, setContent] = useState(<Login homePage={getContent} />)

    return (
        <>
            {content}
        </>
    )
}

export default ManagerLayout