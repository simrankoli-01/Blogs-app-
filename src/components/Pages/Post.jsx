import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwiteService from "../../appwrite/conf";
import { Button, Container } from "../index";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwiteService.getPost(slug).then((post) => {
        if (post) setPosts(post);
        else navigate("/");
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  const deletePost = () => {
    appwiteService.deletePost(post.$id);
    navigate("/");
  };
//   console.log("userData:", userData);
// console.log("post.userId:", post?.userId);

  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full flex relative justify-center bg-white/20 rounded-xl px-2 py-5 z-0">
        <div className="flex md:flex-row flex-col justify-center">
              <img
            src={appwiteService.getFileView(post.featureImg)}
            alt={post.title}
            className="w-full max-h-75 sm:max-h-100 lg:max-h-125 object-contain rounded-xl"
          />
          <div className="text-center py-2 px-4">
            <h1 className="md:text-2xl text-xl font-bold mb-3">{post.title}</h1>
            <div className='md:text-lg  text-sm browser-css'>{parse(post.content)}</div>
          </div>
        </div>
          {isAuthor && (
            <div className="absolute md:bottom-6 bottom-1.5 right-6 z-10">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgcolor="bg-green-500 hover:bg-green-700" className="md:mr-3 mr-1">
                  Edit
                </Button>
              </Link>
              <Button bgcolor="bg-red-600 hover:bg-red-700" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>
         
      </Container>
    </div>
  ) : null;
};

export default Post;
