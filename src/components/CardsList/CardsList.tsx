import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { ConfigProvider, Pagination } from 'antd'

import { ArticleType } from '../../types/type'
import './cards-list/cards-list.sass'
import Card from '../Card/Card'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { fetchArticles } from '../../store/blogSlice'

const CardsList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const articles = useAppSelector((state) => state.blog.list)
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchArticles(currentPage))
  }, [currentPage])
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }
  return (
    <div className="cards-list">
      {articles.map((card: ArticleType) => (
        <Card data={card} type="card" key={uuidv4()} />
      ))}
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
              colorPrimary: 'white',
              colorPrimaryHover: 'white',
            },
          },
        }}
      >
        <Pagination
          align="center"
          current={currentPage}
          pageSize={5}
          total={325}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </ConfigProvider>
    </div>
  )
}

export default CardsList
