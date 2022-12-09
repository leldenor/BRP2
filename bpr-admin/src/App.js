import { HubConnectionBuilder } from "@microsoft/signalr"
import { useState, useRef, useEffect } from "react"
import Show from "./pages/showrun/Show";
import ManagerLayout from "./pages/manager/ManagerLayout";
import logo from './logo.svg';
import './App.css';

function App() {
  const [connection, setConnection] = useState(null)
  const [isShowStarted, setIsShowStarted] = useState(false)
  const [stateOfTheShow, setStateOfTheShow] = useState({})
  const [timer, setTimer] = useState(0)
  const latestState = useRef(null)

  latestState.current = stateOfTheShow

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://localhost:5001/hubs/show')
      .withAutomaticReconnect()
      .build()

    setConnection(newConnection)
  }, [])

  useEffect(() => {
    if (connection) {
      connection.start()
        .then(result => {
          console.log("Connected", connection);

          connection.on('ReceiveMessage', message => {
            console.log(message);
            setStateOfTheShow(message)
          })
          connection.on("ReceiveTimer", res => {
            console.log(res);
            setTimer(res)
          })
        })
        .catch(e => console.log("Connection failed: ", e))
    }
  }, [connection])

  const sendMessage = async (question) => {

    try {
      await fetch('https://localhost:5001/show/messages', {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    catch (e) {
      console.log('Sending message failed.', e);
    }
  }

  //send what kind of button is pressed and answer is state of the show with question and timer and results depending on button pressed
  const sendStateOfShow = async (state) => {
    console.log(state);
    try {
      const res = await fetch('https://localhost:5001/show/messages', {
        method: 'POST',
        body: JSON.stringify(state),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log(res);
    }
    catch (e) {
      console.log('Sending message failed.', e);
    }
  }
  console.log(stateOfTheShow);
  return (
    <div>
      <main>
        {isShowStarted ?
          <Show sendStateOfShow={sendStateOfShow} showState={stateOfTheShow} setIsShowStarted={setIsShowStarted} timer={timer} />
          : <ManagerLayout setIsShowStarted={setIsShowStarted} />}
      </main>
    </div>
  );
}

export default App;
