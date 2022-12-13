import { useSelector } from "react-redux";
import GDPR from "./pages/viewer/gdpr";
import { Col, Container, Row } from 'react-bootstrap';
import { Button, Avatar, Image } from "antd";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater, faMosquito, faMicrophoneAlt, faCat, faDog, faDove, faLandmarkDome, faLandmarkFlag, faUser } from '@fortawesome/free-solid-svg-icons'
import Register from "./pages/viewer/register";
import Voting from "./pages/voting";
import logo from "./logo.png"
import _ from 'lodash'
import Results from "./pages/voting/results";
import Goodbye from "./pages/voting/results/goodbye";

const avatars = {
    8: (<FontAwesomeIcon icon={faUser} style={{ height: 35, width: 35, marginTop: 10 }} />),
    0: (<FontAwesomeIcon icon={faMasksTheater} style={{ height: 35, width: 35, marginTop: 10 }} />),
    1: (<FontAwesomeIcon icon={faLandmarkDome} style={{ height: 35, width: 35, marginTop: 10 }} />),
    2: (<FontAwesomeIcon icon={faCat} style={{ height: 35, width: 35, marginTop: 10 }} />),
    3: (<FontAwesomeIcon icon={faLandmarkFlag} style={{ height: 35, width: 35, marginTop: 10 }} />),
    4: (<FontAwesomeIcon icon={faDog} style={{ height: 35, width: 35, marginTop: 10 }} />),
    5: (<FontAwesomeIcon icon={faDove} style={{ height: 35, width: 35, marginTop: 10 }} />),
}

const Welcome = () => {
    const [isStart, setStart] = useState(true)
    const { isLoggedIn } = useSelector((state) => state.auth);
    const user = useSelector((state) => state.auth);
    const [isVoting, setIsVoting] = useState(false)

    const getContent = (layout, context) => {
        console.log(layout, context);
        const content = {
            "gdpr": (<GDPR setLayout={getContent} context={context} />),
            "register": (<Register setLayout={getContent} context={context} />),
            "home": (<div className="fixed-bottom" style={{ paddingBottom: "5vh" }}>
                <div className="button-div" style={{ paddingBottom: "5vh" }}>
                    <Button className="answerButton" style={{
                        fontFamily: "Nova Flat",
                        color: "#ECEAE1",
                        height: "fit-content",
                        fontSize: "2.4rem"
                    }}
                        onClick={onStart}
                    >
                        Press to Start
                    </Button>
                </div>
                <div className="logo">
                    Powered By
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Image src={logo} />
                </div>
            </div>),
            "voting": (<Voting setLayout={getContent} context={context} />),
            "results": (<Results setLayout={getContent} />),
            "goodbye": (<Goodbye setLayout={getContent} />)

        }
        if (layout == "voting") {
            setIsVoting(true)
        }
        else
            setIsVoting(false)


        if (_.isUndefined(layout)) {
            setLayout((
                <div className="fixed-bottom" style={{ paddingBottom: "5vh" }}>
                    <div className="button-div" style={{ paddingBottom: "5vh" }}>
                        <Button className="answerButton" style={{
                            fontFamily: "Nova Flat",
                            color: "#ECEAE1",
                            height: "fit-content",
                            fontSize: "2.4rem"
                        }}
                            onClick={onStart}
                        >
                            Press to Start
                        </Button>
                    </div>
                    <div className="logo">
                        Powered By
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Image src={logo} />
                    </div>
                </div>))
        }
        else
            setLayout(content[layout])
    }


    const onStart = () => {
        if (isLoggedIn && _.isNull(user.result)) {
            getContent("voting")
        }
        else if (isLoggedIn && !_.isNull(user.result))
            getContent("results")
        else
            getContent("gdpr")
    }

    const [layout, setLayout] = useState(
        <div className="fixed-bottom" style={{ paddingBottom: "5vh" }}>
            <div className="button-div" style={{ paddingBottom: "5vh" }}>
                <Button className="answerButton" style={{
                    fontFamily: "Nova Flat",
                    color: "#ECEAE1",
                    height: "fit-content",
                    fontSize: "2.4rem"
                }}
                    onClick={onStart}
                >
                    Press to Start
                </Button>
            </div>
            <div className="logo">
                Powered By
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Image src={logo} />
            </div>
        </div>

    )

    const fontSize = isVoting ? 64 : 128
    console.log(user);
    if (isVoting && user.isLoggedIn)
        console.log("What");
    else
        console.log("Someee");

    console.log(!isVoting && !user.isLoggedIn, !isVoting, !user.isLoggedIn);
    return (
        <div>
            <header>
                <Container>
                    <Row className="text-center">
                        <Col>
                            <p style={{ fontSize: fontSize, marginBottom: 0 }} className="tric">TRIC!</p>
                        </Col>
                    </Row>
                    {isVoting && user.isLoggedIn ?
                        <Row>
                            <Col style={{ display: "flex", justifyContent: "flex-end" }}>
                                <div className="userLog">
                                    <Avatar shape="circle" className="avatar" icon={avatars[user.user.avatar]} />
                                    <div className="usernameBox">
                                        <h5>{user.user.avatar == 8 ? "Anonymous" : user.user.username}</h5>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        :
                        <Row className="text-center">
                            <Col>
                                <p className="rightChoice">THE RIGHT CHOICE</p>
                            </Col>
                        </Row>

                    }
                </Container>
            </header>
            <main>
                <Container>
                    <Row>
                        <Col>
                            {layout}
                        </Col>
                    </Row>
                </Container>

            </main>
        </div>
    )
}

export default Welcome