import { useEffect, useState } from 'react';
import { message } from 'antd';
import { Pie } from '@ant-design/plots';

const Info = ({ results, label }) => {
    // const [timeLeft, setTimeLeft] = useState(10)
    // const [results, setResults] = useState([])

    // const data = [
    //     {
    //         type: 'Yes',
    //         value: 45,
    //     },
    //     {
    //         type: 'No',
    //         value: 55
    //     }
    // ]

    // useEffect(() => {
    //     if (results.length == 0) {
    //         timeLeft > -1 && setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    //     }
    // }, [timeLeft])

    // if (timeLeft === -1 && results.length == 0) {
    //     fetch(`https://tricapptest.azurewebsites.net/Question/results/${question.id}`)
    //         .then(res => res.ok ? res.json() : message.error("Data not saved"))
    //         .then(res => {
    //             console.log(res)
    //             setResults(res)

    //         })
    //         .catch(err => message.error(err))

    //     setTimeout(() => {
    //         next()
    //     }, 10000);
    // }

    let config = {
        appendPadding: 10,
        data: results,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        legend: false,
        label: {
            type: 'spider',
            offset: '',
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

    return (
        <>
            {/* <div style={{ color: "#FF01FF" }}>This wll show the same thing as the screen on stage</div> */}
            <h2>{label}</h2>
            {/* {timeLeft > -1 && results.length == 0 ?
                <h1>{timeLeft}</h1> : */}

            <Pie {...config} />
            {/* } */}
        </>
    )
}

export default Info