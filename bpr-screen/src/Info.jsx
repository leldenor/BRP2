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
        data: data,
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
                fill: '#ECEAE1'
            },
        },
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
