import React from 'react';
import PropTypes from 'prop-types'

function Title (props) {
  const { content, className } = props

  return (
    <h1 className={className}>
      {content}
    </h1>
  )
}

Title.propTypes = {
  className: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Title