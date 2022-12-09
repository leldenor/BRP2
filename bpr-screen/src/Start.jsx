import { Card, Image } from 'antd'
import { Container, Row, Col } from 'reactstrap'
import qrCode from './Tric.png'

const Start = () => {
    return (
        <>
            <header>
                <Container>
                    <Row>
                        <Col>
                            <h1>Scan QR to Start</h1>
                        </Col>
                    </Row>
                </Container>

            </header>
            <main>
                <Container>
                    <Row
                    // className="pt-2 pt-md-5 w-3 px-4 px-xl-0 position-relative"
                    >
                        <Col
                            xs={{ order: 2 }}
                            md={{ size: 7, order: 1 }}
                        // tag="aside"
                        >
                            <Card
                                size="small"
                                title={<h3>
                                    Step 1
                                </h3>}
                                style={{
                                    margin: 10
                                }}
                            >
                                <h5>Scan on your phone the QR code on the side or browse to: <a href="https://trictestbweb.azurewebsites.net">https://trictestbweb.azurewebsites.net</a> to start!</h5>
                            </Card>
                            <Card
                                size="small"
                                title={<h3>
                                    Step 2
                                </h3>}
                                style={{
                                    margin: 10
                                }}
                            >
                                <h5>Choose your username and avatar to be your citizen profile during the play!
                                    Enjoy the performance and wait for your time to make the right choice!</h5>
                            </Card>
                            <Card
                                size="small"
                                title={<h3>
                                    Step 3
                                </h3>}
                                style={{
                                    margin: 10
                                }}
                            >
                                <h5>When it is time to vote, read the question and answer Yes or No on your phone before the time runs out!</h5>
                            </Card>
                        </Col>
                        <Col
                            xs={{ order: 1 }}
                            md={{ size: 4, offset: 1 }}
                            style={{ alignSelf: "center" }}
                        // tag="section"
                        // className="py-5 mb-5 py-md-0 mb-md-0"
                        >
                            <Card
                            >
                                <Image src={qrCode} />
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default Start