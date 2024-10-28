import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format, parseISO } from 'date-fns'
import Markdown from 'markdown-to-jsx'

import './card/card.sass'
import { CardProps } from '../../types/type'

const Card: React.FC<CardProps> = ({ data, type }) => {
  return (
    <div className="card" style={type === 'card' ? { cursor: 'pointer' } : {}}>
      <div className="card__header">
        <div className="card__article-info">
          <h5 className="card__title">{data.title}</h5>
          <label className="card__like" htmlFor={data.slug}>
            <input className="card__checkbox" type="checkbox" id={data.slug} />
            <span className="card__custom-checkbox" />
            12
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
      <p className={`card__description ${type === 'card' && 'card__description_short'}`}>{data.description}</p>
      {type !== 'card' && <Markdown style={{ color: '#000000BF' }}>{data.body}</Markdown>}
    </div>
  )
}

export default Card
