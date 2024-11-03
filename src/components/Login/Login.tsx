import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import '../Auth/auth/auth.sass'
import { LoginFormType } from '../../types/type'
import Auth from '../Auth/Auth'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchLogin } from '../../store/blogSlice'

const Login = () => {
  const { error, loggedIn, loading } = useAppSelector((store) => store.blog)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>()

  const onSubmit = (values: LoginFormType) => {
    dispatch(fetchLogin(values))
  }

  useEffect(() => {
    if (error?.errors?.['email or password']) {
      setError('email', { type: 'server', message: `email or password ${error.errors['email or password']}` })
      setError('password', { type: 'server', message: `email or password ${error.errors['email or password']}` })
    }
    if (loggedIn) {
      navigate('/articles')
    }
  }, [loggedIn, error])

  return (
    <Auth title="Sign In" text="Don’t have an account?" link="Sign Up.">
      <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email" className="auth__label">
          Email address
          <input
            placeholder="Email address"
            className={`auth__input ${errors.email ? 'auth__input_error' : ''}`}
            id="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <span className="auth__error-message">{errors.email.message}</span>}
        </label>

        <label htmlFor="password" className="auth__label">
          Password
          <input
            placeholder="Password"
            className={`auth__input ${errors.password ? 'auth__input_error' : ''}`}
            id="password"
            {...register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && <span className="auth__error-message">{errors.password.message}</span>}
        </label>

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? 'Login...' : 'Login'}
        </button>
      </form>
    </Auth>
  )
}

export default Login
