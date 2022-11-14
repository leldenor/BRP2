import { Typography, Button, Form, Input, message, Tag, Avatar, Radio } from "antd"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClockCircleOutlined, ScissorOutlined, StopOutlined, ZoomInOutlined, ZoomOutOutlined, RadarChartOutlined, HeatMapOutlined, BugOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from "react-redux"

import { register } from '../../../slices/auth'
import { clearMessage } from "../../../slices/message";

const { CheckableTag } = Tag;

const options1 = [
    { label: "Cat", value: true },
    { label: "Dog", value: false }
]
const options2 = [
    { label: "Car", value: true },
    { label: "Bike", value: false }
]
const options3 = [
    { label: "Square", value: true },
    { label: "Circle", value: false }
]

const colors = {
    1: "Red",
    2: "Blue",
    3: "Green",
    4: "Yellow",
    5: "Grey",
    6: "White",
    7: "Black",
    8: "Brown"
}

const avatars = {
    1: <ScissorOutlined />,
    2: <ClockCircleOutlined />,
    3: <StopOutlined />,
    4: <ZoomInOutlined />,
    5: <ZoomOutOutlined />,
    6: <RadarChartOutlined />,
    7: <HeatMapOutlined />,
    8: <BugOutlined />
}

const Register = ({ setLayout, context }) => {
    const [avatar, setAvatar] = useState(-1)
    const [successful, setSuccessful] = useState(false)
    const [value1, setValue1] = useState(true);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(true);

    const navigation = useNavigate()

    const { isLoggedIn } = useSelector((state) => state.auth);

    const dispatch = useDispatch()
    console.log(isLoggedIn);
    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    const registerUser = (values) => {
        console.log(values);
        setSuccessful(false)
        const user = {
            ticketid: context,
            username: values.username,
            avatar: avatar
        }
        dispatch(register(user))
            .unwrap()
            .then((res) => {
                console.log(res);
                // if (res.ok)
                console.log("som");
                navigation("/voting")
                // else
                //     message.error("Something is wrong")
            })
            .catch(() => {
                setSuccessful(false);
            });
    }

    const generateAvatar = () => {
        fetch(`https://localhost:5001/User/avatar/${value1}&&${value2}&&${value3}`)
            .then(res => res.ok ? res.text() : message.error("Data not saved"))
            .then(res => {
                console.log(res)
                setAvatar(res)
            })
            .catch(err => message.error(err))
    }

    const onChange1 = ({ target: { value } }) => {
        console.log('radio1 checked', value);
        setValue1(value);
    };
    const onChange2 = ({ target: { value } }) => {
        console.log('radio2 checked', value);
        setValue2(value);
    };
    const onChange3 = ({ target: { value } }) => {
        console.log('radio3 checked', value);
        setValue3(value);
    };

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
                onFinish={registerUser}
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
                    label="Choose"
                    name="avatar"
                >
                    <>
                        {avatar == -1 ?
                            <div>
                                <div style={{ margin: 20 }}>
                                    <Radio.Group options={options1} onChange={onChange1} value={value1} optionType="button" />
                                </div>
                                <div style={{ margin: 20 }}>
                                    <Radio.Group options={options2} onChange={onChange2} value={value2} optionType="button" />
                                </div>
                                <div style={{ margin: 20 }}>
                                    <Radio.Group options={options3} onChange={onChange3} value={value3} optionType="button" />
                                </div>
                                <div>
                                    <Button onClick={generateAvatar} >Gnerate Avatar</Button>
                                </div>
                            </div>
                            :
                            <div style={{ height: 80, width: 80, background: colors[avatar] }}>
                                {avatars[avatar]}
                            </div>

                        }
                    </>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button htmlType='submit' className="answerButton" disabled={avatar == -1 ? true : false}>
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register