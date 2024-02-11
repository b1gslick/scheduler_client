import React from 'react'
import { createRoot } from 'react-dom/client'
import { AppHeader } from './components/layout/header'
import { App } from './components/App'
import { Footer } from './components/layout/footer'
import './globa.module.scss'

const root = document.getElementById('root') as HTMLElement
createRoot(root).render(
  <React.StrictMode>
    <AppHeader />
    <App />
    <App />
    <Footer />
  </React.StrictMode>,
)
