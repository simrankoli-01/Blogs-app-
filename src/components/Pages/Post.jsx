import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import appwiteService from "../../appwrite/conf";
import Button from "../Button";
import Container from "../container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

const Post = () => {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor =
    post && userData
      ? post.userId === userData.$id
      : false;

  useEffect(() => {
    if (!slug) {
      navigate("/");
      return;
    }

    appwiteService.getPost(slug).then((data) => {
      if (data) {
        setPost(data);
      } else {
        navigate("/");
      }
    });
  }, [slug, navigate]);

  const deletePost = async () => {
    await appwiteService.deletePost(post.$id);
    navigate("/");
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#f5f2eb] pt-20 text-center">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f2eb] text-[#171717]">
      <Container>
        <article className="mx-auto max-w-5xl pb-24 pt-10 md:pt-20">
          
          <div className="mb-8 flex items-center justify-between border-b border-black/10 pb-5">
            <Link
              to="/"
              className="text-[10px] uppercase tracking-[0.2em] text-black/50 hover:text-black"
            >
              ← Back to stories
            </Link>

            {isAuthor && (
              <div className="flex gap-2">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgcolor="bg-transparent"
                    textcolor="text-black"
                    className="border border-black/20 text-[10px] uppercase tracking-wider hover:bg-black hover:text-white"
                  >
                    Edit
                  </Button>
                </Link>

                <Button
                  bgcolor="bg-black"
                  className="text-[10px] uppercase tracking-wider"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>

          <header className="max-w-4xl">
            <p className="mb-5 text-[10px] uppercase tracking-[0.3em] text-black/40">
              Journal · Story
            </p>

            <h1 className="font-serif text-5xl leading-[0.9] tracking-tight sm:text-6xl md:text-8xl">
              {post.title}
            </h1>
          </header>

          <div className="mt-12 aspect-[16/9] overflow-hidden bg-[#ddd7cc] md:mt-16">
            <img
              src={appwiteService.getFileView(post.featureImg)}
              alt={post.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="prose prose-neutral max-w-none prose-headings:font-serif prose-p:leading-8 prose-p:text-black/70 prose-a:text-black">
              {parse(post.content)}
            </div>
          </div>
        </article>
      </Container>
    </main>
  );
};

export default Post;