import { List, Input, Button, Modal, Form, message, Card, Descriptions } from 'antd';
import { useState } from 'react';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import _ from 'lodash';
import QuestionForm from './QuestionForm';
import { useEffect } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Category = {
    0: "Immigration",
    1: "Climate Change",
    2: "Mass Breeding",
    3: "Energy Consumption",
    4: "Global Population"
}

const AnswerCategory = {
    0: "Pragmatic",
    1: "Idealist"
}

const AnswerSubcategory = {
    0: "Conservative",
    1: "Progressist"
}

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
        fetch('https://localhost:5001/Question').then(
            res => res.json()
        ).then(
            data => {
                console.log(data);
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
            questionLong: value.questionLong,
            questionShort: value.questionShort,
            category: value.category,
            answerCategory: value.answerCategory,
            answerSubcategory: value.answerSubcategory
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
            questionLong: value.questionLong,
            questionShort: value.questionShort,
            category: value.category,
            answerCategory: value.answerCategory,
            answerSubcategory: value.answerSubcategory
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
        <>
            <header style={{ padding: 10 }}>
                <Container>
                    <Row>
                        <Col style={{ alignSelf: "center" }}>
                            <Button className='button' onClick={() => homePage("home")} >Back</Button>
                        </Col>

                        <Col xs={8} style={{ textAlign: "center" }}>
                            <h1>Manage Questions</h1>
                        </Col>
                        <Col style={{ alignSelf: "center" }}>
                            <Button className='button' onClick={() => onModalOpen()} >Add Question</Button>
                        </Col>
                    </Row>
                </Container>
            </header>
            <main>
                <Container>
                    <List dataSource={questions}
                        renderItem={(item) => (
                            <Row style={{ padding: 10 }}>
                                <Col>
                                    <Card
                                        className='textBox'
                                        title={<h3>{Category[item.category]}</h3>}
                                        extra={[<Button className='button' icon={<DeleteOutlined />} onClick={() => onDelete(item.id)} />, <Button className='button' icon={<EditOutlined />} onClick={() => onModalOpen(item)} />]}
                                    >
                                        <Row>
                                            <Col>
                                                <Card
                                                    className='textBox'
                                                    title={<h5>Short</h5>}
                                                    type="inner"
                                                >
                                                    <p>{item.questionShort}</p>
                                                </Card>
                                            </Col>
                                            <Col>
                                                <Card
                                                    className='textBox'
                                                    title={<h5>Long</h5>}
                                                    type="inner"
                                                >
                                                    <p>{item.questionLong}</p>
                                                </Card>
                                            </Col>
                                        </Row>
                                        <Row style={{ paddingTop: 20 }}>
                                            <Col>
                                                <Descriptions bordered contentStyle={{
                                                    boxSizing: "border-box",
                                                    background: "#2B2F39",
                                                    border: "4px solid #FF01FF",
                                                    height: "fit-content",
                                                    padding: 20,
                                                    fontFamily: "Montserrat",
                                                    color: "#ECEAE1",
                                                    fontSize: 15
                                                }}
                                                    labelStyle={{
                                                        boxSizing: "border-box",
                                                        background: "#2B2F39",
                                                        border: "4px solid #FF01FF",
                                                        height: "fit-content",
                                                        padding: 20,
                                                        fontFamily: "Montserrat",
                                                        color: "#FF01FF",
                                                        fontSize: 20
                                                    }}>
                                                    <Descriptions.Item label="Answer category">{AnswerCategory[item.answerCategory]}</Descriptions.Item>
                                                    <Descriptions.Item label="Answer subcategory">{AnswerSubcategory[item.answerSubcategory]}</Descriptions.Item>
                                                </Descriptions>
                                            </Col>
                                        </Row>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    />
                </Container>
            </main>
            <Modal
                title={modalTitle}
                open={isModalOpen}
                onCancel={handleCancel}
                okText="Submit"
                okButtonProps={{
                    className: "button"
                }}
                cancelButtonProps={{
                    className: "button"
                }}
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
                okButtonProps={{
                    className: "button"
                }}
                cancelButtonProps={{
                    className: "button"
                }}
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
        </>
    )
}

export default ManageQuestions