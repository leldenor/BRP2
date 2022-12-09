import { Button, message, Space, } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { register } from '../../../slices/auth'
import { Container, Row, Col } from "react-bootstrap"
//What happens when refuse is clicked
const GDPR = ({ setLayout, context }) => {

    const dispatch = useDispatch()

    const onClick = (accept) => {
        if (accept)
            setLayout("register")
        else {
            var user = {
                username: "reject",
                avatar: 8
            }
            dispatch(register(user))
                .unwrap()
                .then((res) => {
                    console.log(res);
                    // if (res.ok)
                    console.log("som");
                    setLayout("voting")
                    // else
                    //     message.error("Something is wrong")
                })
                .catch(() => {
                    message.error("Something went wrong")
                });
        }
    }
    return (
        <>
            <header>
                <Container>
                    <Row className="text-center">
                        <Col>
                            <p style={{ fontSize: 20, marginBottom: 5, fontWeight: "bold" }}>Data Agreement</p>
                        </Col>
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <Row>
                        <Col>
                            <div className="textBox" style={{ overflowY: "scroll", height: 250 }}>
                                <h5>TRIC is an interactive performance that utilises your answers to make you an active participant in the play! </h5>
                                {/* <br></br> */}
                                <h5>
                                    Would you like to allow us to improve TRIC by storing your answers? We won’t collect any personal data or information.</h5>
                                {/* <br></br> */}
                                <h5>
                                    You can still take part in the play if you don’t want us to store your answers.
                                </h5>
                            </div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: 10 }}>
                        <Col style={{ display: "flex", justifyContent: "flex-start" }}>
                            <div className="button-div">
                                <Button className="answerButton" style={{ fontSize: 20, lineHeight: "normal" }} onClick={() => onClick(true)}>Accept</Button>
                            </div>
                        </Col>
                        <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                            <div className="button-div">
                                <Button className="answerButton" style={{ fontSize: 20, lineHeight: "normal" }} onClick={() => onClick(false)}>Refuse</Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </main>
        </>
    )
}

export default GDPR