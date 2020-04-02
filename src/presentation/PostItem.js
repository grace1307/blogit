import React from 'react';
import PropTypes from 'prop-types'

import FormButton from './FormButton'

function PostItem (props) {
  const { id, title, author, className, isMutable, onEditClick, onDeleteClick, onTitleClick } = props

  return (
    <div className={`postItem ${className}`}>
      <div
        className='postItem__title'
        onClick={() => onTitleClick(id)}
      >
        {title}
      </div>
      <div className='postItem__author'>
        {author}
      </div>
      {isMutable &&
        [
          (
            <FormButton
              className='postItem__editButton'
              key={`postItem__editButton-${id}`}
              onButtonClick={onEditClick}
              text='Edit'
            />
          ),
          (
            <FormButton
              className='postItem__deleteButton'
              key={`postItem__deleteButton-${id}`}
              onButtonClick={onDeleteClick}
              text='Delete'
            />
          )
        ]
      }
    </div>
  )
}

PostItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  isMutable: PropTypes.bool,
  onEditClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  onTitleClick: PropTypes.func.isRequired
}

export default PostItem