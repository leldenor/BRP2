import { useEffect, useState } from 'react';
import { message } from 'antd';
import { Pie } from '@ant-design/plots';
import './App.css';

const Info = ({ results, label }) => {

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
        data: results,
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
        color: ({ type }) => {
            if (type == 'Yes') {
                return '#FF01FF';
            }
            return 'black';
        }
    }
    return (
        <div>
            <Pie {...config} />
        </div>
    );
}

export default Info;
