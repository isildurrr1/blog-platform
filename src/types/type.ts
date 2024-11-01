import { ReactChildren } from 'react'

export interface BlogInitStateType {
  list: ArticleType[]
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

export interface FetchArticlesResponseType {
  articles: ArticleType[]
}

export interface AuthDataType {
  title: string
  btnText: string
  pText: string
  linkText: string
}

export interface AuthProps {
  data: AuthDataType
  children: React.ReactNode
}
