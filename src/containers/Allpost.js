import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import AllPostsHeader from '../presentation/AllPostsHeader'
import PostItem from '../presentation/PostItem'

export default function AllPost(props) {

  const {
    onCurrPageChange,
    onCurrPostIdChange
  } = props

  const [posts, setPosts] = useState([])
  const [users, setUsers] = useState([])

  useEffect(() => {
    let isCancelled = false

    network.sendGet(constants.endpoints.posts, {}, posts => {
      try {
        !isCancelled && setPosts(JSON.parse(posts))
      } catch (error) {
        console.error(error)
      }
    })
    network.sendGet(constants.endpoints.users, {}, users => {
      try {
        !isCancelled && setUsers(JSON.parse(users))
      } catch (error) {
        console.error(error)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [])
  
  const handleTitleClicked = postId => {
    onCurrPostIdChange(postId, () => {
      onCurrPageChange(constants.pageKey.postDetail)
    })
  }

  const items = posts.map(post => {
    const { userId, id, title } = post
    let user = users.find(user => user.id === userId)

    user = user ? user.name : 'Anonymous'

    return (
      <PostItem
        author={user}
        className='allPost__item'
        key={`post-id-${id}`}
        id={id}
        title={title}
        onTitleClick={handleTitleClicked}
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

AllPost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  onCurrPostIdChange: PropTypes.func.isRequired
}
