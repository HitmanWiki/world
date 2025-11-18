import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import { WagmiProvider } from 'wagmi'
import { config } from './app.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <App />
    </WagmiProvider>
  </React.StrictMode>,
)