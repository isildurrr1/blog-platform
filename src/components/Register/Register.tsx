import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Auth from '../Auth/Auth'
import '../Auth/auth/auth.sass'
import { RegFormType } from '../../types/type'
import { fetchRegistration } from '../../store/blogSlice'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'

const Register = () => {
  const { error, loading, loggedIn } = useAppSelector((store) => store.blog)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setError,
  } = useForm<RegFormType>()

  const onSubmit = (values: RegFormType) => {
    dispatch(fetchRegistration(values))
  }

  useEffect(() => {
    if (error) {
      if (error.errors) {
        if (error.errors.username) {
          setError('username', { type: 'server', message: error.errors.username })
        }
        if (error.errors.email) {
          setError('email', { type: 'server', message: error.errors.email })
        }
      }
    }
    if (loggedIn) {
      navigate('/articles')
    }
  }, [loggedIn, error, setError])

  return (
    <Auth title="Create new account" text="Already have an account?" link="Sign In.">
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="auth__label">
          Username
          <input
            placeholder="Username"
            id="username"
            className={`auth__input ${errors.username ? 'auth__input_error' : ''}`}
            {...register('username', {
              required: 'Username is required',
              minLength: {
                value: 3,
                message: 'Username must be at least 3 characters long',
              },
              maxLength: {
                value: 20,
                message: 'Username cannot exceed 20 characters',
              },
            })}
          />
          {errors.username && <span className="auth__error-message">{errors.username.message}</span>}
        </label>

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
            type="password"
            placeholder="Password"
            id="password"
            className={`auth__input ${errors.password ? 'auth__input_error' : ''}`}
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters long',
              },
              maxLength: {
                value: 40,
                message: 'Password cannot exceed 40 characters',
              },
            })}
          />
          {errors.password && <span className="auth__error-message">{errors.password.message}</span>}
        </label>

        <label htmlFor="repeatPas" className="auth__label">
          Repeat Password
          <input
            type="password"
            placeholder="Repeat Password"
            id="repeatPas"
            className={`auth__input ${errors.repeatPas ? 'auth__input_error' : ''}`}
            {...register('repeatPas', {
              required: 'Please repeat your password',
              validate: (value) => {
                const { password } = getValues()
                return value === password || 'Passwords do not match'
              },
            })}
          />
          {errors.repeatPas && <span className="auth__error-message">{errors.repeatPas.message}</span>}
        </label>

        <label htmlFor="checkbox" className="auth__checkbox-label">
          <input
            className="auth__checkbox"
            type="checkbox"
            id="checkbox"
            {...register('checkbox', {
              required: 'You must agree to the processing of personal data',
            })}
          />
          <span className="auth__custom-checkbox" /> I agree to the processing of my personal information
        </label>
        {errors.checkbox && <span className="auth__error-message">{errors.checkbox.message}</span>}

        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? 'Create...' : 'Create'}
        </button>
      </form>
    </Auth>
  )
}

export default Register
