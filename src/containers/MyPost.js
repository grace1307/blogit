import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import MyPostsHeader from '../presentation/MyPostsHeader'
import PostItem from '../presentation/PostItem'

export default function MyPost(props){

  const { userId, onCurrPageChange, onCurrPostIdChange } = props

  const [posts, setPosts] = useState([])

  useEffect(() => {
    network.sendGet(constants.endpoints.posts, { userId }, posts => {
      try {
        setPosts(JSON.parse(posts))
      } catch (error) {
        console.error(error)
      }
    })
  }, [userId])

  const handleEditClicked = postId => {
    onCurrPostIdChange(postId, () => {
    onCurrPageChange(constants.pageKey.editPost)
    })
  }

  const handleTitleClicked = postId => {
    onCurrPostIdChange(postId, () => {
    onCurrPageChange(constants.pageKey.postDetail)
    })
  }

  const handleDeleteClick = postId => {
    network.sendDelete(
      `${constants.endpoints.posts}/${postId}`,
      {},
      () => setPosts(posts.filter(post => post.id !== postId))
    )
  }

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
        onEditClick={() => handleEditClicked(id)}
        onDeleteClick={() => handleDeleteClick(id)}
        onTitleClick={handleTitleClicked}
      />
    )
  })

  return(
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

MyPost.propTypes = {
  onCurrPageChange: PropTypes.func.isRequired,
  onCurrPostIdChange: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
}
