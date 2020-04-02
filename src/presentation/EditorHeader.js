import React from 'react';
import PropTypes from 'prop-types'

import Title from './Title'

function EditorHeader (props) {
  const { titleText } = props

  return (
    <div className='editorHeader'>
      <Title
        className='editorHeader__title'
        content={titleText}
      />
    </div>
  )
}

EditorHeader.propTypes = {
  titleText: PropTypes.string.isRequired,
}

export default EditorHeader