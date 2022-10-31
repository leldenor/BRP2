import { useEffect } from "react"

const StandBy = ({ active }) => {
    useEffect(() => {
        setTimeout(() => {
            active(true)
        }, 5000);
    }, [])
    return (
        <></>
    )
}

export default StandBy