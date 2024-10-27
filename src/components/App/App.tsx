import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import CardsList from '../CardsList/CardsList'
import './app/app.sass'
import Main from '../Main/Main'

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <Main>
              <CardsList />
            </Main>
          }
        />
        <Route path="/articles" element={<h1>Hello</h1>} />
      </Routes>
    </div>
  )
}

export default App
