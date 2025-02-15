import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ConfigProvider } from 'antd'
import './index.css'
import App from './App.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        token:{
          colorPrimary:'#2E3840'
        }
      }}
    >
      <App />
    </ConfigProvider>
  </StrictMode>
)
