import React from 'react';
import PropTypes from 'prop-types'

function EditorTextField (props) {
  const { value, onTextChange } = props

  return (
    <div className='editorTextField'>
      <textarea
        className='editorTextField__textarea'
        onChange={event => onTextChange(event.target.value)}
        value={value}
      />
    </div>
  )
}

EditorTextField.propTypes = {
  value: PropTypes.string.isRequired,
  onTextChange: PropTypes.func.isRequired
}

export default EditorTextField