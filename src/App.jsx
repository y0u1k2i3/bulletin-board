import { useState } from 'react'
import Header from './Header'
import ThreadList from './ThreadList'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CreateThread from './createthread'
import EachThread from './EachThread'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<ThreadList />} />
          <Route path='/thread/new' element={<CreateThread />} />
          <Route path='/threads/:thread_id' element={<EachThread />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
