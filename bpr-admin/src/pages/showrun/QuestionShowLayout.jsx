import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import TimerTime from "./TimerTime"


const QuestionShowLayout = ({ nextState, sendStateOfShow, showState, sendTimer }) => {
    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row>
                        <Col md={6} >
                            <h1>Question</h1>
                        </Col>
                        <TimerTime sendTimer={sendTimer} />
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <div style={{ fontSize: "calc(1.5rem + 2vw)", color: "#ECEAE1" }}>
                                {showState.currentQuestion.questionLong}
                            </div>
                        </Col>
                    </Row>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                shape="circle"
                                style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "#ECEAE1" }}
                                onClick={() => sendStateOfShow(nextState)}
                            >Start vote</Button>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default QuestionShowLayout