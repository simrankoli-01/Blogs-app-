import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/conf";
import { Cards, Container } from "../index";
import profileService from "../../appwrite/profile";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

useEffect(() => {
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
}, []);

 console.log(posts)

  return (
   <div className="flex flex-wrap">
  {posts.map((post) => (
    <div key={post.$id} className="p-4 md:w-1/4 w-full">
      <Cards {...post}/>
    </div>
  ))}
</div>
  );
};

export default AllPost;
