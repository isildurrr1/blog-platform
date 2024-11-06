import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Spin } from 'antd'

import Card from '../Card/Card'
import './article/article.sass'
import { ArticleType } from '../../types/type'
import ApiService from '../../utils/ApiService'

const Article: React.FC = () => {
  const { slug } = useParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [article, setArticle] = useState<ArticleType>()
  useEffect(() => {
    setLoading(true)
    ApiService.getArticle(slug)
      .then((res) => {
        setArticle(res.article)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <section className="article">
      {loading && <Spin size="large" />}
      {article && <Card data={article} type="article" />}
    </section>
  )
}

export default Article
