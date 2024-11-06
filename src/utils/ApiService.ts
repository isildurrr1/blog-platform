import {
  ArticleFormType,
  EditFormType,
  FetchArtResType,
  FetchPostArtResType,
  FetchRegResType,
  LoginFormType,
  RegErrorType,
  RegFormType,
} from '../types/type'

class ApiService {
  static baseUrl = 'https://blog-platform.kata.academy/api'

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

  static async updateUserInfo(user: EditFormType): Promise<FetchRegResType> {
    const token = localStorage.getItem('jwt')
    const { username, email, image, password } = user

    const newUser: EditFormType = { username, email }
    if (image) newUser.image = image
    if (password) newUser.password = password

    const response = await fetch(`${this.baseUrl}/user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ user: newUser }),
    })

    if (!response.ok) {
      const errorData: RegErrorType = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const updatedUser: FetchRegResType = await response.json()
    localStorage.setItem('jwt', updatedUser.user.token)
    return updatedUser
  }

  static async newArticle(article: ArticleFormType): Promise<FetchPostArtResType> {
    const token = localStorage.getItem('jwt')
    const response = await fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ article }),
    })

    if (!response.ok) {
      const errorData: RegErrorType = await response.json()
      throw new Error(JSON.stringify(errorData))
    }

    const newArticle: FetchPostArtResType = await response.json()
    return newArticle
  }

  static async getArticle(slug: string | undefined): Promise<FetchPostArtResType> {
    const response = await fetch(`${this.baseUrl}/articles/${slug}`)
    const article: FetchPostArtResType = await response.json()
    return article
  }

  static async deleteArticle(slug: string) {
    const token = localStorage.getItem('jwt')
    const response = await fetch(`${this.baseUrl}/articles/${slug}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    if (response.ok) {
      return true
    }
    return false
  }
}

export default ApiService
