import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import { Pie } from '@ant-design/plots';
import TimerTime from "./TimerTime"


const ResultsShowLayout = ({ sendStateOfShow, showState }) => {
    const config = {
        data: showState.results,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        legend: false,
        // autoFit: true,
        label: {
            type: 'outer',
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
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <h1>Question Results</h1>
                        </Col>
                    </Row>
                </Container>
            </header>
            <main>
                <Container style={{ padding: 30 }}>
                    <Row>
                        <Col>
                            <div style={{ fontSize: "calc(0.5rem + 2vw)", color: "#ECEAE1" }}>
                                {showState.currentQuestion.questionLong}
                            </div>
                        </Col>
                        <Col>
                            <Pie height={300} {...config} />
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                shape="circle"
                                style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                                onClick={() => sendStateOfShow(-1)}
                            >Hide results</Button>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default ResultsShowLayout