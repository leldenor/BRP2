import { Form, Input } from "antd"

const QuestionForm = ({ question, onSubmit, form }) => {

    return (
        <Form
            form={form}
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            autoComplete="off"
        >
            <Form.Item
                label="Question"
                initialValue={question?.questionLabel || ""}
                name="question"
                rules={[
                    {
                        required: true,
                        message: 'Please input your question!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Answer opption 1"
                initialValue={question?.choice1 || ""}
                name="choice1"
                rules={[
                    {
                        required: true,
                        message: 'Please input answer 1!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Answer opption 2"
                initialValue={question?.choice2 || ""}
                name="choice2"
                rules={[
                    {
                        required: true,
                        message: 'Please input answer 2!',
                    },
                ]}
            >
                <Input />
            </Form.Item>
        </Form>
    )
}

export default QuestionForm