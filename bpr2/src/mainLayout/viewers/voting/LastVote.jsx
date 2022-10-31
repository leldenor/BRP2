import React, { useEffect } from 'react';
import { Typography, Button, message } from 'antd'
const { Title } = Typography;

const LastVote = ({ layout }) => {

    // useEffect(() => {
    //     setTimeout(() => {
    //         layout()
    //     }, 5000);
    // }, []);
    const clicked = () => {
        message.success("Thank you for your vote!")
        layout()
    }

    return (
        <div>
            <h1>Last vote</h1>
            <div>
                <h1>"Save or abandon?"</h1>
            </div>
            <div className="button-div">
                <Button
                    className="answerButton"
                    disabled={true}
                    onClick={clicked}
                    style={{ fontSize: "50px", width: "170px", height: "100px" }}
                >
                    Save
                </Button>
            </div>
            <div className="button-div">
                <Button
                    className="answerButton"
                    disabled={false}
                    onClick={clicked}
                    style={{ fontSize: "50px", width: "170px", height: "100px" }}
                >
                    Abandon
                </Button>
            </div>
        </div>
    )
}

export default LastVote