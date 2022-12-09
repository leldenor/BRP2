import { Button } from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook, faInstagram, faVimeo, faYoutube, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { logout } from '../../../../slices/auth'
import { Col, Container, Row } from "react-bootstrap"

const Goodbye = ({ setLayout, context }) => {
    const dispatch = useDispatch();
    console.log(typeof setLayout);
    const logOut = useCallback(() => {
        dispatch(logout());
        console.log(typeof setLayout);
        setLayout("home")
    }, [dispatch]);

    return (
        <>
            <header>
                <Container>
                    <Row>
                        <Col>
                            <h3>Thank you for making the Right Choice!</h3>
                        </Col>
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <Row style={{ paddingBottom: 20 }} >
                        <Col>
                            <div className="textBox">
                                <h5>You have made the right choice. We hope you enjoyed the time spent with us and welcome you to check out our socials and spread the word about “TRIC: The Right Choice”</h5>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ paddingBottom: 20 }} >
                        <Col><Button icon={<FontAwesomeIcon icon={faFacebook} style={{ color: "#FF01FF" }} />} style={{ color: "#ECEAE1" }} href="https://www.facebook.com/humanlabdk" target="_blank" /></Col>
                        <Col><Button icon={<FontAwesomeIcon icon={faInstagram} style={{ color: "#FF01FF" }} />} style={{ color: "#ECEAE1" }} href="https://www.instagram.com/humanlabdk/" target="_blank" /></Col>
                        <Col><Button icon={<FontAwesomeIcon icon={faVimeo} style={{ color: "#FF01FF" }} />} style={{ color: "#ECEAE1" }} href="https://vimeo.com/humanlabdk" target="_blank" /></Col>
                        <Col><Button icon={<FontAwesomeIcon icon={faYoutube} style={{ color: "#FF01FF" }} />} style={{ color: "#ECEAE1" }} href="https://www.youtube.com/channel/UC_-at4eSO2XTpYMc3ozeTjw" target="_blank" /></Col>
                        <Col><Button icon={<FontAwesomeIcon icon={faLinkedin} style={{ color: "#FF01FF" }} />} style={{ color: "#ECEAE1" }} href="https://www.linkedin.com/company/humanlab-dk" target="_blank" /></Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>We would like to hear about your experience during the show with the help of this survey. It will take around 5 minutes</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Button className="answerButton"><a target="_blank" href="https://forms.gle/HHaeu7E3fGcdkNjH8">Survey</a></Button>
                        </Col>
                        <Col>
                            <div className="button-div">
                                <Button className="answerButton" onClick={logOut} >To Start</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default Goodbye