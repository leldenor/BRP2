import { Button, Typography } from "antd"
import './Results.css'
const { Title } = Typography;

const Results = ({ setLayout, context }) => {
    const endPage = () => {
        setLayout("goodbye")
    }
    return (
        <div>
            <Title level={4}>Your answers</Title>
            <div>
                <Button onClick={endPage} >Next</Button>
            </div>
        </div>
    )
}

export default Results