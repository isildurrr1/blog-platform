import { useNavigate } from 'react-router-dom'

import { AuthProps } from '../../types/type'

const Auth: React.FC<AuthProps> = ({ title, text, link, children }) => {
  const navigation = useNavigate()
  const handleLink = () => (link === 'Sign Up.' ? navigation('/sign-up') : navigation('/sign-in'))

  return (
    <div className="auth">
      <div className="auth__container">
        <h4 className="auth__title">{title}</h4>
        {children}
        {text && (
          <p className="auth__text">
            {text}
            <button type="button" className="auth__link" onClick={() => handleLink()}>
              {link}
            </button>
          </p>
        )}
      </div>
    </div>
  )
}

export default Auth
