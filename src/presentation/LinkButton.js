import React from 'react';
import PropTypes from 'prop-types'

function LinkButton (props) {
  const { text, onButtonClick, className } = props

  return (
    <button
      className={`linkButton__button ${className}`}
      onClick={onButtonClick}
      type='button'
    >
      {text}
    </button>
  )
}

LinkButton.propTypes = {
  className: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default LinkButton