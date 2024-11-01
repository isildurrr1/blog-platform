import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import './app/app.sass'
import CardsList from '../CardsList/CardsList'
import Article from '../Article/Article'
import Login from '../Login/Login'
import Register from '../Register/Register'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<CardsList />} />
        <Route path="/articles" element={<CardsList />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
        {/* <Route path="/profile" element={<CardsList />} /> */}
      </Routes>
    </div>
  )
}

export default App
