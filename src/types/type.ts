export interface BlogInitStateType {
  list: ArticleType[]
  loading: boolean
  success: boolean
  error: RegErrorType | null
  user: null | FetchRegistrationResponseType
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

export interface LoginFormType {
  email: string
  password: string
}

export interface RegisterFormType {
  username: string
  email: string
  password: string
  repeatPas: string
  checkbox: boolean
}

export interface AuthProps {
  title: string
  text: string
  link: string
  children: React.ReactNode
}

export interface FetchRegistrationResponseType {
  user: {
    username: string
    email: string
    token: string
  }
}

export interface RegErrorType {
  errors?: {
    username?: string
    email?: string
  }
}
