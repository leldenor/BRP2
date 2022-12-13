import { useEffect, useState } from "react";
import { Statistic } from "antd";

const { Countdown } = Statistic

const Timer = ({ time }) => {
    return (
        <>
            <Countdown value={new Date().setSeconds(new Date().getSeconds() + time)} valueStyle={{ color: "#FF01FF", fontSize: "calc(3rem + 6vw)" }} format="ss" />
        </>
    )
}

export default Timer