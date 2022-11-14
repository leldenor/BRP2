import { Button, Space, } from "antd"
//What happens when refuse is clicked
const GDPR = ({ setLayout, context }) => {

    const onClick = () => {
        setLayout("home", context)
    }
    return (
        <div>
            <div style={{ overflowY: "scroll", height: 400, padding: 10 }}>
                <h1>GDPR agreement</h1>
                <h3>please read carefully before proceeding</h3>
                <br></br>
                <p>This is the agreement </p>
                <p>More of the agreement </p>
                <p>A little bit more of it</p>
                <p>You are almost there</p>
                <p>I can see the end</p>
                <p>I meant the end of the agreement not your end</p>
                <p>Be patient just a little bit more</p>
                <p>Just a bit more</p>
                <p>Almost there</p>
                <p>Now yould be able to see the end</p>
                <p>Just this paragraph</p>
                <p>That is it you did it</p>
                <p>Now it is time to proceed</p>
            </div>
            <div style={{ marginTop: 10 }}>
                <Space size="large">
                    <Button className="answerButton" onClick={onClick} size="large">Accept</Button>
                </Space>
            </div>
        </div>
    )
}

export default GDPR