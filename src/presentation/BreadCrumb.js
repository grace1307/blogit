import React from 'react'
import PropTypes from 'prop-types'

import LinkButton from './LinkButton'

function BreadCrumb (props) {
  const { crumbs } = props

  const crumbElements = crumbs
    .map(crumb => {
      return (
        <LinkButton
          className='breadCrumb__linkButton'
          key={`breadCrumb__linkButton-${crumb.text}`}
          onButtonClick={crumb.onCrumbClick}
          text={crumb.text}
        />
      )
    })
    .reduce((prev, curr) => [prev, (
      <div
        className='breadCrumb__chevron'
        key={`breadCrumb__chevron-${prev.text}`}
      >
        &nbsp;&gt;&nbsp;
      </div>
    ), curr])

  return (
    <div className='breadCrumb'>
      {crumbElements}
    </div>
  )
}

BreadCrumb.propTypes = {
  className: PropTypes.string.isRequired,
  crumbs: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    onCrumbClick: PropTypes.func.isRequired,
  })).isRequired
}

export default BreadCrumb