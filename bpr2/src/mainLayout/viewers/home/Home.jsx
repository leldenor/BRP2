import { Button } from "antd"

const Home = ({ setLayout, context }) => {
    const onRegister = () => {
        setLayout("register")
    }
    return (
        <div style={{ padding: "40px" }}>
            <h1>Welcome to TRIC!</h1>
            <h3>are you ready to make the right choice?</h3>
            <p>We are happy to have you here! You have the opportunity to participate in
                an innovative theatre experience, in which the audience chooses what is
                going to happen!
            </p>
            <p>
                To partecipate in the play, we ask you to register a temporary profile with us.
            </p>
            <p>
                You will be prompted whenever a choice is to be made. Keeep an eye on the app or on the stage monitor!
            </p>
            <div style={{ paddingTop: "30px" }}>
                <Button className="answerButton" block onClick={onRegister}>Register</Button>
            </div>
        </div>
    )
}

export default Home