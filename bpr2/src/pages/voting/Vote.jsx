import React, { useEffect, useState } from 'react';
import { Button, Typography, message, Result, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Voting.css'
import _ from 'lodash';
import { useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap';

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
        fetch(`https://localhost:5001/Question/${user.user._id}&&${showState.currentQuestion.id}&&${vote}`, { method: 'POST' })
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
            <>
                <Container>
                    <Row>
                        <Col style={{ paddingTop: "10vh" }}>
                            <div className="textBox">
                                <h2>Your vote has been accepted</h2>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </>
        )


    return (
        <Container style={{ marginTop: "10vh" }}>
            <Row>
                <Col>
                    <div className="button-div" style={{ justifyContent: "flex-start" }}>
                        <Button
                            className="answerButton"
                            style={{ fontSize: "32px", width: "200px", height: "56px" }}
                            onClick={() => onVote("Yes")}>
                            Yes
                        </Button>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className='question-div'>
                        <h3>{showState.currentQuestion.questionShort}</h3>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="button-div" style={{ justifyContent: "flex-end" }}>
                        <Button
                            className="answerButton"
                            style={{ fontSize: "32px", width: "200px", height: "56px" }}
                            onClick={() => onVote("No")}>
                            No
                        </Button>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}


export default Vote