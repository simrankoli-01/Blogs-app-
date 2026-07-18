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
  // console.log(slug)

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
    <div className="md:py-6 py-1">
      <Container>
        <div className="flex flex-col mx-auto max-w-3xl relative bg-white/20 md:rounded-xl rounded-none md:px-6 px-2 py-5 z-0">
           <div className="mx-auto">
              <img
            src={appwiteService.getFileView(post.featureImg)}
            alt={post.title}
            className=" w-100 max-h-50  object-cover rounded-xl"
          />
          </div>
         <div className="w-full mt-2">
      <div className="text-sm">{parse(post.content)}</div>
    </div>
        
          {isAuthor && (
            <div className="absolute md:top-5 top-6 md:right-6 right-4 z-10 text-white">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgcolor="cursor-pointer bg-green-500 hover:bg-green-700" className="md:mr-3 mr-1">
                  Edit
                </Button>
              </Link>
              <Button bgcolor="cursor-pointer bg-red-600 hover:bg-red-700" onClick={deletePost}>
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
