import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format, parseISO } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useNavigate } from 'react-router-dom'
import { Button, ConfigProvider, Popconfirm } from 'antd'

import './card/card.sass'
import { CardProps } from '../../types/type'
import { useAppSelector } from '../../hooks/hooks'
import { SugnUpButtonConfig } from '../../utils/AntdConfig'
import ApiService from '../../utils/ApiService'

const Card: React.FC<CardProps> = ({ data, type }) => {
  const navigate = useNavigate()
  const username = useAppSelector((store) => store.blog.user?.user.username)
  const handleShowFullArticle = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement
    if (!target.closest('.card__like')) {
      navigate(`/articles/${data.slug}`)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleShowFullArticle(e as unknown as React.MouseEvent<HTMLDivElement>)
    }
  }

  const deleteCard = () => {
    ApiService.deleteArticle(data.slug).then((res) => {
      if (res) navigate('/articles')
    })
  }

  return (
    <div
      className="card"
      role="button"
      tabIndex={0}
      style={type === 'card' ? { cursor: 'pointer' } : { cursor: 'default' }}
      onClick={type === 'article' ? undefined : handleShowFullArticle}
      onKeyDown={type === 'article' ? undefined : handleKeyPress}
      onKeyUp={(e) => e.preventDefault()}
    >
      <div className="card__header">
        <div className="card__article-info">
          <h5 className="card__title">{data.title}</h5>
          <label className="card__like" htmlFor={data.slug}>
            <input className="card__checkbox" type="checkbox" id={data.slug} />
            <span className="card__custom-checkbox" />
            {data.favoritesCount}
          </label>
          <div className="card__tag-list">
            {data.tagList.map(
              (tag) =>
                tag.trim() !== '' && (
                  <span className="card__tag" key={uuidv4()}>
                    {tag}
                  </span>
                )
            )}
          </div>
        </div>
        <div className="card__user-info">
          <h6 className="card__username">{data.author.username}</h6>
          <p className="card__date">{format(new Date(parseISO(data.createdAt)), 'MMMM dd, yyyy')}</p>
        </div>
        <img src={data.author.image} alt="avatar" className="card__avatar" />
      </div>
      <div className="card__description-container">
        <p className={`card__description ${type === 'card' && 'card__description_short'}`}>{data.description}</p>
        {type !== 'card' && data.author.username === username ? (
          <>
            <Popconfirm
              placement="rightTop"
              title="Are you sure to delete this article?"
              okText="Yes"
              cancelText="No"
              onConfirm={deleteCard}
            >
              <Button className="card__button" danger>
                Delete
              </Button>
            </Popconfirm>
            <ConfigProvider theme={SugnUpButtonConfig}>
              <Button
                variant="outlined"
                className="card__button"
                onClick={() => navigate(`/articles/${data.slug}/edit`)}
              >
                Edit
              </Button>
            </ConfigProvider>
          </>
        ) : null}
      </div>
      {type !== 'card' && (
        <div style={{ color: '#000000BF' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.body}</ReactMarkdown>
        </div>
      )}
    </div>
  )
}

export default Card
