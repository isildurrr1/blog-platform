import { useState } from 'react'
import { Button } from 'antd'
import { v4 as uuidv4 } from 'uuid'
import { useForm } from 'react-hook-form'

import './new-article/new-article.sass'
import { ArticleFormType } from '../../types/type'

const NewArticle: React.FC = () => {
  const [newTag, setNewTag] = useState<string>('')
  const [tags, setTags] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ArticleFormType>()

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    tags.forEach((tag, index) => {
      setValue(`tags.${index}`, tag)
    })
    if (newTag.trim()) {
      if (!tags.includes(newTag)) {
        setValue(`tags.${tags.length}`, newTag)
      }
    }
    handleSubmit((values) => {
      console.log(values)
    })()
  }

  const handleAddNewTag = () => {
    if (newTag.trim()) {
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
        <form action="" className="new-article__form" onSubmit={handleFormSubmit}>
          <label htmlFor="title" className="new-article__label">
            Title
            <input
              placeholder="Title"
              type="text"
              id="title"
              className={`new-article__input ${errors.title ? 'new-article__input_error' : ''}`}
              {...register('title', { required: 'Title is required' })}
            />
            {errors.title && <span className="auth__error-message">{errors.title.message}</span>}
          </label>

          <label htmlFor="description" className="new-article__label">
            Short description
            <input
              type="text"
              id="description"
              className="new-article__input"
              placeholder="Title"
              {...register('description', { required: 'Short description is required' })}
            />
            {errors.description && <span className="auth__error-message">{errors.description.message}</span>}
          </label>

          <label htmlFor="text" className="new-article__label">
            Text
            <textarea
              id="text"
              className="new-article__textarea"
              placeholder="Text"
              {...register('text', { required: 'Text description is required' })}
            />
            {errors.text && <span className="auth__error-message">{errors.text.message}</span>}
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
          <button type="submit" className="new-article__submit">
            Send
          </button>
        </form>
      </div>
    </div>
  )
}

export default NewArticle
