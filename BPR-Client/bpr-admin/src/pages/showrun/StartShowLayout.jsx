import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import TimerTime from "./TimerTime"


const StartShowLayout = ({ sendStateOfShow, state, sendTimer }) => {

    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row>
                        <Col md={6} >
                            <h1>Show is running</h1>
                        </Col>
                        <TimerTime sendTimer={sendTimer} />
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <Button
                                shape="circle"
                                style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "#ECEAE1" }}
                                onClick={() => sendStateOfShow(state)}
                            >Show question</Button>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default StartShowLayout