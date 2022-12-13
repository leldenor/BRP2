import { Button, Form, Select, Descriptions, List } from "antd"
import { useEffect, useState } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMasksTheater, faMosquito, faMicrophoneAlt, faCat, faDog, faDove, faLandmarkDome, faLandmarkFlag } from '@fortawesome/free-solid-svg-icons'
import _ from "lodash"

const QuestionOptions = [
    { label: "Id", value: "id" },
    { label: "Long Question", value: "questionLong" },
    { label: "Short Question", value: "questionShort" },
    { label: "Yes answer count", value: "resultYes" },
    { label: "No answer count", value: "resultNo" },
    { label: "Category", value: "category" },
    { label: "Answer Category", value: "answerCategory" },
    { label: "Answer Subcategory", value: "answerSubcategory" },
]
const UsersOptions = [
    { label: "Id", value: "id" },
    { label: "Username", value: "username" },
    { label: "Avatar", value: "avatar" },
    { label: "Voting Results", value: "votingResults" },
    { label: "Outcome", value: "outcome" },
]

const Statistics = ({ homePage, sendMessage }) => {
    const [showFile, setShowFile] = useState({})
    const [dateOptions, setDateOptions] = useState([])

    const [form] = Form.useForm()

    useEffect(() => {
        console.log("Here");
        fetch(`https://tricapptest.azurewebsites.net/Stats/dates`, { method: 'GET' })
            .then(res => res.ok ? res : console.log(res))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    let options = []
                    _.forEach(data, d => {
                        options.push({
                            value: d,
                            label: d
                        })
                    })
                    setDateOptions(options)
                }
            )
            .catch(err => console.log(err))
    }, [])

    const exportData = (values) => {
        console.log(values);
        const headers = { 'Content-Type': 'application/json', Accept: 'application/json' }
        fetch(`https://tricapptest.azurewebsites.net/Stats`, { method: 'POST', body: JSON.stringify(values.showDate), headers })
            .then(res => res.ok ? res : console.log(res, values))
            .then(res => res.json())
            .then(
                data => {
                    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
                        JSON.stringify(data)
                    )}`;
                    const link = document.createElement("a");
                    link.href = jsonString;
                    link.download = `${values.showDate}Show.json`;

                    link.click();
                }
            )
            .catch(err => console.log(err))

    }


    return (
        <>
            <header>
                <Container style={{ padding: 20 }}>
                    <Row>
                        <Col md={2}><Button className="button" onClick={() => homePage("home")}>Home</Button></Col>
                        <Col style={{ display: "flex", justifyContent: "center" }}><h1 style={{ fontWeight: "bolder", fontSize: "3.5rem" }}>Statistics</h1></Col>
                    </Row>
                </Container>
            </header>
            <main>
                <Form form={form} name="Show data"
                    labelCol={{
                        span: 6,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    onFinish={exportData}
                >
                    <Form.Item name="showDate" label="Date of the show" rules={[{ required: true, message: "Choose date of the show" }]}>
                        <Select placeholder="Select the date of the show" options={dateOptions}>
                        </Select>
                    </Form.Item>
                    <Form.Item>
                        <Button className="button" htmlType="submit">Download</Button>
                    </Form.Item>
                </Form>
                <Container style={{ padding: 20 }}>
                    <List itemLayout="horizontal">
                        <List.Item>
                            <List.Item.Meta
                                avatar={<FontAwesomeIcon icon={faMasksTheater} className="avatarIcons" />}
                                title={<p>{0}</p>}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<FontAwesomeIcon icon={faLandmarkDome} className="avatarIcons" />}
                                title={<p>{1}</p>}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<FontAwesomeIcon icon={faCat} className="avatarIcons" />}
                                title={<p>{2}</p>}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<FontAwesomeIcon icon={faLandmarkFlag} className="avatarIcons" />}
                                title={<p>{3}</p>}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<FontAwesomeIcon icon={faDog} className="avatarIcons" />}
                                title={<p>{4}</p>}
                            />
                        </List.Item>
                        <List.Item>
                            <List.Item.Meta
                                avatar={<FontAwesomeIcon icon={faDove} className="avatarIcons" />}
                                title={<p>{5}</p>}
                            />
                        </List.Item>
                    </List>
                </Container>
            </main>
        </>
    )
}

export default Statistics