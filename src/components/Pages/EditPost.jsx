import React, {useState, useEffect} from 'react'
import appwiteService from '../../appwrite/conf'
import {PostForm, Container} from '../index'
import { useNavigate, useParams } from 'react-router-dom'


const EditPost = () => {
    const [posts, setPosts] = useState([])
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
     if(slug){
        appwiteService.getPost(slug).then((post) => {
            if(post){
                setPosts(post)
            }
        })
     }  else{
                navigate('/')
            }
    }, [navigate, slug])
    

  return posts ? (
    <div className='py-8'>
        <Container>
            <PostForm post={posts}/>
        </Container>
    </div>
  ) : null
}

export default EditPost