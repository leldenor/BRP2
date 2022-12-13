import { Button, Typography, message, Avatar } from "antd"
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import { outcome } from '../../../slices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater, faCat, faDog, faDove, faLandmarkDome, faLandmarkFlag, faUser } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import './Results.css'
import { Row, Container, Col } from "react-bootstrap";

const avatars = {
    8: (<FontAwesomeIcon icon={faUser} style={{ height: 35, width: 35, marginTop: 10 }} />),
    0: (<FontAwesomeIcon icon={faMasksTheater} style={{ height: 35, width: 35, marginTop: 10 }} />),
    1: (<FontAwesomeIcon icon={faLandmarkDome} style={{ height: 35, width: 35, marginTop: 10 }} />),
    2: (<FontAwesomeIcon icon={faCat} style={{ height: 35, width: 35, marginTop: 10 }} />),
    3: (<FontAwesomeIcon icon={faLandmarkFlag} style={{ height: 35, width: 35, marginTop: 10 }} />),
    4: (<FontAwesomeIcon icon={faDog} style={{ height: 35, width: 35, marginTop: 10 }} />),
    5: (<FontAwesomeIcon icon={faDove} style={{ height: 35, width: 35, marginTop: 10 }} />),
}

const Results = ({ setLayout }) => {
    const [results, setResults] = useState({})
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth);

    useEffect(() => {
        if (_.isNull(user.result)) {
            dispatch(outcome(user.user._id))
                .unwrap()
                .then((res) => {
                    console.log(res);
                    if (res)
                        setResults(res.result)
                    else
                        message.error("Something went wrong")
                })
                .catch((err) => {
                    message.error("Something went wrong!")
                });
        } else {
            setResults(user.result)
        }
    }, [])

    const endPage = () => {
        setLayout("goodbye")
    }


    console.log(results);

    return (
        <>
            <Container>
                <Row>
                    <Col><h3>Thank you</h3></Col>
                </Row>
                <Row>
                    <Col><h5>We made <strong style={{
                        fontSize: "larger",
                        textTransform: "uppercase",
                        color: "#ECEAE1"
                    }}>the right choice</strong></h5></Col>
                </Row>
                <Row>
                    <Col>
                        <div className="textBox">
                            <div className="userLog">
                                <Avatar shape="circle" className="avatar" icon={avatars[user.user.avatar]} />
                                <div className="usernameBox">
                                    <h5>{user.user.avatar == 8 ? "Anonymous" : user.user.username}</h5>
                                </div>
                            </div>
                            <div className="resultsBox">
                                <p style={{ color: "#ECEAE1" }}>You voted for the right choice {results.inMajority} times out of {results.questionCount}! How do you feel? Is it the outcome that you envisioned?</p>
                            </div>
                            <div className="statsBox">
                                <p>IN MAJORITY: <i>{results.inMajority}/{results.questionCount}</i></p>
                                <p>IN MINORITY: <i>{results.inMinority}/{results.questionCount}</i></p>
                            </div>
                        </div>
                    </Col>
                </Row>
                <Row style={{ paddingTop: 20, paddingBottom: 20 }}>
                    <Col>
                        <Button className='resultsButton' onClick={endPage}>Goodbye</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )

}

export default Results