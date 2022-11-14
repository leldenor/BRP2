import { useEffect, useState } from "react"
import Results from "../results"
import { message } from 'antd';
import { Pie } from '@ant-design/plots';

const StandBy = ({ active, question }) => {
    const [result, setResult] = useState([])
    console.log(question, result);
    useEffect(() => {
        //getting the results
        if (question.id != undefined && question.id > -1 && result.length == 0) {
            fetch(`https://localhost:5001/Question/results/${question.id}`)
                .then(res => res.ok ? res.json() : message.error("Data not received"))
                .then(res => {
                    console.log(res)
                    setResult(res)
                })
                .catch(err => message.error(err))
        }

    }, [])

    // if (result.length == 0) {
    //     return <></>
    // }

    const data = [
        {
            type: 'Yes',
            value: 45,
        },
        {
            type: 'No',
            value: 55
        }
    ]

    const config = {
        appendPadding: 10,
        data: result,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 30,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }

    // useEffect(() => {
    //     active(true)
    // }, question)

    //show spin while waiting for results
    if (question.id == undefined) {
        return (
            <div>Wait for the show to start</div>
        )
    }
    else if (question.id == -1) {
        return <div>Wait for the questions</div>
    }
    else if (question.id == -2) {
        return <Results />
    }
    else {
        return (
            <>
                <h3>{question.label}</h3>
                <Pie {...config} />
            </>
        )
    }
}

export default StandBy