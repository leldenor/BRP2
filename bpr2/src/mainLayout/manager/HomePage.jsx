import { Button } from 'antd'

const HomePage = ({ getContent }) => {
    return (
        <div>
            <div>
                <Button
                    className="answerButton"
                    style={{ fontSize: "50px", width: "500px", height: "100px" }}
                    onClick={() => getContent("manage")}
                >
                    Manage questions
                </Button>
            </div>
            <div>
                <Button
                    className="answerButton"
                    style={{ fontSize: "50px", width: "500px", height: "100px" }}
                    onClick={() => getContent("start")}
                >
                    Start the show
                </Button>
            </div>
            <div>
                <Button
                    className="answerButton"
                    style={{ fontSize: "50px", width: "500px", height: "100px" }}
                    onClick={() => getContent("stats")}
                >
                    Statistics
                </Button>
            </div>
        </div>
    )
}

export default HomePage