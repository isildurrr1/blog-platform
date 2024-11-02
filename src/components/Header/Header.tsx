import { Link, useNavigate } from 'react-router-dom'
import { Button, ConfigProvider } from 'antd'

import './header/header.sass'
import { useAppSelector } from '../../hooks/hooks'
import { LogOutButtonConfig, SugnUpButtonConfig } from '../../utils/buttonConfig'

const Header = () => {
  const navigate = useNavigate()
  const { loggedIn, user } = useAppSelector((store) => store.blog)
  console.log(user)

  return (
    <header className="header">
      <div className="header__container">
        <Link to="/" className="header__link">
          <h6 className="header__title">Realworld Blog</h6>
        </Link>
        {loggedIn ? (
          <div className="header__user-info">
            <ConfigProvider theme={SugnUpButtonConfig}>
              <Button variant="outlined" className="header__button">
                Create article
              </Button>
            </ConfigProvider>
            <button type="button" className="header__user" onClick={() => navigate('/profile')}>
              <h5 className="header__name">{user?.user.username}</h5>
              <img src={user?.user.image || './images/avatar.png'} alt="avatar" className="header__avatar" />
            </button>
            <ConfigProvider theme={LogOutButtonConfig}>
              <Button size="large" variant="outlined" className="header__button" onClick={() => console.log('lol')}>
                Log Out
              </Button>
            </ConfigProvider>
          </div>
        ) : (
          <>
            <Button type="text" size="large" className="header__button" onClick={() => navigate('/sign-in')}>
              Sign In
            </Button>
            <ConfigProvider theme={SugnUpButtonConfig}>
              <Button size="large" variant="outlined" className="header__button" onClick={() => navigate('/sign-up')}>
                Sign Up
              </Button>
            </ConfigProvider>
          </>
        )}
      </div>
    </header>
  )
}

export default Header
