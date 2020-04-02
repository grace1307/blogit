import React, { useState } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import Title from '../presentation/Title'
import FormButton from '../presentation/FormButton'
import EditorTextField from '../presentation/EditorTextField'

export default function CreatePost(props) {

  const { onCurrPageChange, userId } = props

  const [value, setValue] = useState('')

  const onCancelButtonClicked = () => onCurrPageChange(constants.pageKey.allPosts)
  const onSubmitButtonClicked = () => {
    network.sendPost(constants.endpoints.posts, {
      title: value,
      userId
    }, () => onCurrPageChange(constants.pageKey.myPosts))
   }


  return (
    <div className='createPost'>
      <Title
        className='createPost__title'
        content='Create Post'
      />
      <EditorTextField
        onTextChange={setValue}
        value={value}
      />
      <FormButton
        className='createPost__cancelButton'
        onButtonClick={onCancelButtonClicked}
        text='Cancel'
      />
      <FormButton
        className='createPost__submitButton'
        onButtonClick={onSubmitButtonClicked}
        text='Submit'
      />
    </div>
  )
}

CreatePost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired
}