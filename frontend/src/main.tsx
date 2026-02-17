import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId='1013760409202-j3b9ts1m7mqj2mtqop7bfc1vme75pqc5.apps.googleusercontent.com'>
        <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
