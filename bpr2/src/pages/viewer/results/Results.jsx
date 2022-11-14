import { Button, Typography } from "antd"
import './Results.css'
const { Title } = Typography;

const Results = ({ setLayout, context }) => {
    const endPage = () => {
        setLayout("goodbye")
    }
    return (
        <div>
            <h3>Your answers</h3>
            <div className="button-div">
                <Button className="answerButton" onClick={endPage} style={{ justifyContent: "flex-start" }}>Next</Button>
            </div>
        </div>
    )
}

export default Results