import React from 'react';
import PropTypes from 'prop-types'
import constants from '../constants'

import Title from '../presentation/Title'
import BreadCrumb from '../presentation/BreadCrumb'

function MyPostsHeader(props) {
  const { onCurrPageChange } = props

  const crumbs = [
    {
      text: 'All Posts',
      page: constants.pageKey.allPosts
    },
    {
      text: 'My Posts',
      page: null
    }
  ].map(crumb => ({
    text: crumb.text,
    onCrumbClick: crumb.page ? () => onCurrPageChange(crumb.page) : () => true
  }))

  return (
    <div className='myPostsHeader'>
      <BreadCrumb
        className='myPostsHeader__breadCrumb'
        crumbs={crumbs}
      />
      <Title
        className='myPostsHeader__title'
        content='My Posts'
      />
    </div>
  )
}

MyPostsHeader.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired
}

export default MyPostsHeader