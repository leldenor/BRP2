import { Typography, Button, Form, Input, message, Tag, Avatar, Radio } from "antd"
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { register } from '../../../slices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater, faMosquito, faMicrophoneAlt, faCat, faDog, faDove, faLandmarkDome, faLandmarkFlag } from '@fortawesome/free-solid-svg-icons'
import { BugOutlined } from '@ant-design/icons'
import "./Register.css"
const { CheckableTag } = Tag;

const Register = ({ setLayout, context }) => {
    const [avatar, setAvatar] = useState(-1)
    const [successful, setSuccessful] = useState(false)
    const [value1, setValue1] = useState(true);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(true);
    const dispatch = useDispatch()


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
                setLayout("voting")
                // else
                //     message.error("Something is wrong")
            })
            .catch(() => {
                setSuccessful(false);
            });
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

    const changeAvatar = (e) => {
        setAvatar(e.target.value)
        console.log(e);
    }
    console.log(avatar);
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
                    label="Choose Avatar"
                    name="avatar"
                    initialValue={avatar}
                >
                    <Radio.Group onChange={changeAvatar}>
                        <Radio.Button value={0} className="radioButton"><FontAwesomeIcon icon={faMasksTheater} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={1} className="radioButton"><FontAwesomeIcon icon={faLandmarkDome} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={4} className="radioButton"><FontAwesomeIcon icon={faCat} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={5} className="radioButton"><FontAwesomeIcon icon={faLandmarkFlag} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={6} className="radioButton"><FontAwesomeIcon icon={faDog} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={7} className="radioButton"><FontAwesomeIcon icon={faDove} className="avatarIcons" /></Radio.Button>
                    </Radio.Group>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        xs: { span: 24, offset: 0 },
                        sm: { span: 16, offset: 8 },
                    }}
                >
                    <Button htmlType='submit' disabled={avatar == -1 ? true : false} className="answerButton">
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default Register