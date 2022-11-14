import { List, Input, Button, Modal, Form, message } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import _ from 'lodash';
import QuestionForm from './QuestionForm';
import { useEffect } from 'react';

const ManageQuestions = ({ homePage }) => {
    const [question, setQuestion] = useState({})
    const [questions, setQuestions] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState("Add Question")
    const [form] = Form.useForm();
    const [form2] = Form.useForm()
    const [isModal2Open, setIsModal2Open] = useState(false);


    useEffect(() => {
        getData()
        // console.log(response);
        // if (!response.ok) throw response.statusText

        // const questions = response.json()
        // console.log(questions);
    }, [])

    const getData = () => {
        console.log("Now");
        fetch('hhttps://localhost:5001/Question').then(
            res => res.json()
        ).then(
            data => {
                setQuestions(data)
            }
        ).catch(
            err => console.log(err)
        )
    }

    const handleOk = (value) => {
        console.log(value);
        const dataToPost = {
            id: question.id,
            label: value.question
        }
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch(`https://localhost:5001/Question`, { method: 'PATCH', body: JSON.stringify(dataToPost), headers })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    message.success("Data saved")
                    setQuestions(data)
                }
            )
            .catch(err => message.error(err))
        setIsModal2Open(false);
    }

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsModal2Open(false);
    }

    const onEnter = (value) => {
        console.log(value);
        const dataToPost = {
            id: -1,
            label: value.question,
        }
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch(`https://localhost:5001/Question`, { method: 'POST', body: JSON.stringify(dataToPost), headers })
            .then(res => res.ok ? res : message.error("Data not saved"))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    message.success("Data saved")
                    setQuestions(data)
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
                _.remove(q, (x) => { return x.id === id })
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
            setIsModalOpen(true);
        } else {
            setQuestion(item)
            setModalTitle("Edit Question")
            setIsModal2Open(true);
        }

    }
    console.log("Q ", question);
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
                        actions={[<Button icon={<DeleteOutlined />} onClick={() => onDelete(item.id)} />, <Button icon={<EditOutlined />} onClick={() => onModalOpen(item)} />]}
                    >
                        {item.label}
                    </List.Item>
                )}
            />
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

                            onEnter(values)
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <QuestionForm
                    form={form}
                />
            </Modal>
            <Modal
                title={modalTitle}
                open={isModal2Open}
                onCancel={handleCancel}
                okText="Submit"
                onOk={() => {
                    form2
                        .validateFields()
                        .then((values) => {
                            form2.resetFields();
                            handleOk(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <QuestionForm
                    question={question}
                    form={form2}
                />
            </Modal>
        </div>
    )
}

export default ManageQuestions