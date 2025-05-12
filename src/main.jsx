import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { ProfileProvider } from './context/profileContext.jsx'

import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <ProfileProvider>
        <App />
      </ProfileProvider>

    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
