import React, { Component } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import AllPostsHeader from '../presentation/AllPostsHeader'
import PostItem from '../presentation/PostItem'

class AllPost extends Component {
  constructor() {
    super()

    this.state = {
      posts: [],
      users: []
    }

    this.handleTitleClicked = this.handleTitleClicked.bind(this)
  }

  componentDidMount() {
    network.sendGet(constants.endpoints.posts, {}, posts => {
      try {
        this.setState({ posts: JSON.parse(posts) })
      } catch (error) {
        console.error(error)
      }
    })
    network.sendGet(constants.endpoints.users, {}, users => {
      try {
        this.setState({ users: JSON.parse(users) })
      } catch (error) {
        console.error(error)
      }
    })
  }

  handleTitleClicked(postId) {
    const { onCurrPageChange, onCurrPostIdChange } = this.props

    onCurrPostIdChange(postId, () => {
      onCurrPageChange(constants.pageKey.postDetail)
    })
  }

  render() {
    const { onCurrPageChange } = this.props
    // const onCurrPageChange = this.props.onCurrPageChange?
    const { posts, users } = this.state
    const items = posts.map(post => {
      const { userId, id, title } = post
      let user = users.find(user => user.id === userId)
      user = user ? user.name : 'Anonymous'

      return (    //every React component in array needs a key prop
        //comments cannot be written in ReactJS component
        <PostItem
          author={user}
          className='allPost__item'
          key={`post-id-${id}`}
          id={id}
          title={title}
          onTitleClick={this.handleTitleClicked}
        />
      )
    })

    return (
      <div className='allPost'>
        <AllPostsHeader
          onCurrPageChange={onCurrPageChange}
        />
        <div className='allposts__list'>
          {items}
        </div>
      </div>
    )
  }
}


AllPost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  onCurrPostIdChange: PropTypes.func.isRequired
}

export default AllPost

