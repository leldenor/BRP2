import { Button, Form, Input, message } from 'antd';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from "react-redux"

import { login } from '../../slices/auth'

const Login = ({ homePage }) => {

    const dispatch = useDispatch()

    const onFinish = (values) => {

        const user = {
            username: values.username,
            password: values.password
        }
        dispatch(login(user))
            .unwrap()
            .then((res) => {
                homePage("home")

            })
            .catch(() => {
                message.error("Wrong Username and/or password")
            });
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
        message.error("Something went wrong")
    };

    return (
        <>
            <header>
                <Container style={{ paddingTop: 20, paddingBottom: 50 }}>
                    <Row className='justify-content-center'>
                        <Col xs={3}><h1>TRIC! Manager</h1></Col>
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 10,
                        }}
                        wrapperCol={{
                            span: 8,
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
                                offset: 10,
                                span: 8,
                            }}
                        >
                            <Button className='button' htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Container>
            </main>
        </>
    )
}

export default Login