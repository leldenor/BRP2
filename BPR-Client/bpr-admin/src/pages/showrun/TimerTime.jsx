import { Button, Statistic } from "antd";
import { Col } from "react-bootstrap";

const TimerTime = ({ sendTimer }) => {

    return (
        <>
            <Col md={3} style={{ alignSelf: "center" }}>
                <Button className="button" onClick={() => sendTimer(30)}>Start 30s timer</Button>
            </Col>
            <Col md={3} style={{ alignSelf: "center" }}>
                <Button className="button" onClick={() => sendTimer(60)}>Start 60s timer</Button>
            </Col>
        </>
    )
}

export default TimerTime