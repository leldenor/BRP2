import { Form, Input } from "antd"
import _ from 'lodash';
const { TextArea } = Input;


const QuestionForm = ({ question, onSubmit, form }) => {

    console.log(_.isEmpty(question));
    const value = _.isEmpty(question) ? "" : question.label
    console.log(value);

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
                label="Question long"
                initialValue={value}
                name="questionLong"
                rules={[
                    {
                        required: true,
                        message: 'Please input your question!',
                    },
                ]}
            >
                <TextArea
                    autoSize={{
                        minRows: 2
                    }}
                />
            </Form.Item>
            <Form.Item
                label="Question short"
                initialValue={value}
                name="questionShort"
                rules={[
                    {
                        required: true,
                        message: 'Please input your question!',
                    },
                ]}
            >
                <TextArea
                    autoSize={{
                        minRows: 2
                    }}
                />
            </Form.Item>
        </Form>
    )
}

export default QuestionForm