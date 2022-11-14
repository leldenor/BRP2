import { Button } from "antd";
import { useEffect, useState } from "react";

const TimerTime = ({ isShort }) => {
    let timer = 60
    if (isShort)
        timer = 30

    const [timeLeft, setTimeLeft] = useState(timer)

    useEffect(() => {
        if (isShort)
            timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 3000);
        else
            timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 10000);
    }, [timeLeft])

    if (timeLeft === -1) {
        return <div>0</div>
    }

    const startTimer = () => {

    }

    return (
        <div>
            <Button onClick={startTimer}>Start</Button>
            <div>{timeLeft}</div>
        </div>
    )
}

export default TimerTime