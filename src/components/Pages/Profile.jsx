import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import profileService from "../../appwrite/profile";
import { Link } from "react-router-dom";
import service from "../../appwrite/conf";

const Profile = () => {
  const userData = useSelector((state) => state.auth.userData);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (userData) {
      profileService
        .getUserProfile(userData.$id)
        .then(setProfile)
        .catch(console.error);
    }
  }, [userData]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-black pt-20 text-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-20">
        
        <div className="border-y border-white/10 py-10 md:py-16">
          <div className="flex flex-col items-start gap-8 md:flex-row md:items-center">
            
            <img
              src={
                profile.profileImg
                  ? service.getFileView(profile.profileImg)
                  : `https://ui-avatars.com/api/?name=${profile.name}&background=171717&color=f5f2eb`
              }
              alt={profile.name}
              className="h-28 w-28 rounded-full object-cover md:h-40 md:w-40"
            />

            <div>
              <p className="mb-3 text-[10px] uppercase tracking-[0.3em] text-white/40">
                Writer
              </p>

              <h1 className="font-serif text-5xl leading-none md:text-7xl">
                {profile.name}
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-6 text-white/60">
                {profile.bio || "No bio added yet."}
              </p>

              <p className="mt-4 text-xs text-white/40">
                {profile.email}
              </p>

              <Link
                to="/edit-profile"
                className="mt-6 inline-block rounded-full bg-white px-6 py-3 text-[10px] uppercase tracking-[0.2em] text-black"
              >
                Edit profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;