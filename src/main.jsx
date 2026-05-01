import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { PrincipitoProvider } from './context/PrincipitoContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <PrincipitoProvider>
        <App />
      </PrincipitoProvider>
    </HashRouter>
  </React.StrictMode>
)
