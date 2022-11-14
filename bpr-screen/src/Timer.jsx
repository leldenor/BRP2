import { useEffect, useState } from "react";

const Timer = ({ isTime }) => {

    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }, [timeLeft])
    if (timeLeft < 0)
        return <div style={{ fontSize: "calc(40px + 2vmin)", color: "#ECEAE1" }}>0</div>

    return <div style={{ fontSize: "calc(40px + 2vmin)", color: "#ECEAE1" }}>{timeLeft}</div>
}

export default Timer