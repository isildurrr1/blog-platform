import { AuthDataType } from '../../types/type'
import Auth from '../Auth/Auth'
import './register/register.sass'

const Register = () => {
  const regData: AuthDataType = {
    title: 'Create new account',
    btnText: 'Create',
    pText: 'Already have an account?',
    linkText: 'Sign In.',
  }
  return (
    <Auth data={regData}>
      <label htmlFor="username" className="register__label">
        Username
        <input placeholder="Username" id="username" name="username" className="register__input" />
      </label>
      <label htmlFor="email" className="register__label">
        Email address
        <input placeholder="Email address" id="email" name="email" className="register__input" />
      </label>
      <label htmlFor="password" className="register__label">
        Password
        <input placeholder="Password" id="password" name="password" className="register__input" />
      </label>
      <label htmlFor="repeatPas" className="register__label">
        Repeat Password
        <input placeholder="Password" id="repeatPas" name="repeatPas" className="register__input" />
      </label>
      <label htmlFor="checkbox" className="register__checkbox-label">
        <input className="register__checkbox" type="checkbox" id="checkbox" name="checkbox" />
        <span className="register__custom-checkbox" /> I agree to the processing of my personal information
      </label>
    </Auth>
  )
}

export default Register
