import { Button } from "antd"

const Statistics = ({ homePage }) => {
    return (
        <div>
            <Button onClick={() => homePage("home")}>Home</Button>
            <div>Statistics</div>
        </div>
    )
}

export default Statistics