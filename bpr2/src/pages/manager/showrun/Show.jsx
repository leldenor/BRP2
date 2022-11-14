import { Button } from "antd"
import { useState, useEffect } from "react"
import Info from "./Info"
import { useNavigate } from 'react-router-dom'
import Timer from "./Timer"
import TimerTime from "./TimerTime"
import _ from "lodash"
import EndShowStats from "./EndShowStats"

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
const Show = ({ content, question, sendMessage, showState, sendStateOfShow }) => {
    const [isInfo, setIsInfo] = useState(false)
    const [questions, setQuestions] = useState([])
    const [questionCount, setQuestionCount] = useState(0)
    const [buttonTitle, setButtonTitle] = useState("Start show")
    const [showStateLocal, setShowStateLocal] = useState({ showState: showStates.video })
    const [nextQuestion, setNextQuestion] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (!_.isEmpty(showState)) {
            setShowStateLocal(showState)
            // if (showState.showState == showStates.showQuestion)
            //     setQuestionCount(questionCount + 1)
        }

    }, [showState])

    const showVideo = () => {
        //should show video
    }

    const isTime = () => {
        sendStateOfShow(showStates.stopVote)
    }
    console.log(showStateLocal);


    // console.log(showStateLocal, sendStateOfShow(showStates.startShow));
    switch (showStateLocal.showState) {
        case showStates.video:
            return (
                <div>
                    <div>Video</div>
                    <Button onClick={showVideo} >Show video</Button>
                    <div>
                        <div><Button onClick={() => navigate("/manager")}>Back</Button></div>
                        <Button
                            shape="circle"
                            style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                            onClick={() => sendStateOfShow(showStates.startShow)}
                        >Start show</Button>
                    </div>
                </div>
            )
        case showStates.startShow:
            return (
                <div>
                    <div>

                    </div>
                    <Button
                        shape="circle"
                        style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                        onClick={() => sendStateOfShow(showStates.showQuestion)}
                    >Show question</Button>
                </div>
            )
        case showStates.showQuestion:
            return (
                // <div>Show the question full for screen and short for phone {showStateLocal.questionFull}</div>
                //center the question
                <div>
                    <div>{showState.currentQuestion.questionLong}</div>
                    <Button
                        shape="circle"
                        style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                        onClick={() => { sendStateOfShow(showStates.startVote) }}
                    >Start vote</Button>
                </div>
            )
        case showStates.startVote:
            return (
                <>
                    <div>{showStateLocal.currentQuestion.questionLong}</div>
                    <Timer isTime={isTime} />
                </>
            )
        // return <Timer />
        case showStates.stopVote:
            return (
                <div>
                    <div>{showStateLocal.currentQuestion.questionLong}</div>
                    <Button
                        shape="circle"
                        style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                        onClick={() => sendStateOfShow(showStates.showTheResults)}
                    >Show results</Button>
                </div>
            )
        case showStates.showTheResults:
            return (
                <div>
                    {/* <Button onClick={() => sendStateOfShow(showStates.timerShort)}>30s Timer</Button>
                    <Button onClick={() => sendStateOfShow(showStates.timerLong)}>1min Timer</Button> */}
                    <Info results={showStateLocal.results} label={showStateLocal.currentQuestion.questionLong} />
                    <Button
                        shape="circle"
                        style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                        onClick={() => sendStateOfShow(showStates.showQuestion)}
                    >Show question</Button>
                </div>
            )
        case showStates.lastQuestion:
            return (
                <div>
                    <div>Last question {showStateLocal.currentQuestion.questionLong}</div>
                    <Button
                        shape="circle"
                        style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                        onClick={() => sendStateOfShow(showStates.lastQuestionResults)}
                    >Show results</Button>
                </div>
            )
        case showStates.lastQuestionResults:
            return (
                <div>
                    <Info results={showStateLocal.results} label={showStateLocal.currentQuestion.questionLong} />
                    <Button
                        shape="circle"
                        style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                        onClick={() => sendStateOfShow(showStates.endShow)}
                    >End show</Button>
                </div>
            )
        case showStates.endShow:
            return (
                <div>
                    <div>
                        <Button onClick={() => navigate("/manager")}>Home page</Button>
                    </div>
                </div>
            )
        case showStates.timerShort:
            return <TimerTime isShort={true} />
        case showStates.timerLong:
            return <TimerTime isShort={false} />
        default:
            return <></>
    }














    /* const onNextQuestion = () => {
         if (questionCount == (questions.length - 1)) {
             sendMessage(questions[questionCount])
             setShowState(showStates.info)
             setQuestionCount(questionCount + 1)
             // console.log("Here ", questions[questionCount]);
             setButtonTitle("End show")
         }
         else if (questionCount == questions.length) {
             sendMessage({ id: -2 })
             console.log("Are ", questionCount);
             setShowState(showStates.end)
         }
         else {
             sendMessage(questions[questionCount])
             setShowState(showStates.info)
             setQuestionCount(questionCount + 1)
         }
     }
 
     const nextState = (state) => {
         switch (state) {
             case showStates.video:
                 setShowState(showStates.start)
                 break;
             case showStates.start:
                 sendMessage({ id: -1 })
                 setShowState(showStates.button)
                 setButtonTitle("Show Question")
                 break
             case showStates.button:
                 onNextQuestion()
                 break
             case showStates.info:
                 setShowState(showStates.button)
                 break
             default:
                 setShowState(showStates.end)
                 setButtonTitle("End show")
                 break;
         }
     }
 
     const showVideo = () => {
         nextState(showStates.video)
     }
 
     const next = () => {
         nextState(showStates.info)
     }
 
     const contentS = (type) => {
         content(type)
     }
 
     console.log(showState);
 
     if (showState === showStates.button) {
         return (
             <div>
                 {buttonTitle === "Start show" && <div><Button onClick={() => content("home")}>Back</Button></div>}
                 <Button
                     shape="circle"
                     style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                     onClick={() => nextState(showStates.button)}
                 >{buttonTitle}</Button>
             </div>
         )
     }
     else if (showState === showStates.info) {
         return (
             <div>
                 <Info next={next} question={questions[questionCount - 1]} />
             </div>
         )
     }
     else if (showState == showStates.end) {
         return (
             <div>
                 <EndShowStats contents={contentS} questions={questions} />
             </div>
         )
     }
     else {
         return (
             <div>
                 <div>Video</div>
                 <Button onClick={showVideo} >Show video</Button>
                 <div>
                     <div><Button onClick={() => content("home")}>Back</Button></div>
                     <Button
                         shape="circle"
                         style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                         onClick={() => nextState(showStates.start)}
                     >{buttonTitle}</Button>
                 </div>
             </div>
         )
     }*/
}

export default Show