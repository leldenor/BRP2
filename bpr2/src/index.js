import ReactDOM from "react-dom/client";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'antd/dist/antd.min.css'
import { HubConnectionBuilder } from "@microsoft/signalr"
import { useState, useRef, useEffect } from "react"
import { Provider } from 'react-redux'
import store from './store'
import Welcome from "./Welcome";
import './index.css'

export default function App() {
  const [connection, setConnection] = useState(null)
  const [question, setQuestion] = useState({})
  const [stateOfTheShow, setStateOfTheShow] = useState({})
  const latestState = useRef(null)

  latestState.current = stateOfTheShow

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('https://tricapptest.azurewebsites.net/hubs/show')
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

  // return (

  // <BrowserRouter>
  //   <Routes>
  //     <Route path="/" element={<Layout />}>
  //       <Route index element={<MainLayout question={question} />} />
  //       <Route path="manager" element={<ManagerLayout sendMessage={sendMessage} question={question} />} />
  //       <Route path="manager/show" element={<Show sendStateOfShow={sendStateOfShow} showState={stateOfTheShow} />} />
  //       <Route path="voting" element={<div className='content'>
  //         <div className='project-logo'>
  //           <p style={{ margin: 0 }}>TRIC</p>
  //         </div>
  //         <div className='project-name'>
  //           <p>THE RIGHT CHOICE</p>
  //         </div>
  //         <Voting question={question} showState={stateOfTheShow} />
  //       </div>

  //       } />
  //       <Route path="results" element={
  //         <div className='content'>
  //           <div className='project-logo'>
  //             <p style={{ margin: 0 }}>TRIC</p>
  //           </div>
  //           <div className='project-name'>
  //             <p>THE RIGHT CHOICE</p>
  //           </div>
  //           <Results />
  //         </div>

  //       } />
  //     </Route>
  //   </Routes>
  // </BrowserRouter>
  // );
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Welcome />
  </Provider>
)
