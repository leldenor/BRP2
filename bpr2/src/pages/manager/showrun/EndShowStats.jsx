import { Button } from "antd"
import { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';

const EndShowStats = ({ contents, questions }) => {
    console.log("Here");
    const data1 = [
        {
            type: 'Yes',
            value: 45,
        },
        {
            type: 'No',
            value: 55
        }
    ]

    const config1 = {
        appendPadding: 10,
        data: data1,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }

    const data2 = [
        {
            type: 'Yes',
            value: 25,
        },
        {
            type: 'No',
            value: 75
        }
    ]

    const config2 = {
        appendPadding: 10,
        data: data2,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }
    const data3 = [
        {
            type: 'Yes',
            value: 35,
        },
        {
            type: 'No',
            value: 65
        }
    ]

    const config3 = {
        appendPadding: 10,
        data: data3,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }
    const data4 = [
        {
            type: 'Yes',
            value: 50,
        },
        {
            type: 'No',
            value: 50
        }
    ]

    const config4 = {
        appendPadding: 10,
        data: data4,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
                textAlign: 'center',
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
    }
    const data5 = [
        {
            type: 'Yes',
            value: 70,
        },
        {
            type: 'No',
            value: 30
        }
    ]

    const config5 = {
        appendPadding: 10,
        data: data5,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        label: {
            type: 'inner',
            offset: '-30%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 10,
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
            <div style={{ color: "#FF01FF" }}>This will show end statistics the same as on the screen but with additional options like:</div>
            <div style={{ width: "100vh" }}>
                <div style={{ height: "300px", width: "30vh", float: "left" }}>
                    <h6>{questions[0].label}</h6>
                    <Pie {...config1} />
                </div>
                <div style={{ height: "300px", width: "30vh", float: "left" }}>
                    <h6>{questions[1].label}</h6>
                    <Pie {...config2} />
                </div>
                <div style={{ height: "300px", width: "30vh", float: "left" }}>
                    <h6>{questions[2].label}</h6>
                    <Pie {...config3} />
                </div>
                <div style={{ height: "300px", width: "30vh", float: "left" }}>
                    <h6>{questions[3].label}</h6>
                    <Pie {...config4} />
                </div>
                <div style={{ height: "300px", width: "30vh", float: "left" }}>
                    <h6>{questions[4].label}</h6>
                    <Pie {...config5} />
                </div>
            </div>
            <div>
                <Button onClick={() => contents("home")}>Home page</Button>
                <Button onClick={() => contents("stats")}>More stats</Button>
            </div>
        </>
    )
}

export default EndShowStats