import { Button, Statistic } from "antd";
import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";

const { Countdown } = Statistic

const TimerTime = ({ sendTimer }) => {
    const [timeLeft, setTimeLeft] = useState(-1)


    const onTimeChange = (val) => {
        console.log(val);
    }

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