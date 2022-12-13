import { Button, Form, Input, Radio } from "antd"
import { useState } from "react";
import { useDispatch } from "react-redux"
import { register } from '../../../slices/auth'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater, faCat, faDog, faDove, faLandmarkDome, faLandmarkFlag } from '@fortawesome/free-solid-svg-icons'
import "./Register.css"

const Register = ({ setLayout, context }) => {
    const [avatar, setAvatar] = useState(-1)
    const [successful, setSuccessful] = useState(false)
    const [value1, setValue1] = useState(true);
    const [value2, setValue2] = useState(false);
    const [value3, setValue3] = useState(true);
    const dispatch = useDispatch()


    const registerUser = (values) => {
        setSuccessful(false)
        const user = {
            username: values.username,
            avatar: avatar,
            gdpr: true
        }
        dispatch(register(user))
            .unwrap()
            .then((res) => {
                setLayout("voting", res)
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
    }

    return (
        <div>
            <Form
                onFinish={registerUser}
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
                        <Radio.Button value={2} className="radioButton"><FontAwesomeIcon icon={faCat} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={3} className="radioButton"><FontAwesomeIcon icon={faLandmarkFlag} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={4} className="radioButton"><FontAwesomeIcon icon={faDog} className="avatarIcons" /></Radio.Button>
                        <Radio.Button value={5} className="radioButton"><FontAwesomeIcon icon={faDove} className="avatarIcons" /></Radio.Button>
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