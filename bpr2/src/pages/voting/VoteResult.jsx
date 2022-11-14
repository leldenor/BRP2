import { useEffect, useState } from "react"
import Results from "./results"
import { message, Button, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'
import { Pie } from '@ant-design/plots';

const VoteResult = ({ showState }) => {

    const navigate = useNavigate()

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
    console.log("State ", showState.results, data);
    const config = {
        appendPadding: 10,
        data: showState.results,
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
                color: "black",
            },
        },
        interactions: [
            {
                type: 'element-active',
            },
        ],
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
            <Pie {...config} />
            {showState.showState == 7 && <Button onClick={() => navigate("/results")}>Check my results</Button>}
        </div>
    )

}

export default VoteResult