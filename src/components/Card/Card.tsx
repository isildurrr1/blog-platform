import React from 'react'
import { v4 as uuidv4 } from 'uuid'
import { format, parseISO } from 'date-fns'

import './card/card.sass'
import { CardProps } from '../../types/type'

const Card: React.FC<CardProps> = ({ data }) => {
  return (
    <div className="card">
      <div className="card__header">
        <div className="card__article-info">
          <h5 className="card__title">{data.title}</h5>
          <span>
            <img src="./images/heart.svg" alt="like" className="card__like" /> 12
          </span>
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
      <p className="card__description">{data.description}</p>
    </div>
  )
}

export default Card
