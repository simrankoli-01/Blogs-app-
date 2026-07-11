import React, {useEffect, useState} from 'react'
import appwiteService from '../../appwrite/conf'
import {Cards, Container} from '../index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Herotext from '../headings/Herotext'
import Video from '../Video'

const Home = () => {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
     if(authStatus){
        appwiteService.getPosts().then((post) => {
        if(post) {
            setPosts(post.documents)
        }
     })
     }
    }, [authStatus])

    if(!authStatus){
        return (
             <div className='w-full'>
                <Container>
                    <Herotext />
                </Container>
            </div>
        )
    }
    
    if(posts.length === 0){
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='md:text-2xl text-xl text-white'>
                             No posts yet.{' '}
                             <Link 
                             to='/add-post' className='text-blue-500'>
                             Add your first post
                             </Link>
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='w-1/4 p-2' key={post.$id}>
                            <Cards {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home