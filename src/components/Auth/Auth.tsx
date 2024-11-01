import { AuthProps } from '../../types/type'

const Auth: React.FC<AuthProps> = ({ title, text, link, children }) => {
  return (
    <div className="auth">
      <div className="auth__container">
        <h4 className="auth__title">{title}</h4>
        {children}
        <p className="auth__text">
          {text}
          <button type="button" className="auth__link">
            {link}
          </button>
        </p>
      </div>
    </div>
  )
}

export default Auth
