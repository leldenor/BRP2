import { useEffect, useState } from "react";
import { Statistic, Button } from "antd";

const { Countdown } = Statistic

const Timer = ({ isTime, time }) => {
    const [finish, setFinish] = useState(false)
    const timerFinish = () => {
        if (time == 15) {
            isTime()
        }
        else {
            setFinish(true)
        }
    }
    return (
        <>
            <Countdown value={new Date().setSeconds(new Date().getSeconds() + (finish ? 0 : time))} valueStyle={{ color: "#FF01FF", fontSize: "calc(3rem + 6vw)" }} format="ss" onFinish={timerFinish} />
            {time != 15 &&
                <Button className="button" onClick={isTime} disabled={!finish}>Do not show timer</Button>
            }
        </>
    )
}

export default Timer