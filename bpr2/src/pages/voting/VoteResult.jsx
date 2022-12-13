import { useEffect, useState } from "react"
import Results from "./results"
import { message, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { Pie } from '@ant-design/plots';

const VoteResult = ({ showState }) => {

    if (showState.results == null) {
        return (
            <div className='spin'>
                <Spin indicator={<LoadingOutlined
                    style={{
                        fontSize: 100,
                        color: "#ECEAE1"
                    }}
                    spin
                />} />
            </div>
        )
    }

    const config = {
        appendPadding: 10,
        data: showState.results,
        angleField: 'value',
        colorField: 'type',
        radius: 0.9,
        legend: false,
        autoFit: true,
        label: {
            type: 'outer',
            offset: '20%',
            content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
            style: {
                fontSize: 20,
                textAlign: 'center',
                fill: "#ECEAE1",
                fontFamily: "Nova Flat"
            },
        },
        color: ({ type }) => {
            if (type == 'Yes') {
                return '#FF01FF';
            }
            return 'black';
        },
        style: {
            stroke: 'black'
        }
    }

    return (
        <div>
            <h3>{showState.currentQuestion.questionShort}</h3>
            <Pie height={200} width={100} {...config} />
        </div>
    )

}

export default VoteResult