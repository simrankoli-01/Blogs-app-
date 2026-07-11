import React from "react";
import appWriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

const Cards = ({ $id, title, featureImage, featureImg }) => {
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
        <h2 className="md:text-xl text-sm font-bold">{title}</h2>
      </div>
    </Link>
  );
};

export default Cards;
