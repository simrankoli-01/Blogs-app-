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
    return <h1 className="text-center mt-10">Loading...</h1>;
  }

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl overflow-hidden border border-white/20 shadow-xl">
        {/* Cover */}
        <div className="h-16  md:h-30 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500" />

        {/* Profile Section */}
        <div className="flex flex-col items-center px-6 pb-8 -mt-10 md:-mt-20">
          <img
            src={
              profile.profileImg
                ? service.getFileView(profile.profileImg)
                : `https://ui-avatars.com/api/?name=${profile.name}&background=random`
            }
            alt={profile.name}
            className="w-16 h-16 md:w-40 md:h-40 rounded-full md:border-4 border-2 border-white object-cover shadow-lg"
          />

          {/* Name */}
          <h1 className="mt-4 text-2xl sm:text-3xl font-bold text-center">
            {profile.name}
          </h1>

          {/* Bio */}
          <p className="mt-3 text-center text-gray-300 max-w-xl text-sm sm:text-base">
            {profile.bio || "No bio added yet."}
          </p>

          {/* Email */}
          <p className="mt-4 text-center break-all text-sm sm:text-base">
            {profile.email}
          </p>

          {/* Edit Button */}
          <Link to="/edit-profile" className="mt-6 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-8 py-3 rounded-full bg-pink-500 hover:bg-pink-600 transition font-medium">
              Edit Profile
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
