import React from "react";
import appWriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

const Cards = ({ $id, title, featureImage, featureImg , username}) => {
  // console.log('featureImg value:', featureImg)
  //  console.log('preview url:', appWriteService.getFileView(featureImg))
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full p-4 rounded-xl bg-white/20">
        <div className="w-full justify-center mb-4">
          <img
            src={appWriteService.getFileView(featureImg)}
            alt={title}
            className="rounded-xl"
          />
        </div>
        <div className="flex items-center mt-3">
          <div className="md:w-8 md:h-8 w-5 h-5 object-cover rounded-full bg-white/20 flex items-center justify-center font-semibold">
            {username?.charAt(0).toUpperCase()}
          </div>

          <div className="ml-2">
            <p className="text-sm font-medium">{username}</p>
          </div>
        </div>
        <h2 className="text-sm text-gray-900 font-mono">{title}</h2>
      </div>
    </Link>
  );
};

export default Cards;
