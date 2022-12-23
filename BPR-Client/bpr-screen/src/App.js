import { useEffect, useState } from 'react';
import { message } from 'antd';
import Info from './Info'
import _ from 'lodash'
import './App.css';
import Timer from './Timer';
import Start from './Start';

const showStates = {
  video: 0,
  startShow: 1,
  showQuestion: 2,
  startVote: 3,
  stopVote: 4,
  showTheResults: 5,
  lastQuestion: 6,
  lastQuestionResults: 7,
  endShow: 8
}

const App = ({ showState, timer }) => {
  const [isBlank, setIsBlank] = useState(true)
  const [questions, setQuestions] = useState([])
  const [showStateLocal, setShowStateLocal] = useState({ showState: showStates.video })

  useEffect(() => {
    if (!_.isEmpty(showState)) {
      setShowStateLocal(showState)
    }

  }, [showState])
  if (timer == 0) {
    switch (showStateLocal.showState) {
      case showStates.video:
        return (
          <Start />
        )
      case showStates.startShow:
        return (
          <div>
          </div>
        )
      case showStates.showQuestion:
        return (
          <div>
            <div>{showState.currentQuestion.questionLong}</div>
          </div>
        )
      case showStates.startVote:
        return (
          <>
            <div>{showStateLocal.currentQuestion.questionLong}</div>
            <Timer time={15} />
          </>
        )
      case showStates.stopVote:
        return (
          <div>
            <div>{showStateLocal.currentQuestion.questionLong}</div>
            <Timer time={0} />
          </div>
        )
      case showStates.showTheResults:
        return (
          <div>
            <div>{showStateLocal.currentQuestion.questionLong}</div>
            <Info results={showStateLocal.results} label={showStateLocal.currentQuestion.questionLong} />
          </div>
        )
      case showStates.lastQuestion:
        return (
          <div>
            <div>{showStateLocal.currentQuestion.questionLong}</div>
          </div>
        )
      case showStates.lastQuestionResults:
        return (
          <div>
            <div style={{ fontSize: "calc(10px + 2vmin)" }}>{showStateLocal.currentQuestion.questionLong}</div>
            <Info results={showStateLocal.results} label={showStateLocal.currentQuestion.questionFull} />
          </div>
        )
      case showStates.endShow:
        return (
          <div>
          </div>
        )
      default:
        return <></>
    }
  }
  else {
    return (
      <div className="timer">
        <Timer time={timer} />
      </div>
    )
  }
}

export default App;
