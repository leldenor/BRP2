import { Button } from "antd"

const Goodbye = ({ setLayout, context }) => {

    return (
        <>
            <div>
                Goodbye
            </div>
            <div>
                <Button onClick={() => setLayout("ticket")} >Home</Button>
            </div>
        </>
    )
}

export default Goodbye