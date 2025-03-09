import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'
import store from "./redux/store.jsx"
import {Provider} from "react-redux"
createRoot(document.getElementById('root')).render(
  <Provider
    store={store}
  >
    <ConfigProvider
      theme={{
        token:{
          colorPrimary:'#2E3840',
          colorBorder: '#2E3840'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>
)
