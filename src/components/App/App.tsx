import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import Header from '../Header/Header'
import './app/app.sass'
import CardsList from '../CardsList/CardsList'
import Article from '../Article/Article'
import Login from '../Login/Login'
import Register from '../Register/Register'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import { fetchGetUserInfo, logOut } from '../../store/blogSlice'
import EditProfile from '../EditProfile/EditProfile'

const App = () => {
  const auth = useAppSelector((store) => store.blog.loggedIn)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const token = localStorage.getItem('jwt')
    if (token) {
      dispatch(fetchGetUserInfo(token))
    } else {
      dispatch(logOut())
    }
  }, [])

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<PrivateRoute auth={auth} element={<CardsList />} />} />
        <Route path="/articles" element={<PrivateRoute auth={auth} element={<CardsList />} />} />
        <Route path="/articles/:slug" element={<PrivateRoute auth={auth} element={<Article />} />} />
        <Route path="/profile" element={<PrivateRoute auth={auth} element={<EditProfile />} />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/sign-up" element={<Register />} />
      </Routes>
    </div>
  )
}

export default App
