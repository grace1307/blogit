import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import Title from '../presentation/Title'
import FormButton from '../presentation/FormButton'
import EditorTextField from '../presentation/EditorTextField'

export default function EditPost(props){

  const { onCurrPageChange, currPostId } = props

  const [value, setValue] = useState('')

  useEffect(() => {
    network.sendGet(`${constants.endpoints.posts}/${currPostId}`, {}, post => {
      try {
        setValue((JSON.parse(post)).title)
      } catch (error) {
        console.error(error)
      }
    })
  }, [currPostId])

  const handleCancelButtonClicked = () => onCurrPageChange(constants.pageKey.myPosts)
  const handleSubmitButtonClicked = () => {
    network.sendPatch(`${constants.endpoints.posts}/${currPostId}`, { 
      title: value 
    }, () => onCurrPageChange(constants.pageKey.myPosts))
  }

  return(
    <div className='editPost'>
      <Title
        className='editPost__title'
        content='Edit Post'
      />
      <EditorTextField
        onTextChange={setValue}
        value={value}
      />
      <FormButton
        className='editPost__cancelButton'
        onButtonClick={handleCancelButtonClicked}
        text='Cancel'
      />
      <FormButton
        className='editPost__submitButton'
        onButtonClick={handleSubmitButtonClicked}
        text='Submit'
      />
    </div>
  )
}

EditPost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  onCurrPostIdChange: PropTypes.func.isRequired,
  currPostId: PropTypes.number.isRequired
}
