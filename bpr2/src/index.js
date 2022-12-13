import ReactDOM from "react-dom/client";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'antd/dist/antd.min.css'
import { Provider } from 'react-redux'
import store from './store'
import Welcome from "./Welcome";
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <Welcome />
  </Provider>
)
