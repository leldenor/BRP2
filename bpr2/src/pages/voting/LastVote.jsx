import React, { useEffect, useState } from 'react';
import { Typography, Button, message } from 'antd'

import { Pie } from '@ant-design/plots';

import { useSelector } from "react-redux";
import { Col, Container, Row } from 'react-bootstrap';
const { Title } = Typography;

const LastVote = ({ showState, setLayout }) => {
    const [answer, setAnswer] = useState("")
    const user = useSelector((state) => state.auth);
    console.log(user);
    useEffect(() => {
        fetch(`https://tricapptest.azurewebsites.net/Question/${user.user._id}`)
            .then(res => res.ok ? res.text() : message.error("Something went wrong"))
            .then(
                (data) => {
                    setAnswer(data)
                }
            ).catch(
                err => console.log(err)
            )
    }, []);

    const onResults = () => {
        console.log("log");
        setLayout("results")
    }

    const config = {
        appendPadding: 10,
        data: showState.results,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        legend: false,
        autoFit: true,
        label: {
            type: 'outer',
            offset: '20%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 20,
                textAlign: 'center',
                fill: "#ECEAE1",
                fontFamily: "Nova Flat"
            },
        },
        color: ({ type }) => {
            if (type == 'Yes') {
                return '#FF01FF';
            }
            return 'black';
        },
        style: {
            stroke: 'black'
        }
    }

    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <h1>{showState.currentQuestion.questionShort}</h1>
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h3 style={{ color: "#ECEAE1", display: 'inline' }}>Your answer </h3>
                    <h1 style={{ display: "inline", fontSize: 60, fontFamily: 'Montserrat' }}>{answer}</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Pie height={200} width={100} {...config} />
                </Col>
            </Row>
            <Row style={{ paddingBottom: "5vh" }}>
                <Col>
                    <Button className='resultsButton' onClick={onResults} >Check the results</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default LastVote