import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import constants from '../constants'
import network from '../utils/network'

import Title from '../presentation/Title'
import LinkButton from '../presentation/LinkButton'

export default function PostDetail(props){

  const { currPostId, onCurrPageChange } = props

  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    let isCancelled = false

    network.sendGet(`${constants.endpoints.posts}/${currPostId}`, {}, post => {
      try {
        const postObject = JSON.parse(post)

        !isCancelled && setTitle(postObject.title)
        !isCancelled && setBody(postObject.body) 
        // extract string
      } catch (error) {
        console.error(error)
      }
    })

    return () => {
      isCancelled = true
    }
  }, [currPostId])

  const handleBackButtonClicked = () => {
    onCurrPageChange(constants.pageKey.allPosts)
  }

  return(
    <div className='postDetail'>
      <LinkButton
        className='postDetail__linkButton'
        onButtonClick={handleBackButtonClicked}
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

PostDetail.propTypes = {
  currPostId: PropTypes.number.isRequired,
  onCurrPageChange: PropTypes.func.isRequired,
}
