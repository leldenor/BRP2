import React, { useEffect, useState } from 'react';
import { Button, Typography, message } from "antd"
import './Voting.css'
import _ from 'lodash';
import LastVote from './LastVote';
import StandBy from './standBy/StandBy';
const { Title } = Typography;
const questionList = [
    { id: 1, questionLabel: "Square or circle?", choice1: "Square", choice2: "Circle" },
    { id: 2, questionLabel: "Taxi or public transportation?", choice1: "Taxi", choice2: "Public transportation" },
    { id: 3, questionLabel: "Car or bike?", choice1: "Car", choice2: "Bike" },
    { id: 4, questionLabel: "Pineapple on pizza?", choice1: "Yes", choice2: "No" },
    { id: 5, questionLabel: "Is it okay to test cosmetic products on animals?", choice1: "Yes", choice2: "No" },
    { id: 6, questionLabel: "Dog or cat?", choice1: "Dog", choice2: "Cat" },
    { id: 7, questionLabel: "Broccoli or chocolate?", choice1: "Broccoli", choice2: "Chocolate" },
]
const Voting = ({ setLayout }) => {
    const [activeQuestion, setActiveQuestion] = useState(_.head(questionList))
    const [isActive, setIsActive] = useState(true)

    // useEffect(() => {
    //     const response = fetch('http://localhost:9090/questions')
    //     if (!response.ok) throw response.statusText
    //     const qustions = response.json()
    //     setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    // }, [])

    const onYesClicked = () => {
        console.log("Yes clicked");
        message.success("Thank you for your vote!")
        setIsActive(false)
        setTimeout(() => {
            console.log("Now");
            setActiveQuestion(questionList.find(x => x.id - 1 === activeQuestion.id))
        }, 5000);
    }

    const onNoClicked = () => {
        console.log("No clicked");
        message.success("Thank you for your vote!")
        setIsActive(false)
        setTimeout(() => {
            console.log("Now");
            setActiveQuestion(questionList.find(x => x.id - 1 === activeQuestion.id))
        }, 5000);
    }

    const afterLastVote = () => {
        setLayout("result", "Yes")
    }
    if (isActive) {
        if (activeQuestion === _.last(questionList)) {
            return <LastVote layout={afterLastVote} />
        } else {
            return (
                <div>
                    <div>
                        <h1>{activeQuestion.questionLabel}</h1>
                    </div>
                    <div>
                        <Button
                            className="answerButton"
                            style={{ fontSize: "50px", width: "170px", height: "100px" }}
                            onClick={onYesClicked}>
                            {activeQuestion.choice1}
                        </Button>
                    </div>
                    {/* Some styling for answers that are long */}
                    <div className="button-div">
                        <Button
                            className="answerButton"
                            style={{ fontSize: "50px", width: "170px", height: "100px" }}
                            onClick={onNoClicked}>
                            {activeQuestion.choice2}
                        </Button>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <StandBy active={setIsActive} />
        )
    }
}

export default Voting