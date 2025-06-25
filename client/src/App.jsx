import { useState } from 'react'
import '../style/App.css'
import { BrowserRouter , Routes , Route } from "react-router-dom"

import Home from './Home'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
