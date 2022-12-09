import { Button, Typography, message } from "antd"
import { useEffect, useState } from "react";
import { Pie } from '@ant-design/plots';
import { useSelector } from "react-redux";
import Goodbye from "./goodbye";
import './Results.css'
const { Title } = Typography;

const Results = ({ setLayout }) => {
    const [page, setPage] = useState("result")
    const [results, setResults] = useState([])

    const user = useSelector((state) => state.auth);
    const endPage = () => {
        setPage("goodbye")
    }
    return (
        <>
            <div>Hello</div>
            <Goodbye setLayout={() => setLayout()} />
        </>
    )

}

export default Results