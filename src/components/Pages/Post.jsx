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
        <div className="flex relative bg-white/20 md:rounded-xl rounded-none md:px-6 px-0 py-5 z-0">
           {/* <div className="mx-auto">
              <img
            src={appwiteService.getFileView(post.featureImg)}
            alt={post.title}
            className="md:w-125 w-55 max-h-50  md:max-h-125 object-fit rounded-xl"
          />
          </div> */}
          {/* <div className="flex items-center mt-3">
          <div className="md:w-8 md:h-8 w-5 h-5 object-cover rounded-full bg-white/20 flex items-center justify-center font-semibold">
            {username?.charAt(0).toUpperCase()}
          </div>

          <div className="ml-2">
            <p className="text-sm font-medium">{username}</p>
          </div>
        </div> */}
         <div className="py-1 px-10 text-center w-full overflow-hidden">
      <div className="md:text-lg text-sm">{parse(post.content)}</div>
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
