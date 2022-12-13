import React from 'react';
import ReactDOM from 'react-dom/client';
import { HubConnectionBuilder } from "@microsoft/signalr"
import { useState, useRef, useEffect } from "react"
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'antd/dist/antd.min.css'
import './index.css';
import App from './App';

export default function Home() {
  const [connection, setConnection] = useState(null)
  const [stateOfShow, setStateOfTheShow] = useState({})
  const [timer, setTimer] = useState(0)
  const latestQuestion = useRef(null)

  latestQuestion.current = stateOfShow

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
            setStateOfTheShow(message)
          })
          connection.on("ReceiveTimer", res => {
            setTimer(res)
          })
        })
        .catch(e => console.log("Connection failed: ", e))
    }
  }, [connection])
  return <App showState={stateOfShow} timer={timer} />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
);

