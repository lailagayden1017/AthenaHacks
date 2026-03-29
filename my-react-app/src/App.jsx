import { useState } from 'react'
import { Routes, Route } from 'react-router'
import StartPage from './components/StartPage'
import Form from './components/Form'
import './App.css'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/budgeting-form" element={<Form />} />3
      </Routes>
    </>
  )
}

export default App
