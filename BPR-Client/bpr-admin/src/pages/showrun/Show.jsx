import { Button } from "antd"
import Timer from "./Timer"
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
}
const Show = ({ showState, sendStateOfShow, setIsShowStarted, timer }) => {

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

    const isTime = () => {
        if (showState.showState == showStates.startVote)
            sendStateOfShow(showStates.stopVote)
        else {
            sendTimer(0)
        }

    }

    if (timer == 0) {
        switch (showState.showState) {
            case showStates.video:
                return (<InfoShowLayout sendStateOfShow={sendStateOfShow} state={showStates.startShow} />)
            case showStates.startShow:
                return (<StartShowLayout sendStateOfShow={sendStateOfShow} state={showStates.showQuestion} sendTimer={sendTimer} />)
            case showStates.showQuestion:
                return (<QuestionShowLayout nextState={showStates.startVote} showState={showState} sendStateOfShow={sendStateOfShow} sendTimer={sendTimer} />)
            case showStates.startVote:
                return (<StartVoteShowLayout showState={showState} isTime={isTime} />)
            case showStates.stopVote:
                return (<StopVoteShowLayout showState={showState} sendStateOfShow={sendStateOfShow} nextState={showStates.showTheResults} />)
            case showStates.showTheResults:
                return (<ResultsShowLayout sendStateOfShow={sendStateOfShow} showState={showState} />)
            case showStates.lastQuestion:
                return (<LastQuestionShowLayout showState={showState} sendStateOfShow={sendStateOfShow} nextState={showStates.lastQuestionResults} sendTimer={sendTimer} />)
            case showStates.lastQuestionResults:
                return (<LastQResultsShowLayout showState={showState} sendStateOfShow={sendStateOfShow} nextState={showStates.endShow} />)
            case showStates.endShow:
                return (
                    <div>
                        <div>
                            <Button className="button" onClick={() => setIsShowStarted(false)}>Home page</Button>
                        </div>
                    </div>
                )
            case -1:
                return <StartShowLayout sendStateOfShow={sendStateOfShow} state={showStates.showQuestion} sendTimer={sendTimer} />
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