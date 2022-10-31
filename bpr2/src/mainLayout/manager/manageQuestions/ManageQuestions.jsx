import { List, Input, Button, Modal, Form, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import _ from 'lodash';
import QuestionForm from './QuestionForm';
import { useEffect } from 'react';
const data = [
    { id: 1, questionLabel: "Square or circle?", choice1: "Square", choice2: "Circle" },
    { id: 2, questionLabel: "Taxi or public transportation?", choice1: "Taxi", choice2: "Public transportation" },
    { id: 3, questionLabel: "Car or bike?", choice1: "Car", choice2: "Bike" },
    { id: 4, questionLabel: "Pineapple on pizza?", choice1: "Yes", choice2: "No" },
    { id: 5, questionLabel: "Is it okay to test cosmetic products on animals?", choice1: "Yes", choice2: "No" },
    { id: 6, questionLabel: "Dog or cat?", choice1: "Dog", choice2: "Cat" },
    { id: 7, questionLabel: "Broccoli or chocolate?", choice1: "Broccoli", choice2: "Chocolate" },
]
//Add two more inputs for answer choice
const ManageQuestions = ({ homePage }) => {
    const [question, setQuestion] = useState({})
    const [questions, setQuestions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Question")
    const [form] = Form.useForm();
    const [form2] = Form.useForm()

    useEffect(() => {
        getData()
        // console.log(response);
        // if (!response.ok) throw response.statusText

        // const questions = response.json()
        // console.log(questions);
    }, [])

    const getData = () => {
        console.log("Now");
        fetch('https://localhost:5001/Question').then(
            res => res.json()
        ).then(
            data => {
                setQuestions(data.questionList)
            }
        ).catch(
            err => console.log(err)
        )
    }

    const handleOk = (value) => {
        console.log(value);
        const dataToPost = {
            id: -1,
            label: value.question,
            choice1: value.choice1,
            choice2: value.choice2
        }
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch(`https://localhost:5001/Question`, { method: 'POST', body: JSON.stringify(dataToPost), headers })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    message.success("Data saved")
                    setQuestions(data.questionList)
                }
            )
            .catch(err => message.error(err))
        setIsModalOpen(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const onEnter = (value) => {
        console.log(value);
        const dataToPost = {
            id: -1,
            label: value.question,
            choice1: value.choice1,
            choice2: value.choice2
        }
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch(`https://localhost:5001/Question`, { method: 'POST', body: JSON.stringify(dataToPost), headers })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    message.success("Data saved")
                    setQuestions(data.questionList)
                }
            )
            .catch(err => message.error(err))

        setIsModalOpen(false)
    }

    const onDelete = (id) => {
        let q = _.cloneDeep(questions)

        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch(`https://localhost:5001/Question`, { method: 'DELETE', body: id, headers })
            .then(res => res.ok ? res : message.error("Question not removed")).then(res => {
                message.success("Question removed")
                _.remove(q, (x) => { return x.Key === id })
                console.log(q);
                setQuestions(q)
            }
            )
            .catch(err => message.error(err))



    }

    const onModalOpen = (item) => {
        console.log(item);
        if (item === undefined) {
            setQuestion({})
            setModalTitle("Add Question")
        } else {
            setQuestion(item)
            setModalTitle("Edit Question")
        }
        setIsModalOpen(true);
    }

    return (
        <div>
            <Button onClick={() => homePage("home")} >Back</Button>
            <Button onClick={() => onModalOpen()} >Add Question</Button>
            <div>Questions</div>
            <List
                itemLayout="horizontal"
                dataSource={questions}
                renderItem={(item) => (
                    <List.Item
                        actions={[<Button icon={<DeleteOutlined />} onClick={() => onDelete(item.Key)} />, <Button icon={<EditOutlined />} onClick={() => onModalOpen(item)} />]}
                    >
                        {item.Value.label}
                    </List.Item>
                )}
            />
            {/* <QuestionForm form={form2} />
            <Button onClick={() => {
                form2
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onEnter(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }} >Submit</Button> */}
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                okText="Submit"
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            if (_.isEmpty(question)) {
                                onEnter(values)
                            } else
                                handleOk(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <QuestionForm
                    question={question}
                    form={form}
                />
            </Modal>
        </div>
    )
}

export default ManageQuestions