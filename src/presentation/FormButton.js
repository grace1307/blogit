import React from 'react';
import PropTypes from 'prop-types'

function FormButton (props) {
  const { text, onButtonClick, className } = props

  return (
    <button
      className={`formButton__button ${className}`}
      onClick={onButtonClick}
      type='button'
    >
      {text}
    </button>
  )
}

FormButton.propTypes = {
  className: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
}

export default FormButton