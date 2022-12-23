import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import TimerTime from "./TimerTime"


const StopVoteShowLayout = ({ showState, sendStateOfShow, nextState }) => {

    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <h1>Voting is over</h1>
                        </Col>
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

export default StopVoteShowLayout