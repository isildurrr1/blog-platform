import { AuthProps } from '../../types/type'
import './auth/auth.sass'

const Auth: React.FC<AuthProps> = ({ data, children }) => {
  const { title, btnText, pText, linkText } = data
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const values: { [key: string]: string } = {}
    formData.forEach((value, key) => {
      values[key] = value as string
    })
    console.log(values)
  }
  return (
    <div className="auth">
      <div className="auth__container">
        <h4 className="auth__title">{title}</h4>
        <form action="" className="auth__form" onSubmit={(e) => handleSubmit(e)}>
          {children}
          <button type="submit" className="auth__submit">
            {btnText}
          </button>
        </form>
        <p className="auth__text">
          {pText}
          <button type="button" className="auth__link">
            {linkText}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
