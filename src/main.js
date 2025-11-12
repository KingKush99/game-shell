// src/main.js (pure JavaScript, no JSX)
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // This imports JSX from another file (OK)
import './index.css'

// Create root element using pure JS
const root = ReactDOM.createRoot(document.getElementById('root'))

// Render using React.createElement (no JSX syntax)
root.render(
  React.createElement(React.StrictMode, null, 
    React.createElement(App, null)
  )
)
