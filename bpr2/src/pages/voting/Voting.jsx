import React, { useEffect, useState, useRef } from 'react';
import { Button, Typography, message, Result, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import { Col, Container, Row } from 'react-bootstrap';
import { HubConnectionBuilder } from "@microsoft/signalr"
import './Voting.css'
import _ from 'lodash';
import LastVote from './LastVote';
import Results from './results'
import StandBy from './standBy/StandBy';
import { useSelector } from "react-redux";
import Vote from './Vote';
import VoteResult from './VoteResult';

const showStates = {
    video: 0,
    startShow: 1,
    showQuestion: 2,
    startVote: 3,
    stopVote: 4,
    showTheResults: 5,
    lastQuestion: 6,
    lastQuestionResults: 7,
    endShow: 8,
}

const Voting = ({ setLayout, context }) => {
    const [connection, setConnection] = useState(null)
    const [stateOfTheShow, setStateOfTheShow] = useState({})
    const [lastAnswer, setLastAnswer] = useState("Yes")
    const latestState = useRef(null)

    latestState.current = stateOfTheShow

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://tricapptest.azurewebsites.net/hubs/show')
            .withAutomaticReconnect()
            .build()

        setConnection(newConnection)
        getStateOfShow()
    }, [])

    useEffect(() => {
        if (connection) {
            connection.start()
                .then(result => {

                    console.log("Connected ");

                    connection.on('ReceiveMessage', message => {
                        setStateOfTheShow(message)
                    })

                })
                .catch(e => console.log("Connection failed: ", e))
        }
    }, [connection])

    const getStateOfShow = () => {
        try {
            fetch('https://tricapptest.azurewebsites.net/show', {
                method: 'GET',
            }).then(
                res => res.ok ? res.json() : message.error("Something went wrong")
            ).then(
                res => {
                    setStateOfTheShow(res)
                }
            ).catch(
                err => message.error("Something went wrong")
            )
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }

    const [showStateLocal, setShowStateLocal] = useState({})
    const user = useSelector((state) => state.auth);

    useEffect(() => {
        console.log("Here", stateOfTheShow);
        if (!_.isEmpty(stateOfTheShow)) {
            console.log("Local ", showStateLocal);
            setShowStateLocal(stateOfTheShow)
        }

    }, [stateOfTheShow])

    if (stateOfTheShow.showState != showStates.endShow) {
        switch (stateOfTheShow.showState) {
            case showStates.video:
                return (

                    < StandBy />
                )
            case showStates.startShow:
                return (
                    <StandBy />
                )
            case showStates.showQuestion:
                return (
                    <>
                        <Container>
                            <Row>
                                <Col style={{ paddingTop: "10vh" }}>
                                    <div className="textBox">
                                        <h2>{stateOfTheShow.currentQuestion.questionLong}</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            case showStates.showTheResults:
                return (<VoteResult showState={stateOfTheShow} />)
            case showStates.startVote:
                return (<Vote showState={stateOfTheShow} />)
            case showStates.stopVote:
                return (
                    <>
                        <Container>
                            <Row>
                                <Col style={{ paddingTop: "10vh" }}>
                                    <div className="textBox">
                                        <h2>Wait for the results</h2>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </>
                )
            case showStates.lastQuestion:
                return (<>
                    <Container>
                        <Row>
                            <Col style={{ paddingTop: "10vh", paddingBottom: "5vh" }}>
                                <div className="textBox">
                                    <h2>{stateOfTheShow.currentQuestion.questionLong}</h2>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </>
                )
            case showStates.lastQuestionResults:
                return (<LastVote showState={stateOfTheShow} setLayout={setLayout} answer={lastAnswer} />)
            case showStates.endShow:
                return (<Results setLayout={setLayout} />)
            default:
                return (
                    <StandBy />
                )
        }
    }
    else
        return <Results setLayout={setLayout} />








    // const [activeQuestion, setActiveQuestion] = useState()
    /* const [isActive, setIsActive] = useState(false)
     console.log(question);
 
     const { message } = useSelector((state) => state.message)
     const user = useSelector((state) => state.auth);
 
     console.log(user)*/

    // const [timeLeft, setTimeLeft] = useState(10)

    // useEffect(() => {
    //     timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    // }, [timeLeft])

    // if (timeLeft === -1) {
    //     setTimeout(() => {
    //         setIsActive(false)
    //     }, 5000);
    // }

    /*useEffect(() => {
        console.log("Here");
        if (!_.isEmpty(question)) {
            console.log(question);
            setIsActive(true)
        }
    }, [question])

    const onVote = (vote) => {
        fetch(`https://tricapptest.azurewebsites.net/Question/${user.user.ticketid}&&${question.id}&&${vote}`, { method: 'POST' })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => {
                console.log(res)
                if (res.ok)
                    setIsActive(false)
            })
            .catch(err => message.error(err))
    }

    const afterLastVote = () => {
        return (<StandBy active={setIsActive} question={question} />)
    }

    const getResults = () => {
        setIsActive(false)
    }

    if (isActive) {
        if (question.lastQuestion) {
            return <LastVote layout={afterLastVote} question={question} />
        }
        else if (question.id == -1) {
            return (
                <StandBy active={setIsActive} question={question} />
            )
        }
        else {
            return (
                <Vote question={question} results={getResults} />
                // <div>
                //     <div className="button-div" style={{ justifyContent: "flex-start" }}>
                //         <Button
                //             className="answerButton"
                //             style={{ fontSize: "30px", width: "170px", height: "100px" }}
                //             onClick={() => onVote("Yes")}>
                //             Yes
                //         </Button>
                //     </div>
                //     <div className='question-div'>
                //         <h1>{question.label}</h1>
                //     </div>
                //     <div className="button-div" style={{ justifyContent: "flex-end" }}>
                //         <Button
                //             className="answerButton"
                //             style={{ fontSize: "30px", width: "170px", height: "100px" }}
                //             onClick={() => onVote("No")}>
                //             No
                //         </Button>
                //     </div>
                // </div>
            )
        }
    } else {
        return (
            <StandBy active={setIsActive} question={question} />
        )
    }*/
}

export default Voting