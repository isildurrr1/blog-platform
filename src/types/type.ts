import { ReactElement } from 'react'

export interface BlogInitStateType {
  list: ArticleType[]
  articlesCount: number
  loading: boolean
  loggedIn: boolean
  error: RegErrorType | null
  user: null | FetchRegResType
}

export interface AuthorType {
  username: string
  image: string
  following: boolean
}

export interface ArticleType {
  slug: string
  title: string
  description: string
  body: string
  createdAt: string
  updatedAt: string
  tagList: string[]
  favorited: boolean
  favoritesCount: number
  author: AuthorType
}

export interface CardProps {
  data: ArticleType
  type: 'card' | 'article'
}

export interface FetchArtResType {
  articles: ArticleType[]
  articlesCount: number
}

export interface LoginFormType {
  email: string
  password: string
}

export interface RegFormType {
  username: string
  email: string
  password: string
  repeatPas: string
  checkbox: boolean
}

export interface EditFormType {
  username: string
  email: string
  password?: string
  image?: string
}

export interface AuthProps {
  title: string
  text?: string
  link?: string
  children: React.ReactNode
}

export interface FetchRegResType {
  user: {
    username: string
    email: string
    token: string
    bio?: string
    image?: string
  }
}

export interface RegErrorType {
  errors?: {
    username?: string
    email?: string
    general?: string
    'email or password'?: string
  }
}

export interface PrivateRouteProps {
  element: ReactElement
  auth: boolean
}

export interface ArticleFormType {
  title: string
  description: string
  text: string
  tags: string[]
}