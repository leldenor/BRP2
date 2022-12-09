import { useEffect, useState } from 'react';
import { message } from 'antd';
import Info from './Info'
import _ from 'lodash'
import './App.css';
import Timer from './Timer';
import EndShowStats from './EndShowStats';
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

const App = ({ showState }) => {
  const [isBlank, setIsBlank] = useState(true)
  const [questions, setQuestions] = useState([])
  const [showStateLocal, setShowStateLocal] = useState({ showState: showStates.video })
  // let list = []
  useEffect(() => {
    if (!_.isEmpty(showState)) {
      setShowStateLocal(showState)
    }

  }, [showState])

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
        // <div>Show the question full for screen and short for phone {showStateLocal.questionFull}</div>
        //center the question
        <div>
          <div>{showState.currentQuestion.questionLong}</div>
        </div>
      )
    case showStates.startVote:
      return (
        <>
          <div>{showStateLocal.currentQuestion.questionLong}</div>
          <Timer />
        </>
      )
    // return <Timer />
    case showStates.stopVote:
      return (
        <div>
          <div>{showStateLocal.currentQuestion.questionLong}</div>
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

export default App;