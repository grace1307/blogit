import React from 'react';
import PropTypes from 'prop-types'
import constants from '../constants'

import Title from '../presentation/Title'
import LinkButton from '../presentation/LinkButton'
import FormButton from '../presentation/FormButton'

function AllPostsHeader(props) {
  const { onCurrPageChange } = props
  return (
    <div className='allPostsHeader'>
      <Title
        className='allPostsHeader__title'
        content='All Posts'
      />
      <LinkButton
        className='allPostsHeader__link'
        onButtonClick={() => onCurrPageChange(constants.pageKey.myPosts)}
        text='My Posts'
      />
      <FormButton
        className='allPostsHeader__button'
        onButtonClick={() => onCurrPageChange(constants.pageKey.createPost)}
        text='Create Post'
      />
    </div>
  )
}

AllPostsHeader.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired
}

export default AllPostsHeader