import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App'
import { LangProvider } from './context/LangContext'
import { ProjectProvider } from './context/ProjectContext'
import { SessionProvider } from './context/SessionContext'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <LangProvider>
        <ProjectProvider>
          <SessionProvider>
            <App />
          </SessionProvider>
        </ProjectProvider>
      </LangProvider>
    </HashRouter>
  </React.StrictMode>
)
