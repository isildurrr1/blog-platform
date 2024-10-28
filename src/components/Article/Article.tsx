import { ArticleProps } from '../../types/type'
import Card from '../Card/Card'
import './article/article.sass'

const Article: React.FC<ArticleProps> = ({ data }) => {
  return (
    <section className="article">
      <Card data={data} type="article" />
    </section>
  )
}

export default Article
