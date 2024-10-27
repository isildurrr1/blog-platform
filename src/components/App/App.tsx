import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import './app/app.sass'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<h1>Hello</h1>} />
        <Route path="/articles" element={<h1>Hello</h1>} />
      </Routes>
    </div>
  )
}

export default App
