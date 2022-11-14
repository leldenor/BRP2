import React, { useEffect, useState } from 'react';
import { Button, Typography, message, Result, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Voting.css'
import _ from 'lodash';
import { useSelector } from "react-redux";

const Vote = ({ showState }) => {
    const [isActive, setIsActive] = useState(true)

    console.log(showState);

    const user = useSelector((state) => state.auth);

    console.log(user)

    const [timeLeft, setTimeLeft] = useState(10)

    // useEffect(() => {
    //     timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    // }, [timeLeft])

    // if (timeLeft === -1) {
    //     setTimeout(() => {
    //         results()
    //     }, 5000);
    // }

    const onVote = (vote) => {
        fetch(`https://localhost:5001/Question/${user.user.ticketid}&&${showState.currentQuestion.id}&&${vote}`, { method: 'POST' })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => {
                console.log(res)
                if (res.ok)
                    setIsActive(false)
            })
            .catch(err => message.error(err))
    }

    if (!isActive || showState.showState != 3)
        return (
            <div className='spin'>
                <Spin indicator={<LoadingOutlined
                    style={{
                        fontSize: 100,
                        color: "#ECEAE1"
                    }}
                    spin
                />} />
            </div>
        )


    return (
        <div>
            <div className="button-div" style={{ justifyContent: "flex-start" }}>
                <Button
                    className="answerButton"
                    style={{ fontSize: "30px", width: "170px", height: "100px" }}
                    onClick={() => onVote("Yes")}>
                    Yes
                </Button>
            </div>
            <div className='question-div'>
                <h3>{showState.currentQuestion.questionShort}</h3>
            </div>
            <div className="button-div" style={{ justifyContent: "flex-end" }}>
                <Button
                    className="answerButton"
                    style={{ fontSize: "30px", width: "170px", height: "100px" }}
                    onClick={() => onVote("No")}>
                    No
                </Button>
            </div>
        </div>
    )
}


export default Vote