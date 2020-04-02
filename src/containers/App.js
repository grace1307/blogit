import React, { Component, useState } from 'react'
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

  const handleCurrPageChange = () => setCurrPage(nextPage)
  const handleCurrPostIdChange = () => setCurrPostId(nextPostId)

}

function renderAllPosts() {
    return (
      <AllPosts
        onCurrPageChange={currPage}
        //onCurrPageChange={nextPage => this.setState({ currPage: nextPage })}
        onCurrPostIdChange={currPostId}
      />
    )
  }

function renderMyPosts() {
    return (
      <MyPosts
        onCurrPageChange={currPage}
        onCurrPostIdChange={currPostId}
        userId={constants.user.id}
      />
    )
  }

function renderCreatePost() {
    return (
      <CreatePost
        onCurrPageChange={currPage}
        userId={constants.user.id}
      />
    )
  }

function renderEditPost() {

    return (
      <EditPost
        onCurrPostIdChange={currPostId} 
        onCurrPageChange={currPage}
        currPostId={currPostId}
        //1. ? 
      />
    )
  }

function renderPostDetail() {

    return (
      <PostDetail
        currPostId={currPostId}
        onCurrPageChange={currPage}
      />
    )
  }

function render() {

  const renderMap = {
      [constants.pageKey.allPosts]: renderAllPosts(),
      [constants.pageKey.myPosts]: renderMyPosts(),
      [constants.pageKey.createPost]: renderCreatePost(),
      [constants.pageKey.editPost]: renderEditPost(),
      [constants.pageKey.postDetail]: renderPostDetail(),
      default: renderAllPosts()
    }

    return (
      <div className='app'>
        {(renderMap[currPage] || renderMap.default)()}
      </div>
      )
}

/*
export default class App extends Component {
  constructor() {
    super()

    this.state = {
      currPage: constants.pageKey.allPosts, 
      // currPage: 'all-posts'
      currPostId: 0
    }

    this.handleCurrPageChange = this.handleCurrPageChange.bind(this)
    this.handleCurrPostIdChange = this.handleCurrPostIdChange.bind(this)
    this.renderAllPosts = this.renderAllPosts.bind(this)
    this.renderMyPosts = this.renderMyPosts.bind(this)
    this.renderCreatePost = this.renderCreatePost.bind(this)
    this.renderEditPost = this.renderEditPost.bind(this)
    this.renderPostDetail = this.renderPostDetail.bind(this)
  }

  handleCurrPageChange(nextPage) {
    this.setState({ currPage: nextPage })
  }

  handleCurrPostIdChange(nextPostId, callback = () => true) {
    this.setState({ currPostId: nextPostId }, callback)
  }

  renderAllPosts() {
    return (
      <AllPosts
        onCurrPageChange={this.handleCurrPageChange}
        //onCurrPageChange={nextPage => this.setState({ currPage: nextPage })}
        onCurrPostIdChange={this.handleCurrPostIdChange}
      />
    )
  }

  renderMyPosts() {
    return (
      <MyPosts
        onCurrPageChange={this.handleCurrPageChange}
        onCurrPostIdChange={this.handleCurrPostIdChange}
        userId={constants.user.id}
      />
    )
  }

  renderCreatePost() {
    return (
      <CreatePost
        onCurrPageChange={this.handleCurrPageChange}
        userId={constants.user.id}
      />
    )
  }

  renderEditPost() {
    const { currPostId } = this.state 
    // 1. const here only work in this block?

    return (
      <EditPost
        onCurrPostIdChange={this.handleCurrPostIdChange}
        onCurrPageChange={this.handleCurrPageChange}
        currPostId={currPostId}
      />
    )
  }

  renderPostDetail() {
    const { currPostId } = this.state

    return (
      <PostDetail
        currPostId={currPostId}
        onCurrPageChange={this.handleCurrPageChange}
      />
    )
  }

  render() {
    const { currPage } = this.state

    const renderMap = {
      [constants.pageKey.allPosts]: this.renderAllPosts,
      [constants.pageKey.myPosts]: this.renderMyPosts,
      [constants.pageKey.createPost]: this.renderCreatePost,
      [constants.pageKey.editPost]: this.renderEditPost,
      [constants.pageKey.postDetail]: this.renderPostDetail,
      default: this.renderAllPosts
    }

    return (
      <div className='app'>
        {(renderMap[currPage] || renderMap.default)()}
      </div>
    )
  }
}

// export default App

*/

