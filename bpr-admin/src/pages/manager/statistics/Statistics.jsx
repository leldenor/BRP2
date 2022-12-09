import { Button } from "antd"
import { useEffect, useState } from "react"

const Statistics = ({ homePage, sendMessage }) => {
    const [showFile, setShowFile] = useState({})
    useEffect(() => {
        console.log("Here");
        fetch(`https://localhost:5001/Question/stats/11212022.json`, { method: 'GET' })
            .then(res => res.ok ? res : console.log(res))
            .then(res => res.json())
            .then(
                data => {
                    console.log(data);
                    setShowFile(data)
                }
            )
            .catch(err => console.log(err))
    }, [])

    const exportData = () => {
        const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
            JSON.stringify(showFile)
        )}`;
        const link = document.createElement("a");
        link.href = jsonString;
        link.download = "data.json";

        link.click();
    }
    return (
        <div>
            <Button onClick={() => homePage("home")}>Home</Button>
            <Button onClick={exportData}>Yes</Button>
            <div>Statistics</div>
        </div>
    )
}

export default Statistics