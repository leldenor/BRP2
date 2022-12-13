import { Button } from 'antd'
import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { logout } from '../../slices/auth'
import { Col, Container, Row } from 'react-bootstrap'

const HomePage = ({ getContent }) => {
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());

    }, [dispatch]);

    return (
        <div>
            <Container style={{ padding: 40 }}>
                <Row className="justify-content-start">
                    <Col xs={2}>
                        <Button className="button" onClick={logOut}>Logout</Button>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8}>
                        <div className="button-div">
                            <Button
                                className="button"
                                style={{ fontSize: "50px", width: "500px", height: "100px" }}
                                onClick={() => getContent("manage")}
                            >
                                Manage questions
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8}>
                        <div className="button-div">
                            <Button
                                className="button"
                                style={{ fontSize: "50px", width: "500px", height: "100px" }}
                                onClick={() => getContent("show")}
                            >
                                Start the show
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs={8}>
                        <div className="button-div">
                            <Button
                                className="button"
                                style={{ fontSize: "50px", width: "500px", height: "100px" }}
                                onClick={() => getContent("stats")}
                            >
                                Statistics
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default HomePage