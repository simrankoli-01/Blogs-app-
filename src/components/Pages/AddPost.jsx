import React from 'react'
import PostForm from '../postForm/PostForm'
import Container from '../container/Container'

const AddPost = () => {
  return (
    <div className='py-8'>
        <Container>
            <PostForm />
        </Container>
    </div>
  )
}

export default AddPost