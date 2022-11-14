import { Button } from "antd"
import { useNavigate } from 'react-router-dom'

import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { logout } from '../../../../slices/auth'

const Goodbye = ({ setLayout, context }) => {


    const navigate = useNavigate()
    const dispatch = useDispatch();

    const logOut = useCallback(() => {
        dispatch(logout());
        navigate("/")
    }, [dispatch]);

    return (
        <div>
            <h1>
                Thank you for the show!
            </h1>
            <div className="button-div">
                <Button className="answerButton" onClick={logOut} >Home</Button>
            </div>
        </div>
    )
}

export default Goodbye