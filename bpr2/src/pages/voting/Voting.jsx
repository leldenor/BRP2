import React, { useEffect, useState } from 'react';
import { Button, Typography, message, Result, Spin } from "antd"
import { LoadingOutlined } from '@ant-design/icons';
import './Voting.css'
import _ from 'lodash';
import LastVote from './LastVote';
import Results from './results'
import StandBy from './standBy/StandBy';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import Vote from './Vote';
import VoteResult from './VoteResult';

const showStates = {
    video: 0,
    startShow: 1,
    showQuestion: 2,
    startVote: 3,
    stopVote: 4,
    showTheResults: 5,
    lastQuestion: 6,
    lastQuestionResults: 7,
    endShow: 8,
}

const Voting = ({ setLayout, question, showState }) => {
    const [showStateLocal, setShowStateLocal] = useState({ showState: showStates.video })

    const navigate = useNavigate()

    const user = useSelector((state) => state.auth);
    console.log(user);
    if (!user.isLoggedIn) {
        navigate("/")
    }

    useEffect(() => {
        console.log("Here", showState);
        if (!_.isEmpty(showState)) {
            console.log("Local ", showStateLocal);
            setShowStateLocal(showState)
        }

    }, [showState])

    console.log("Is", showState, showStateLocal);

    if (showState.showState != showStates.endShow) {
        console.log("WWWWWW", showStateLocal.showState);
        switch (showStateLocal.showState) {
            case showStates.video:
                return (
                    <div className='spin'>
                        <Spin indicator={<LoadingOutlined
                            style={{
                                fontSize: 100,
                                color: "#ECEAE1"
                            }}
                            spin
                        />} />
                    </div>
                )
            case showStates.startShow:
                return (
                    <div className='spin'>
                        <Spin indicator={<LoadingOutlined
                            style={{
                                fontSize: 100,
                                color: "#ECEAE1"
                            }}
                            spin
                        />} />
                    </div>
                )
            case showStates.showQuestion:
                return (
                    <div className='spin'>
                        <Spin indicator={<LoadingOutlined
                            style={{
                                fontSize: 100,
                                color: "#ECEAE1"
                            }}
                            spin
                        />} />
                    </div>
                )
            case showStates.showTheResults:
                return (<VoteResult showState={showState} />)
            case showStates.startVote:
                return (<Vote showState={showState} />)
            case showStates.stopVote:
                return (
                    <div className='spin'>
                        <Spin indicator={<LoadingOutlined
                            style={{
                                fontSize: 100,
                                color: "#ECEAE1"
                            }}
                            spin
                        />} />
                    </div>
                )
            case showStates.lastQuestion:
                return (<LastVote showState={showState} />
                )
            case showStates.lastQuestionResults:
                return (<VoteResult showState={showState} />)
            case showStates.endShow:
                return (<Results />)
            default:
                return <></>
        }
    }
    else
        return <Results />








    // const [activeQuestion, setActiveQuestion] = useState()
    /* const [isActive, setIsActive] = useState(false)
     console.log(question);
 
     const { message } = useSelector((state) => state.message)
     const user = useSelector((state) => state.auth);
 
     console.log(user)*/

    // const [timeLeft, setTimeLeft] = useState(10)

    // useEffect(() => {
    //     timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    // }, [timeLeft])

    // if (timeLeft === -1) {
    //     setTimeout(() => {
    //         setIsActive(false)
    //     }, 5000);
    // }

    /*useEffect(() => {
        console.log("Here");
        if (!_.isEmpty(question)) {
            console.log(question);
            setIsActive(true)
        }
    }, [question])

    const onVote = (vote) => {
        fetch(`https://localhost:5001/Question/${user.user.ticketid}&&${question.id}&&${vote}`, { method: 'POST' })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => {
                console.log(res)
                if (res.ok)
                    setIsActive(false)
            })
            .catch(err => message.error(err))
    }

    const afterLastVote = () => {
        return (<StandBy active={setIsActive} question={question} />)
    }

    const getResults = () => {
        setIsActive(false)
    }

    if (isActive) {
        if (question.lastQuestion) {
            return <LastVote layout={afterLastVote} question={question} />
        }
        else if (question.id == -1) {
            return (
                <StandBy active={setIsActive} question={question} />
            )
        }
        else {
            return (
                <Vote question={question} results={getResults} />
                // <div>
                //     <div className="button-div" style={{ justifyContent: "flex-start" }}>
                //         <Button
                //             className="answerButton"
                //             style={{ fontSize: "30px", width: "170px", height: "100px" }}
                //             onClick={() => onVote("Yes")}>
                //             Yes
                //         </Button>
                //     </div>
                //     <div className='question-div'>
                //         <h1>{question.label}</h1>
                //     </div>
                //     <div className="button-div" style={{ justifyContent: "flex-end" }}>
                //         <Button
                //             className="answerButton"
                //             style={{ fontSize: "30px", width: "170px", height: "100px" }}
                //             onClick={() => onVote("No")}>
                //             No
                //         </Button>
                //     </div>
                // </div>
            )
        }
    } else {
        return (
            <StandBy active={setIsActive} question={question} />
        )
    }*/
}

export default Voting