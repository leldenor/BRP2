import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import { HubConnectionBuilder } from "@microsoft/signalr"
import { useState, useRef, useEffect } from "react"
import ManagerLayout from "./pages/manager/ManagerLayout";
import MainLayout from "./pages/viewer/MainLayout";
import Voting from "./pages/voting";
import { Provider } from 'react-redux'
import store from './store'
import Show from "./pages/manager/showrun/Show";
import Results from "./pages/voting/results";

export default function App() {
  const [connection, setConnection] = useState(null)
  const [question, setQuestion] = useState({})
  const [stateOfTheShow, setStateOfTheShow] = useState({})
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
          console.log("Connected");

          connection.on('ReceiveMessage', message => {
            console.log(message);
            setStateOfTheShow(message)
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
  const sendStateOfShow = async (stateOfTheShow) => {
    console.log(stateOfTheShow);
    try {
      await fetch('https://localhost:5001/show/messages', {
        method: 'POST',
        body: JSON.stringify(stateOfTheShow),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
    catch (e) {
      console.log('Sending message failed.', e);
    }
  }


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainLayout question={question} />} />
          <Route path="manager" element={<ManagerLayout sendMessage={sendMessage} question={question} />} />
          <Route path="manager/show" element={<Show sendStateOfShow={sendStateOfShow} showState={stateOfTheShow} />} />
          <Route path="voting" element={<div className='content'>
            <div className='project-logo'>
              <p style={{ margin: 0 }}>TRIC</p>
            </div>
            <div className='project-name'>
              <p>THE RIGHT CHOICE</p>
            </div>
            <Voting question={question} showState={stateOfTheShow} />
          </div>

          } />
          <Route path="results" element={
            <div className='content'>
              <div className='project-logo'>
                <p style={{ margin: 0 }}>TRIC</p>
              </div>
              <div className='project-name'>
                <p>THE RIGHT CHOICE</p>
              </div>
              <Results />
            </div>

          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
