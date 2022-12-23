import { Form, Input, Select } from "antd"
import _ from 'lodash';
const { TextArea } = Input;


const QuestionForm = ({ question, form }) => {

    console.log(_.isEmpty(question));
    const valueLong = _.isEmpty(question) ? "" : question.questionLong
    const valueShort = _.isEmpty(question) ? "" : question.questionShort
    const category = _.isEmpty(question) ? "" : question.category
    const answerCategory = _.isEmpty(question) ? "" : question.answerCategory
    const answerSubcategory = _.isEmpty(question) ? "" : question.answerSubcategory

    const selectItems = [
        { label: "Immigration", value: 0 },
        { value: 1, label: "Climate Change" },
        { value: 2, label: "Mass Breeding" },
        { value: 3, label: "Energy Consumption" },
        { value: 4, label: "Global Population" }
    ]

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
                initialValue={valueLong}
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
                initialValue={valueShort}
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
            <Form.Item
                label="Category"
                initialValue={category}
                name="category"
                rules={[
                    {
                        required: true,
                        message: 'Please choose category!',
                    },
                ]}
            >
                <Select
                    options={selectItems}
                />
            </Form.Item>
            <Form.Item
                label="Answer category"
                initialValue={answerCategory}
                name="answerCategory"
                rules={[
                    {
                        required: true,
                        message: 'Please choose category!',
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 0, label: "Pragmatic" },
                        { value: 1, label: "Idealist" }
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="Answer subcategory"
                initialValue={answerSubcategory}
                name="answerSubcategory"
                rules={[
                    {
                        required: true,
                        message: 'Please choose subcategory!',
                    },
                ]}
            >
                <Select
                    options={[
                        { value: 0, label: "Conservative" },
                        { value: 1, label: "Progressist" }
                    ]}
                />
            </Form.Item>
        </Form>
    )
}

export default QuestionForm