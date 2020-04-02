import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import Title from '../presentation/Title'
import FormButton from '../presentation/FormButton'
import EditorTextField from '../presentation/EditorTextField'

class EditPost extends Component {
  constructor() {
    super()

    this.state = {
      value: ''
    }

    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleCancelButtonClicked = this.handleCancelButtonClicked.bind(this)
    this.handleSubmitButtonClicked = this.handleSubmitButtonClicked.bind(this)
  }

  componentDidMount() {
    const { currPostId } = this.props

    network.sendGet(`${constants.endpoints.posts}/${currPostId}`, {}, post => {
      try {
        this.setState({ value: (JSON.parse(post)).title })
      } catch (error) {
        console.error(error)
      }
    })
  }

  handleTextChange(value) {
    this.setState({ value })
  }

  handleCancelButtonClicked() {
    const { onCurrPageChange } = this.props

    onCurrPageChange(constants.pageKey.myPosts)
  }

  handleSubmitButtonClicked() {
    const { onCurrPageChange, currPostId } = this.props
    const { value } = this.state

    network.sendPatch(`${constants.endpoints.posts}/${currPostId}`, { title: value }, () => onCurrPageChange(constants.pageKey.myPosts))
  }

  render() {
    const { value } = this.state

    return (
      <div className='editPost'>
        <Title
          className='editPost__title'
          content='Edit Post'
        />
        <EditorTextField
          onTextChange={this.handleTextChange}
          value={value}
        />
        <FormButton
          className='editPost__cancelButton'
          onButtonClick={this.handleCancelButtonClicked}
          text='Cancel'
        />
        <FormButton
          className='editPost__submitButton'
          onButtonClick={this.handleSubmitButtonClicked}
          text='Submit'
        />
      </div>
    )
  }
}


EditPost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  onCurrPostIdChange: PropTypes.func.isRequired,
  currPostId: PropTypes.number.isRequired
}

export default EditPost

