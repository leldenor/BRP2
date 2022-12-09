import { Button } from "antd"
import { useState, useEffect } from "react"
import Info from "./Info"
import Timer from "./Timer"
import TimerTime from "./TimerTime"
import _ from "lodash"
import StartShowLayout from "./StartShowLayout"
import InfoShowLayout from "./InfoShowLayout"
import QuestionShowLayout from "./QuestionShowLayout"
import StartVoteShowLayout from "./StartVoteShowLayout"
import StopVoteShowLayout from "./StopVoteShowLayout"
import ResultsShowLayout from "./ResultsShowLayout"
import LastQuestionShowLayout from "./LastQuestionShowLayout"
import LastQResultsShowLayout from "./LastQResultsShowLayout"

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
    timerShort: 9,
    timerLong: 10
}
const Show = ({ showState, sendStateOfShow, setIsShowStarted, timer }) => {
    const [isInfo, setIsInfo] = useState(false)
    const [questions, setQuestions] = useState([])
    const [questionCount, setQuestionCount] = useState(0)
    const [buttonTitle, setButtonTitle] = useState("Start show")
    const [showStateLocal, setShowStateLocal] = useState({ showState: showStates.video })
    const [nextQuestion, setNextQuestion] = useState({})

    // useEffect(() => {
    //     console.log(showState);
    //     if (!_.isEmpty(showState)) {
    //         setShowStateLocal(showState)
    //         // if (showState.showState == showStates.showQuestion)
    //         //     setQuestionCount(questionCount + 1)
    //     }

    // }, [showState])

    const sendTimer = async (timer) => {

        try {
            await fetch('https://localhost:5001/show/timer', {
                method: 'POST',
                body: JSON.stringify(timer),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
        catch (e) {
            console.log('Sending message failed.', e);
        }
    }


    const showVideo = () => {
        //should show video
    }

    const isTime = () => {
        if (showState.showState == showStates.startVote)
            sendStateOfShow(showStates.stopVote)
        else {
            sendTimer(0)
        }

    }
    console.log(showStateLocal, showState);

    // console.log(showStateLocal, sendStateOfShow(showStates.startShow));
    if (timer == 0) {
        switch (showState.showState) {
            case showStates.video:
                return (
                    <InfoShowLayout sendStateOfShow={sendStateOfShow} state={showStates.startShow} />
                    // <LastQuestionShowLayout />
                    // <ResultsShowLayout />
                    // <StopVoteShowLayout />
                    // <StartVoteShowLayout />
                    // <QuestionShowLayout />
                    // <StartShowLayout />
                    // <InfoShowLayout />
                    // <div>
                    //     <div>Video</div>
                    //     <Button onClick={showVideo} >Show video</Button>
                    //     <div>
                    //         <div><Button onClick={() => setIsShowStarted(false)}>Back</Button></div>
                    //         <Button
                    //             shape="circle"
                    //             style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //             onClick={() => sendStateOfShow(showStates.startShow)}
                    //         >Start show</Button>
                    //     </div>
                    //     <div>
                    //         <TimerTime />
                    //     </div>
                    // </div >
                )
            case showStates.startShow:
                return (<StartShowLayout sendStateOfShow={sendStateOfShow} state={showStates.showQuestion} sendTimer={sendTimer} />
                    // <div>
                    //     <div>

                    //     </div>
                    //     <Button
                    //         shape="circle"
                    //         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //         onClick={() => sendStateOfShow(showStates.showQuestion)}
                    //     >Show question</Button>
                    // </div>
                )
            case showStates.showQuestion:
                return (
                    <QuestionShowLayout nextState={showStates.startVote} showState={showState} sendStateOfShow={sendStateOfShow} sendTimer={sendTimer} />
                    // <div>Show the question full for screen and short for phone {showStateLocal.questionFull}</div>
                    //center the question
                    // <div>
                    //     <div>{showState.currentQuestion.questionLong}</div>
                    //     <Button
                    //         shape="circle"
                    //         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //         onClick={() => { sendStateOfShow(showStates.startVote) }}
                    //     >Start vote</Button>
                    // </div>
                )
            case showStates.startVote:
                return (
                    <StartVoteShowLayout showState={showState} isTime={isTime} />
                    // <>
                    //     <div>{showStateLocal.currentQuestion.questionLong}</div>
                    //     <Timer isTime={isTime} />
                    // </>
                )
            // return <Timer />
            case showStates.stopVote:
                return (
                    <StopVoteShowLayout showState={showState} sendStateOfShow={sendStateOfShow} nextState={showStates.showTheResults} />
                    // <div>
                    //     <div>{showStateLocal.currentQuestion.questionLong}</div>
                    //     <Button
                    //         shape="circle"
                    //         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //         onClick={() => sendStateOfShow(showStates.showTheResults)}
                    //     >Show results</Button>
                    // </div>
                )
            case showStates.showTheResults:
                return (
                    <ResultsShowLayout sendStateOfShow={sendStateOfShow} showState={showState} />
                    // <div>
                    //     <Info results={showStateLocal.results} label={showStateLocal.currentQuestion.questionLong} />
                    //     <Button
                    //         shape="circle"
                    //         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //         onClick={() => sendStateOfShow(showStates.showQuestion)}
                    //     >Show question</Button>
                    // </div>
                )
            case showStates.lastQuestion:
                return (
                    <LastQuestionShowLayout showState={showState} sendStateOfShow={sendStateOfShow} nextState={showStates.lastQuestionResults} sendTimer={sendTimer} />
                    // <div>
                    //     <div>Last question {showStateLocal.currentQuestion.questionLong}</div>
                    //     <Button
                    //         shape="circle"
                    //         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //         onClick={() => sendStateOfShow(showStates.lastQuestionResults)}
                    //     >Show results</Button>
                    // </div>
                )
            case showStates.lastQuestionResults:
                return (
                    <LastQResultsShowLayout showState={showState} sendStateOfShow={sendStateOfShow} nextState={showStates.endShow} />
                    // <div>
                    //     <Info results={showStateLocal.results} label={showStateLocal.currentQuestion.questionLong} />
                    //     <Button
                    //         shape="circle"
                    //         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    //         onClick={() => sendStateOfShow(showStates.endShow)}
                    //     >End show</Button>
                    // </div>
                )
            case showStates.endShow:
                return (
                    <div>
                        <div>
                            <Button onClick={() => setIsShowStarted(false)}>Home page</Button>
                        </div>
                    </div>
                )
            case showStates.timerShort:
                return <Timer time={30} />
            case showStates.timerLong:
                return <Timer time={60} />
            case -1:
                return <StartShowLayout sendStateOfShow={sendStateOfShow} state={showStates.showQuestion} />
            default:
                return <InfoShowLayout sendStateOfShow={sendStateOfShow} state={showStates.startShow} />
        }
    }
    else return (
        <div className="timer">
            <Timer time={timer} isTime={isTime} />
        </div>
    )
}

export default Show