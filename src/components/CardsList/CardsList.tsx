import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

import { ArticleType } from '../../types/type'
import './cards-list/cards-list.sass'
import Card from '../Card/Card'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchArticles } from '../../store/blogSlice'

const CardsList: React.FC = () => {
  const articles = useAppSelector((state) => state.blog.list)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArticles())
  }, [])
  return (
    <div className="cards-list">
      {articles.slice(5, 10).map((card: ArticleType) => (
        <Card data={card} type="card" key={uuidv4()} />
      ))}
    </div>
  )
}

export default CardsList
