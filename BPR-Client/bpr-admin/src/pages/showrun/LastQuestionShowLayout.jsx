import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import TimerTime from "./TimerTime"


const LastQuestionShowLayout = ({ showState, sendStateOfShow, nextState, sendTimer }) => {

    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row>
                        <Col md={6} >
                            <h1>Last Question</h1>
                        </Col>
                        <TimerTime sendTimer={sendTimer} />
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ fontSize: "calc(1rem + 1vw)", color: "#ECEAE1" }}>
                                {showState.currentQuestion.questionLong}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                shape="circle"
                                style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                                onClick={() => sendStateOfShow(nextState)}
                            >Show results</Button>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default LastQuestionShowLayout