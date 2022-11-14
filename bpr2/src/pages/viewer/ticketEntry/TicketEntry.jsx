import { Button, Form, Input, message } from 'antd'
import _ from 'lodash'
import { useNavigate } from "react-router-dom";
import "./TicketEntry.css"
const ticketNumbers = [
    555,
    444,
    333,
    135798642
]

const TicketEntry = ({ setLayout }) => {
    console.log(typeof setLayout);
    const navigation = useNavigate()
    const onFinish = async (values) => {
        await fetch(`https://localhost:5001/User/${values.ticketNumber}`)
            .then(res => res.ok ? res.text() : message.error("Ticket not valid"))
            .then(
                (data) => {
                    console.log(data);
                    if (data == "Manager")
                        navigation("/manager")
                    else if (data == "User")
                        setLayout("gdpr", values.ticketNumber)
                    else
                        message.error(data)
                }
            ).catch(
                err => console.log(err)
            )
        /*console.log(values);
        if (values.ticketNumber === "132") {
            navigation("/manager")
            return
        }
        const index = _.findIndex(ticketNumbers, (x) => { return x == values.ticketNumber })
        console.log(index);

        if (index != -1) {
            console.log("Tickt number valid");
            
        }
        else {
            console.log("Ticket number not valid");
            message.warning("Ticket number not valid")
        }*/
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Error ', errorInfo);
    }

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    }

    return (
        <div className='parent'>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout={formItemLayout}
                size={"large"}
            >
                <Form.Item
                    name="ticketNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ticket number'
                        }
                    ]}
                >
                    <Input placeholder='Ticket number' />
                </Form.Item>
                <Form.Item
                    wrapperCol={{ offset: 8 }}
                >
                    <div className='button-div'>
                        <Button htmlType='submit' className="answerButton" >
                            Submit
                        </Button>
                    </div>
                </Form.Item>
            </Form>
        </div>
    )
}

export default TicketEntry