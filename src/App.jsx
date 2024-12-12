import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router";
import { HomePage } from './pages/home';
import './index.css'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
