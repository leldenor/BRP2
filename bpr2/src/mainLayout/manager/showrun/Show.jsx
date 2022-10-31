import { Button } from "antd"
import { useState } from "react"
import Info from "./Info"
import EndShowStats from "./EndShowStats"

const Show = ({ content }) => {
    //Eather big red button
    //Or Info the same as on the screen
    const [isInfo, setIsInfo] = useState(false)
    const [questions, setQuestions] = useState(0)
    const [buttonTitle, setButtonTitle] = useState("Start show")

    const nextQuestion = () => {
        if (isInfo || buttonTitle === "Start show") {
            setIsInfo(false)
            if (questions < 2) {
                setQuestions(questions + 1)
                setButtonTitle("Next question")
            } else if (questions === 2) {
                setQuestions(questions + 1)
                setButtonTitle("Last question")
            } else {
                setButtonTitle("End show")
            }
        } else {
            setIsInfo(true)
        }
    }

    if (!isInfo) {
        return (
            <div>
                {buttonTitle === "Start show" && <div><Button onClick={() => content("home")}>Back</Button></div>}
                <Button
                    shape="circle"
                    style={{ fontSize: "50px", width: "350px", height: "350px", backgroundColor: "red", color: "white" }}
                    onClick={nextQuestion}
                >{buttonTitle}</Button>
            </div>
        )
    }
    else {
        if (buttonTitle === "End show") {
            return (
                <div>
                    <EndShowStats content={content} />
                </div>
            )
        } else {
            return (
                <div>
                    <Info next={nextQuestion} />
                </div>
            )
        }
    }
}

export default Show