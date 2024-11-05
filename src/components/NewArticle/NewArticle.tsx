import { useState } from 'react'
import { Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'

import './new-article/new-article.sass'

const NewArticle: React.FC = () => {
  const [newTag, setNewTag] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const handleAddNewTag = () => {
    if (newTag.trim().length !== 0) {
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag])
      }
      setNewTag('')
    }
  }

  const deleteTag = (tag: string) => {
    setTags(tags.filter((element) => element !== tag))
  }

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
                <div className="new-article__add-tag" key={uuidv4()}>
                  <input type="text" disabled className="new-article__tag-input" placeholder="Tag" value={tag} />
                  <Button
                    type="default"
                    variant="outlined"
                    color="danger"
                    size="large"
                    className="new-article__button"
                    onClick={() => deleteTag(tag)}
                  >
                    Delete
                  </Button>
                </div>
              ))}
            <div className="new-article__add-tag">
              <input
                type="text"
                value={newTag}
                className="new-article__tag-input"
                placeholder="Tag"
                onChange={(e) => setNewTag(e.target.value)}
              />
              <Button
                type="default"
                variant="outlined"
                color="danger"
                size="large"
                className="new-article__button"
                onClick={() => setNewTag('')}
              >
                Delete
              </Button>
              <Button
                type="default"
                variant="outlined"
                color="primary"
                size="large"
                className="new-article__button"
                onClick={() => handleAddNewTag()}
              >
                Add tag
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewArticle
