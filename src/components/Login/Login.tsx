import { AuthDataType } from '../../types/type'
import Auth from '../Auth/Auth'
import './login/login.sass'

const Login = () => {
  const loginData: AuthDataType = {
    title: 'Sign In',
    btnText: 'Login',
    pText: 'Don’t have an account?',
    linkText: 'Sign Up.',
  }
  return (
    <Auth data={loginData}>
      <label htmlFor="email" className="login__label">
        Email address
        <input placeholder="Email address" id="email" name="email" className="login__input" />
      </label>
      <label htmlFor="password" className="login__label">
        Password
        <input placeholder="Password" id="password" name="password" className="login__input" />
      </label>
    </Auth>
  )
}

export default Login
