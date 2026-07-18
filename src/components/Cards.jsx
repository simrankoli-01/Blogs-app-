import React from "react";
import appWriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

const Cards = ({ $id, title, featureImg, profileImg, username }) => {
  return (
      <div className="w-full p-4 rounded-xl bg-white/20">
        <Link to={`/post/${$id}`}>
        <div className="w-full justify-center mb-4">
          <img
            src={appWriteService.getFileView(featureImg)}
            alt={title}
            className="rounded-xl"
          />
        </div>
      </Link>
        <Link to="/profile">
          <div className="flex items-center mt-3">
            <img
              src={
                profileImg
                  ? appWriteService.getFileView(profileImg)
                  : `https://ui-avatars.com/api/?name=${username}`
              }
              className="w-10 h-10 object-cover rounded-full bg-white/20 "
            />

            <div className="ml-2">
              <p className="text-xl text-white font-medium">{username}</p>
            </div>
          </div>
        </Link>
        <h2 className="text-sm mt-1 text-blue-200 font-mono">{title}</h2>
      </div>
    
  );
};

export default Cards;
