import { FetchArtResType, FetchRegResType, LoginFormType, RegErrorType, RegFormType } from '../types/type'

class ApiService {
  static baseUrl = 'https://blog-platform.kata.academy/api'

  static async getArticles(page: number): Promise<FetchArtResType> {
    const token = localStorage.getItem('jwt')
    const response = await fetch(`${this.baseUrl}/articles?limit=5&offset=${(page - 1) * 5}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    return response.json()
  }

  static async registration(user: RegFormType): Promise<FetchRegResType> {
    const { username, email, password } = user

    const response = await fetch(`${this.baseUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { username, email, password } }),
    })

    if (!response.ok) {
      const errorData: RegErrorType = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const newUser: FetchRegResType = await response.json()
    localStorage.setItem('jwt', newUser.user.token)
    return newUser
  }

  static async getUserInfo(token: string): Promise<FetchRegResType> {
    const response = await fetch(`${this.baseUrl}/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error('Failed to fetch user info')
    }

    const info = await response.json()
    localStorage.setItem('jwt', info.user.token)
    return info
  }

  static async login(user: LoginFormType): Promise<FetchRegResType> {
    const { email, password } = user

    const response = await fetch(`${this.baseUrl}/users/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user: { email, password } }),
    })

    if (!response.ok) {
      const errorData: RegErrorType = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const authUser: FetchRegResType = await response.json()
    localStorage.setItem('jwt', authUser.user.token)
    return authUser
  }
}

export default ApiService
