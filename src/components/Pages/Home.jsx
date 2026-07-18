import React, {useEffect, useState} from 'react'
import appwriteService from '../../appwrite/conf'
import {Cards, Container} from '../index'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Herotext from '../headings/Herotext'
import Video from '../Video'
import profileService from '../../appwrite/profile'

const Home = () => {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector(state => state.auth.status)
    const userData = useSelector((state) => state.auth.userData)

    useEffect(() => {
     if(authStatus){
       const loadPosts = async () => {
           const response = await appwriteService.getPosts();
       
           const postsWithProfiles = await Promise.all(
             response.documents.map(async (post) => {
               const profile = await profileService.getUserProfile(post.userId);
       
               return {
                 ...post,
                 username: profile.name,
                 profileImg: profile.profileImg,
               };
             })
           );
       
           setPosts(postsWithProfiles);
         };
       
         loadPosts();
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

    const hasUserPost = posts.some((post) => post.userId === userData?.$id)

    return (
         <div className='w-full py-2'>
            <Container>
                {!hasUserPost && (
                    <div className='w-full mb-2 p-4 rounded-xl bg-white/10 text-center'>
                        <p className='text-white md:text-lg text-base'>
                            You haven&apos;t shared anything yet.{' '}
                            <Link to='/add-post' className='text-blue-500 font-medium hover:underline'>
                                Create your first post
                            </Link>
                        </p>
                    </div>
                )}
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='md:w-1/4 w-full p-2' key={post.$id}>
                            <Cards {...post}/>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home