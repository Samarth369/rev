import { useState } from 'react'
import '../style/App.css'
import { BrowserRouter , Routes , Route } from "react-router-dom"

import Home from './Home'
import Dashboard from './Dashboard'
import Createrev from './Createrev'
import Rev from './Rev'

function App() {

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/createrev' element={<Createrev />} />
        <Route path='/rev/:id' element={<Rev />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
