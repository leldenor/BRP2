import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import TimerTime from "./TimerTime"
import Timer from "./Timer"


const StartVoteShowLayout = ({ showState, isTime }) => {
    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row className="justify-content-center">
                        <Col>
                            <h1>Voting in progress</h1>
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
                            <Timer isTime={isTime} time={15} />
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default StartVoteShowLayout