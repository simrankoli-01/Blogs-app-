import React, { useEffect, useState } from "react";
import appwriteService from "../../appwrite/conf";
import Cards from "../Cards";
import Container from "../container/Container";
import profileService from "../../appwrite/profile";

const AllPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const response = await appwriteService.getPosts();

        const postsWithProfiles = await Promise.all(
          response.documents.map(async (post) => {
            try {
              const profile = await profileService.getUserProfile(
                post.userId
              );

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
        console.error(error);
      }
    };

    loadPosts();
  }, []);

  return (
    <main className="min-h-screen bg-black text-white">
      <Container>
        <section className="pb-20 pt-12 md:pt-20">
          <div className="mb-14 border-b border-white/10 pb-8">
            <p className="mb-4 text-[10px] uppercase tracking-[0.3em] text-white/40">
              Discover
            </p>

            <h1 className="font-serif text-6xl leading-none md:text-8xl">
              All Stories
            </h1>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Cards
                {...post}
                key={post.$id}
                index={index}
              />
            ))}
          </div>
        </section>
      </Container>
    </main>
  );
};

export default AllPost;