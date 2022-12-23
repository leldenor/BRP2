import { Col, Container, Row } from "react-bootstrap"
import { Button } from "antd"
import TimerTime from "./TimerTime"


const InfoShowLayout = ({ sendStateOfShow, state }) => {
    return (
        <>
            <header style={{ paddingTop: 20, paddingBottom: 40 }}>
                <Container>
                    <Row>
                        <Col style={{ display: "flex", justifyContent: "end" }}>
                            <Button className="button" >Back</Button>
                        </Col>
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
                            >Start show</Button>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default InfoShowLayout