import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './new-article/new-article.sass'

const NewArticle: React.FC = () => {
  const [tags, setTags] = useState<string[]>(['text', 'lol'])
  useEffect(() => {
    setTags([...tags, 'foo'])
  }, [])
  return (
    <div className="new-article">
      <div className="new-article__container">
        <h4 className="new-article__title">Create new article</h4>
        <form action="" className="new-article__form">
          <label htmlFor="title" className="new-article__label">
            Title
            <input type="text" id="title" className="new-article__input" placeholder="Title" />
          </label>
          <label htmlFor="description" className="new-article__label">
            Short description
            <input type="text" id="description" className="new-article__input" placeholder="Title" />
          </label>
          <label htmlFor="text" className="new-article__label">
            Text
            <textarea id="text" className="new-article__textarea" placeholder="Text" />
          </label>
          <div className="new-article__label">
            Tags
            {tags.length !== 0 &&
              tags.map((tag) => (
                <input
                  type="text"
                  disabled
                  className="new-article__tag-input"
                  placeholder="Tag"
                  value={tag}
                  key={uuidv4()}
                />
              ))}
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewArticle
