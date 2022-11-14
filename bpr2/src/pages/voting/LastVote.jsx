import React, { useEffect, useState } from 'react';
import { Typography, Button, message } from 'antd'

import { useSelector } from "react-redux";
const { Title } = Typography;

const LastVote = ({ showState }) => {
    const [answer, setAnswer] = useState("")
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        fetch(`https://localhost:5001/Question/${user.ticketNumber}&&${showState.currentQuestion.id}`)
            .then(res => res.ok ? res.text() : message.error("Something went wrong"))
            .then(
                (data) => {
                    setAnswer(data)
                }
            ).catch(
                err => console.log(err)
            )
    }, []);

    return (
        <div>
            <h1>Last question</h1>
            <div>
                <h1>{showState.currentQuestion.questionShort}</h1>
            </div>
            <div className="button-div" style={{ justifyContent: "center" }}>
                <Button
                    className="answerButton"
                    disabled={true}
                    style={{ fontSize: "30px", width: "170px", height: "100px" }}
                >
                    {answer}
                </Button>
            </div>
        </div>
    )
}

export default LastVote