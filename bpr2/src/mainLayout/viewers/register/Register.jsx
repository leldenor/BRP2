import { Typography, Button, Form, Input, message, Tag, Avatar } from "antd"
import { useState } from "react";
import { ClockCircleOutlined } from '@ant-design/icons'

const { CheckableTag } = Tag;

const Register = ({ setLayout, context }) => {
    const [avatar, setAvatar] = useState()

    const register = (values) => {

        console.log(values);
        //Have some validation here
        setLayout("voting", { name: values.username, avatar: avatar })
    }

    const avatarChange = (x, y) => {
        console.log(x, y);
        setAvatar(y)
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
        <div>
            <Form
                onFinish={register}
                // onFinishFailed={onFinishFailed}
                layout={formItemLayout}
                size={"large"}
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please choose a username'
                        }
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Avatar"
                    name="avatar"
                >
                    <>
                        <CheckableTag
                            key={0}
                            checked={avatar == 0}
                            onChange={(checked) => avatarChange(checked, 0)}

                        >
                            <Avatar shape="square" size={50} icon={<ClockCircleOutlined />} />
                        </CheckableTag>
                        <CheckableTag
                            key={1}
                            checked={avatar == 1}
                            onChange={checked => avatarChange(checked, 1)}

                        >
                            <Avatar shape="square" size={50} icon={<ClockCircleOutlined />} />
                        </CheckableTag>
                    </>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button htmlType='submit' className="answerButton">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register