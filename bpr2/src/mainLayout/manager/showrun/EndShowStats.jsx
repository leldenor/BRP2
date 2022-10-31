import { Button } from "antd"

const EndShowStats = ({ content }) => {
    return (
        <>
            <div>This will show end statistics the same as on the screen but with additional options like:</div>
            <Button onClick={() => content("home")}>Home page</Button>
            <Button onClick={() => content("stats")}>More stats</Button>
        </>
    )
}

export default EndShowStats