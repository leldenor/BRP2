import { Button } from "antd"

const Statistics = ({ homePage, sendMessage }) => {
    return (
        <div>
            <Button onClick={() => homePage("home")}>Home</Button>
            <Button onClick={() => sendMessage("Yes")}>Yes</Button>
            <div>Statistics</div>
        </div>
    )
}

export default Statistics