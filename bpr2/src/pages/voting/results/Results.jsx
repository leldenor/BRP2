import { Button, Typography, message } from "antd"
import { useEffect, useState } from "react";
import { Pie } from '@ant-design/plots';
import { useSelector } from "react-redux";
import EndShowStats from "../../manager/showrun/EndShowStats";
import Goodbye from "./goodbye";
import './Results.css'
const { Title } = Typography;

const Results = () => {
    const [page, setPage] = useState("result")
    const [results, setResults] = useState([])

    const user = useSelector((state) => state.auth);
    const endPage = () => {
        setPage("goodbye")
    }

    if (page == "result") {

        return (
            <div>
                <div>Results</div>
                <div className="button-div">
                    <Button className="answerButton" onClick={endPage} style={{ justifyContent: "flex-start" }}>Next</Button>
                </div>
            </div>
        )
    }
    else {
        return (
            <Goodbye />
        )
    }

    // useEffect(() => {
    //     fetch(`https://localhost:5001/Results/${user.user.ticketid}`, { method: 'POST' })
    //         .then(res => res.ok ? res.json() : message.error("Data not saved"))
    //         .then(res => {
    //             console.log(res)
    //             setResults(res)
    //         })
    //         .catch(err => message.error(err))
    // }, [])


    // const endPage = () => {
    //     setPage("goodbye")
    // }

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

    // const config = {
    //     appendPadding: 10,
    //     data: results[0].result,
    //     angleField: 'value',
    //     colorField: 'type',
    //     radius: 0.9,
    //     label: {
    //         type: 'inner',
    //         offset: '-30%',
    //         content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
    //         style: {
    //             fontSize: 30,
    //             textAlign: 'center',
    //         },
    //     },
    //     interactions: [
    //         {
    //             type: 'element-active',
    //         },
    //     ],
    //     color: ({ type }) => {
    //         if (type == 'Yes') {
    //             return '#FF01FF';
    //         }
    //         return '#ECEAE1';
    //     }
    // }

    // const config2 = {
    //     appendPadding: 10,
    //     data: results[1].result,
    //     angleField: 'value',
    //     colorField: 'type',
    //     radius: 0.9,
    //     label: {
    //         type: 'inner',
    //         offset: '-30%',
    //         content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
    //         style: {
    //             fontSize: 30,
    //             textAlign: 'center',
    //         },
    //     },
    //     interactions: [
    //         {
    //             type: 'element-active',
    //         },
    //     ],
    //     color: ({ type }) => {
    //         if (type == 'Yes') {
    //             return '#FF01FF';
    //         }
    //         return '#ECEAE1';
    //     }
    // }

    // const config3 = {
    //     appendPadding: 10,
    //     data: results[2].result,
    //     angleField: 'value',
    //     colorField: 'type',
    //     radius: 0.9,
    //     label: {
    //         type: 'inner',
    //         offset: '-30%',
    //         content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
    //         style: {
    //             fontSize: 30,
    //             textAlign: 'center',
    //         },
    //     },
    //     interactions: [
    //         {
    //             type: 'element-active',
    //         },
    //     ],
    //     color: ({ type }) => {
    //         if (type == 'Yes') {
    //             return '#FF01FF';
    //         }
    //         return '#ECEAE1';
    //     }
    // }

    // const config4 = {
    //     appendPadding: 10,
    //     data: results[3].result,
    //     angleField: 'value',
    //     colorField: 'type',
    //     radius: 0.9,
    //     label: {
    //         type: 'inner',
    //         offset: '-30%',
    //         content: ({ percent, type }) => `${type} ${(percent * 100).toFixed(0)}%`,
    //         style: {
    //             fontSize: 30,
    //             textAlign: 'center',
    //         },
    //     },
    //     interactions: [
    //         {
    //             type: 'element-active',
    //         },
    //     ],
    //     color: ({ type }) => {
    //         if (type == 'Yes') {
    //             return '#FF01FF';
    //         }
    //         return '#ECEAE1';
    //     }
    // }


    // if (page == "result") {
    //     return (
    //         <div>
    //             <h3>Results</h3>
    //             <div>
    //                 <h3>{results[0].question1.questionLong}</h3>
    //                 <Pie {...config} />
    //             </div>
    //             <div>
    //                 <h3>{results[1].question1.questionLongt}</h3>
    //                 <Pie {...config2} />
    //             </div>
    //             <div>
    //                 <h3>{results[2].question1.questionLong}</h3>
    //                 <Pie {...config3} />
    //             </div>
    //             <div>
    //                 <h3>{results[3].question1.questionLong}</h3>
    //                 <Pie {...config4} />
    //             </div>
    //             <div className="button-div">
    //                 <Button className="answerButton" onClick={endPage} style={{ justifyContent: "flex-start" }}>Next</Button>
    //             </div>
    //         </div>
    //     )
    // }
    // else {
    //     return (
    //         <Goodbye />
    //     )
    // }
}

export default Results