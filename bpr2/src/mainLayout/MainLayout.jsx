import React, { useState } from 'react'
import { Dropdown, Layout, Menu, Typography } from 'antd'
import TicketEntry from './viewers/ticketEntry'
import Voting from './viewers/voting'
import GDPR from './viewers/gdpr'
import Home from './viewers/home'
import Register from './viewers/register'
import Results from './viewers/results'
import Goodbye from './viewers/goodbye'
import { SolutionOutlined, UserOutlined, VideoCameraOutlined, HomeOutlined, ProfileFilled } from '@ant-design/icons'
import 'antd/dist/antd.min.css'
import './MainLayout.css'
import ManagerLayout from './manager/ManagerLayout'
const { Title } = Typography;

//Create webpack.config
//Maybe run npm run build
//Check mode - developer, production ...

const MainLayout = () => {

    const getContent = (layout, context) => {

        if (layout === "manager") {
            return setIsManager(true)
        }

        const content = {
            "ticket": (<TicketEntry setLayout={getContent} context={context} />),
            "gdpr": (<GDPR setLayout={getContent} context={context} />),
            "home": (<Home setLayout={getContent} context={context} />),
            "register": (<Register setLayout={getContent} context={context} />),
            "voting": (<Voting setLayout={getContent} context={context} />),
            "result": (<Results setLayout={getContent} context={context} />),
            "goodbye": (<Goodbye setLayout={getContent} context={context} />)
        }
        //Add manager page and statistics pages
        //Add login page for manager

        //After register show username and avatar in other pages
        if (context && context.name)
            console.log(context);
        setLayout(content[layout])
    }

    const [layout, setLayout] = useState(<TicketEntry setLayout={getContent} />)
    const [isManager, setIsManager] = useState(false)

    if (isManager) return (
        // <Layout>
        //     <Header style={{ color: "white", fontSize: "xxx-large", textAlign: "center" }}>Tric!</Header>
        //     <Content className='content'>
        <div className='content'>
            <ManagerLayout />
        </div>
        //     </Content>
        // </Layout>
    )

    return (
        //     <Layout>
        //         <Header style={{ color: "white", fontSize: "xxx-large", textAlign: "center" }}>Tric!</Header>
        //         <Content className='content'>
        <div className='content'>
            <div className='project-logo'>
                <p style={{ margin: 0 }}>TRIC</p>
            </div>
            <div className='project-name'>
                <p>THE RIGHT CHOICE</p>
            </div>
            {layout}
        </div>
        //     </Content>
        // </Layout>
    )
}

export default MainLayout