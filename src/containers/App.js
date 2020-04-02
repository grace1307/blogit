import React, { useState } from 'react'
import constants from '../constants'
import '../App.css';

import AllPosts from './Allpost'
import MyPosts from './MyPost'
import CreatePost from './CreatePost'
import EditPost from './EditPost'
import PostDetail from './PostDetail'

export default function App() {
  const [currPage, setCurrPage] = useState(constants.pageKey.allPosts)
  const [currPostId, setCurrPostId] = useState(0)

  const handleCurrPageChange = (nextPage) => setCurrPage(nextPage)
  const handleCurrPostIdChange = (nextPostId, callback = () => true) => {
    setCurrPostId(nextPostId)
    callback()
  }


  const renderAllPosts = () => (
    <AllPosts
      onCurrPageChange={handleCurrPageChange}
      onCurrPostIdChange={handleCurrPostIdChange}
    />
  )

  const renderMyPosts = () => (
    <MyPosts
      onCurrPageChange={handleCurrPageChange}
      onCurrPostIdChange={handleCurrPostIdChange}
      userId={constants.user.id}
    />
  )

  const renderCreatePost = () => (
    <CreatePost
      onCurrPageChange={handleCurrPageChange}
      userId={constants.user.id}
    />)

  const renderEditPost = () => (
    <EditPost
      onCurrPostIdChange={handleCurrPostIdChange}
      onCurrPageChange={handleCurrPageChange}
      currPostId={currPostId}
    />)

  const renderPostDetail = () => (
    <PostDetail
      currPostId={currPostId}
      onCurrPageChange={handleCurrPageChange}
    />)


  const renderMap = {
      [constants.pageKey.allPosts]: renderAllPosts,
      [constants.pageKey.myPosts]: renderMyPosts,
      [constants.pageKey.createPost]: renderCreatePost,
      [constants.pageKey.editPost]: renderEditPost,
      [constants.pageKey.postDetail]: renderPostDetail,
      default: renderAllPosts
    }

  return (
    <div className='app'>
      {(renderMap[currPage] || renderMap.default)()}
    </div>
  )
}
