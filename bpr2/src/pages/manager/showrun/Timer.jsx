import { useEffect, useState } from "react";

const Timer = ({ isTime }) => {

    const [timeLeft, setTimeLeft] = useState(10)

    useEffect(() => {
        timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    }, [timeLeft])

    if (timeLeft === -1) {
        isTime()
    }

    return <div>{timeLeft}</div>
}

export default Timer