export interface BlogInitStateType {
  list: []
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
}