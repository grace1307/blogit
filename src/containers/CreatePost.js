import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import Title from '../presentation/Title'
import FormButton from '../presentation/FormButton'
import EditorTextField from '../presentation/EditorTextField'

class CreatePost extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCancelButtonClicked = this.handleCancelButtonClicked.bind(this)
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this)

  }

  handleTextChange(value) {
    this.setState({ value })
  }

  handleCancelButtonClicked() {
    const { onCurrPageChange } = this.props

    onCurrPageChange(constants.pageKey.allPosts)
  }

  handleSubmitButtonClicked() {
    const { onCurrPageChange, userId } = this.props
    const { value } = this.state

    network.sendPost(constants.endpoints.posts, {
      title: value,
      userId
    }, () => onCurrPageChange(constants.pageKey.myPosts))
  }

  render() {
    const { value } = this.state

    return (
      <div className='createPost'>
        <Title
          className='createPost__title'
          content='Create Post'
        />
        <EditorTextField
          onTextChange={this.handleTextChange}
          value={value}
        />
        <FormButton
          className='createPost__cancelButton'
          onButtonClick={this.handleCancelButtonClicked}
          text='Cancel'
        />
        <FormButton
          className='createPost__submitButton'
          onButtonClick={this.handleSubmitButtonClicked}
          text='Submit'
        />
      </div>
    )
  }
}


CreatePost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}

export default CreatePost

