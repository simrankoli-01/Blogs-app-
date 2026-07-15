import React, { useState, useEffect } from "react";
import appwriteService from "../../appwrite/conf";
import { Cards, Container } from "../index";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
    if(posts){
        setPosts(posts.documents)
        console.log(posts)
    }
  })
  }, []);

  

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
