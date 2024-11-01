import { useParams } from 'react-router-dom'

import Card from '../Card/Card'
import './article/article.sass'
import { useAppSelector } from '../../hooks/hooks'

const Article: React.FC = () => {
  const { slug } = useParams()
  const articles = useAppSelector((state) => state.blog.list)
  const article = articles.find((obj) => obj.slug === slug)
  return (
    <section className="article">{article ? <Card data={article} type="article" /> : <p>Статья не найдена</p>}</section>
  )
}

export default Article
