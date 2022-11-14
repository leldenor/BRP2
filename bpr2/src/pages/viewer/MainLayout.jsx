import React, { useState } from 'react'
import { Dropdown, Layout, Menu, Typography } from 'antd'
import TicketEntry from './ticketEntry'
import GDPR from './gdpr'
import Home from './home'
import Register from './register'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import 'antd/dist/antd.min.css'
import './MainLayout.css'
const { Title } = Typography;

//Create webpack.config
//Maybe run npm run build
//Check mode - developer, production ...

const MainLayout = ({ question }) => {
    console.log(question);

    const { isLoggedIn } = useSelector((state) => state.auth);

    const navigation = useNavigate()
    console.log(isLoggedIn);
    if (isLoggedIn)
        navigation("/voting")


    const getContent = (layout, context) => {
        const content = {
            "ticket": (<TicketEntry setLayout={getContent} context={context} />),
            "gdpr": (<GDPR setLayout={getContent} context={context} />),
            "home": (<Home setLayout={getContent} context={context} />),
            "register": (<Register setLayout={getContent} context={context} />),
        }

        //After register show username and avatar in other pages
        if (context && context.name)
            console.log(context);
        setLayout(content[layout])
    }

    const [layout, setLayout] = useState(<TicketEntry setLayout={getContent} />)

    return (
        <div className='content'>
            <div className='project-logo'>
                <p style={{ margin: 0 }}>TRIC</p>
            </div>
            <div className='project-name'>
                <p>THE RIGHT CHOICE</p>
            </div>
            {layout}
        </div>
    )
}

export default MainLayout