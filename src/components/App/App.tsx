import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import './app/app.sass'
import CardsList from '../CardsList/CardsList'
import Article from '../Article/Article'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<CardsList />} />
        <Route path="/articles" element={<CardsList />} />
        <Route path="/articles/:slug" element={<Article />} />
      </Routes>
    </div>
  )
}

export default App
