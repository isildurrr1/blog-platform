import './header/header.sass'
import { Button, ConfigProvider } from 'antd'

const Header = () => {
  const SugnUpButtonConfig = {
    components: {
      Button: {
        defaultColor: '#52C41A',
        defaultBorderColor: '#52C41A',
        defaultHoverBorderColor: '#4CAF50',
        defaultHoverColor: '#4CAF50',
        defaultActiveBorderColor: '#A5D6A7',
        defaultActiveColor: '#A5D6A7',
      },
    },
  }
  return (
    <header className="header">
      <div className="header__container">
        <h6 className="header__title">Realworld Blog</h6>
        <Button type="text" size="large" className="header__button">
          Sign In
        </Button>
        <ConfigProvider theme={SugnUpButtonConfig}>
          <Button size="large" variant="outlined" className="header__button">
            Sign Up
          </Button>
        </ConfigProvider>
      </div>
    </header>
  )
}

export default Header
