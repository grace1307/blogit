import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import MyPostsHeader from '../presentation/MyPostsHeader'
import PostItem from '../presentation/PostItem'

class MyPost extends Component {
  constructor() {
    super()

    this.state = {
      posts: []
    }
    this.handleEditClicked = this.handleEditClicked.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.handleTitleClicked = this.handleTitleClicked.bind(this)
  }

  componentDidMount() {
    const { userId } = this.props

    network.sendGet(constants.endpoints.posts, { userId }, posts => {
      try {
        this.setState({ posts: JSON.parse(posts) })
      } catch (error) {
        console.error(error)
      }
    })
  }

  handleEditClicked(postId) {
    const { onCurrPageChange, onCurrPostIdChange } = this.props

    onCurrPostIdChange(postId, () => {
      onCurrPageChange(constants.pageKey.editPost)
    })
  }

  handleTitleClicked(postId) {
    const { onCurrPageChange, onCurrPostIdChange } = this.props

    onCurrPostIdChange(postId, () => {
      onCurrPageChange(constants.pageKey.postDetail)
    })
  }

  handleDeleteClick(postId) {
    network.sendDelete(`${constants.endpoints.posts}/${postId}`, {}, () => {
      const { posts } = this.state

      this.setState({ posts: posts.filter(post => post.id !== postId) })
    })
  }

  render() {
    const { onCurrPageChange } = this.props
    const { posts } = this.state
    const items = posts.map(post => {
      const { id, title } = post

      return (
        <PostItem
          id={id}
          title={title}
          author='Me'
          key={`post-id-${id}`}
          className='myPosts__item'
          isMutable
          onEditClick={() => this.handleEditClicked(id)}
          onDeleteClick={() => this.handleDeleteClick(id)}
          onTitleClick={this.handleTitleClicked}
        />
      )
    })

    return (
      <div className='myPosts'>
        <MyPostsHeader
          onCurrPageChange={onCurrPageChange}
        />
        <div className='myPosts__list'>
          {items}
        </div>
      </div>
    )
  }
}


MyPost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  onCurrPostIdChange: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}

export default MyPost

