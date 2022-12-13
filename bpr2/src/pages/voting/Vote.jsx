import React, { useState } from 'react';
import { Button, message } from "antd"
import './Voting.css'
import _ from 'lodash';
import { useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap';

const Vote = ({ showState }) => {
    const [isActive, setIsActive] = useState(true)

    const user = useSelector((state) => state.auth);

    const onVote = (vote) => {
        fetch(`https://tricapptest.azurewebsites.net/Question/${user.user._id}&&${showState.currentQuestion.id}&&${vote}`, { method: 'POST' })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => {
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