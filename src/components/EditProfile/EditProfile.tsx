// import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'

// import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { useAppSelector } from '../../hooks/hooks'
import Auth from '../Auth/Auth'
import { EditFormType } from '../../types/type'

const EditProfile = () => {
  const { error, user, loading } = useAppSelector((store) => store.blog)
  // const dispatch = useAppDispatch()
  // const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
  } = useForm<EditFormType>()

  const onSubmit = (values: EditFormType) => {
    console.log(values)
  }

  useEffect(() => {
    if (user?.user.username) {
      setValue('username', user?.user.username)
      setValue('email', user?.user.email)
    }
  }, [user])

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
  }, [error, setError])

  return (
    <Auth title="Edit Profile">
      <form action="" className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username" className="auth__label">
          Username
          <input
            defaultValue={user?.user.username}
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
            defaultValue={user?.user.email}
            placeholder="Email address"
            id="email"
            className={`auth__input ${errors.email ? 'auth__input_error' : ''}`}
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
          New password
          <input
            placeholder="Password"
            id="password"
            className={`auth__input ${errors.password ? 'auth__input_error' : ''}`}
            {...register('password', {
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

        <label htmlFor="avatar" className="auth__label">
          Avatar image (url)
          <input
            placeholder="Avatar image"
            id="avatar"
            className={`auth__input ${errors.avatar ? 'auth__input_error' : ''}`}
            {...register('avatar', {
              pattern: {
                value: /^(https?:\/\/[^\s]+)$/,
                message: 'Please enter a valid URL',
              },
            })}
          />
          {errors.avatar && <span className="auth__error-message">{errors.avatar.message}</span>}
        </label>
        <button type="submit" className="auth__submit" disabled={loading}>
          {loading ? 'Save...' : 'Save'}
        </button>
      </form>
    </Auth>
  )
}

export default EditProfile
