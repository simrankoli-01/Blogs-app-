import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/conf";
import Cards from "../Cards";
import Container from "../container/Container";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Herotext from "../headings/Herotext";
import profileService from "../../appwrite/profile";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (!authStatus) return;

    const loadPosts = async () => {
      try {
        const response = await appwriteService.getPosts();

        const postsWithProfiles = await Promise.all(
          response.documents.map(async (post) => {
            try {
              const profile = await profileService.getUserProfile(post.userId);

              return {
                ...post,
                username: profile?.name,
                profileImg: profile?.profileImg,
              };
            } catch {
              return post;
            }
          })
        );

        setPosts(postsWithProfiles);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, [authStatus]);

  if (!authStatus) {
    return <Herotext />;
  }

  const hasUserPost = posts.some(
    (post) => post.userId === userData?.$id
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <Container>
        {!hasUserPost && posts.length > 0 && (
          <div className="border-b border-white/10 py-4">
            <p className="text-center text-xs uppercase tracking-[0.15em] text-white/60">
              You haven't shared anything yet.{" "}
              <Link
                to="/add-post"
                className="font-semibold text-white underline underline-offset-4"
              >
                Create your first post
              </Link>
            </p>
          </div>
        )}

        <section className="pb-20 pt-12 md:pt-10">
          <div className="mb-14 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/50">
                The Journal
              </p>

              <h1 className="max-w-3xl font-serif text-5xl leading-[0.9] tracking-tight md:text-7xl lg:text-8xl">
                Stories worth
                <br />
                <span className="italic">remembering.</span>
              </h1>
            </div>

            <p className="max-w-xs text-sm leading-6 text-white/60">
              A collection of thoughts, ideas and stories shared by our
              community of writers.
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="border-y border-white/10 py-20 text-center">
              <p className="font-serif text-3xl">
                No stories yet.
              </p>

              <Link
                to="/add-post"
                className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-xs uppercase tracking-widest text-white"
              >
                Write a story
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <Cards
                  {...post}
                  key={post.$id}
                  index={index}
                />
              ))}
            </div>
          )}
        </section>
      </Container>
    </main>
  );
};

export default Home;