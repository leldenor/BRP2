import { Layout } from 'antd'
import TicketEntry from './ticketEntry'
import './MainLayout.css'
const { Header, Footer, Content } = Layout

const MainLayout = () => {
    return (
        <Layout>
            <Header className='header'><h1>TRIC!</h1></Header>
            <Content className='content'>
                <TicketEntry />
            </Content>
            <Footer>Maybe some info</Footer>
        </Layout>
    )
}

export default MainLayout