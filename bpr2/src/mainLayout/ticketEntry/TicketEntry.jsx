import { Button, Form, Input } from 'antd'
import _ from 'lodash'
import "./TicketEntry.css"
const ticketNumbers = [
    555,
    444,
    333
]

const TicketEntry = () => {
    const onFinish = (values) => {
        console.log(values);
        const index = _.findIndex(ticketNumbers, (x) => { return x == values.ticketNumber })
        console.log(index);
        if (index != -1) {
            console.log("Tickt number valid");
        }
        else {
            console.log("Ticket number not valid");
        }
    }
    const onFinishFailed = (errorInfo) => {
        console.log('Error ', errorInfo);
    }
    return (
        <div className='parent'>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="horizontal"
                size={"large"}
            >
                <Form.Item
                    label="Ticket number"
                    name="ticketNumber"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your ticket number'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button htmlType='submit' danger>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default TicketEntry