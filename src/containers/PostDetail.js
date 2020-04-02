import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import Title from '../presentation/Title'
import LinkButton from '../presentation/LinkButton'

class PostDetail extends Component {
  constructor() {
    super()

    this.state = {
      title: '',
      body: ''
    }

    this.handleBackButtonClicked = this.handleBackButtonClicked.bind(this)
  }

  componentDidMount() {
    const { currPostId } = this.props

    network.sendGet(`${constants.endpoints.posts}/${currPostId}`, {}, post => {
      try {
        const postObject = JSON.parse(post)

        this.setState({ title: postObject.title, body: postObject.body })
      } catch (error) {
        console.error(error)
      }
    })
  }

  handleBackButtonClicked() {
    const { onCurrPageChange } = this.props

    onCurrPageChange(constants.pageKey.allPosts)
  }

  render() {
    const { title, body } = this.state

    return (
      <div className='postDetail'>
        <LinkButton
          className='postDetail__linkButton'
          onButtonClick={this.handleBackButtonClicked}
          text='< Home'
        />
        <Title
          className='postDetail__title'
          content={title}
        />
        <div className='postDetail__body'>
          {body}
        </div>
      </div>
    )
  }
}

PostDetail.propTypes = {
  currPostId: PropTypes.number.isRequired,
  onCurrPageChange: PropTypes.func.isRequired,
}

export default PostDetail

