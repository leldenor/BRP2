import { Button } from 'antd'
import { useDispatch } from "react-redux"
import { useCallback } from "react"
import { logout } from '../../slices/auth'
import { useNavigate } from 'react-router-dom'

const HomePage = ({ getContent }) => {


    const dispatch = useDispatch();
    const navigate = useNavigate()

    const logOut = useCallback(() => {
        dispatch(logout());
        navigate("/")
    }, [dispatch]);

    return (
        <div>
            <div>
                <Button onClick={logOut}>Logout</Button>
            </div>
            <div className="button-div">
                <Button
                    className="answerButton"
                    style={{ fontSize: "50px", width: "500px", height: "100px" }}
                    onClick={() => getContent("manage")}
                >
                    Manage questions
                </Button>
            </div>
            <div className="button-div">
                <Button
                    className="answerButton"
                    style={{ fontSize: "50px", width: "500px", height: "100px" }}
                    onClick={() => navigate("/manager/show")}
                >
                    Start the show
                </Button>
            </div>
            <div className="button-div">
                <Button
                    className="answerButton"
                    style={{ fontSize: "50px", width: "500px", height: "100px" }}
                    onClick={() => getContent("stats")}
                >
                    Statistics
                </Button>
            </div>
        </div>
    )
}

export default HomePage