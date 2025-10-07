import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import SuperBoard from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SuperBoard />
  </StrictMode>,
)
