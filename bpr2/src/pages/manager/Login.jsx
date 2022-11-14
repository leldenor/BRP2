import { Button, Checkbox, Form, Input, message } from 'antd';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux"

import { login } from '../../slices/auth'
import { clearMessage } from "../../slices/message";

const Login = ({ homePage }) => {

    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    const onFinish = (values) => {

        const user = {
            username: values.username,
            password: values.password
        }
        dispatch(login(user))
            .unwrap()
            .then((res) => {
                console.log(res);
                homePage("home")

            })
            .catch(() => {
                message.error("Wrong Username and/or password")
            });

        if (values.username === "admin" && values.password === "167") {
            console.log('Success:', values);

        } else {

        }
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>
            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default Login