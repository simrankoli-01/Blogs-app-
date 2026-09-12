import React from "react";
import appWriteService from "../appwrite/conf";
import { Link } from "react-router-dom";

const Cards = ({
  $id,
  title,
  featureImg,
  profileImg,
  username,
  index = 0,
}) => {
  return (
    <article className="group">
      <Link to={`/post/${$id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-white">
          <img
            src={appWriteService.getFileView(featureImg)}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          <div className="absolute inset-0 bg-black/0 transition group-hover:bg-black/10" />

          <div className="absolute left-4 top-4">
            <span className="text-white px-3 py-1 text-[20px] uppercase tracking-[0.2em]">
              0{index + 1}
            </span>
          </div>
        </div>
      </Link>

      <div className="pt-5">
        <div className="flex items-center justify-between gap-3">
          <Link
            to="/profile"
            className="flex items-center gap-2"
          >
            <img
              src={
                profileImg
                  ? appWriteService.getFileView(profileImg)
                  : `https://ui-avatars.com/api/?name=${username}&background=f5f2eb&color=171717`
              }
              alt={username}
              className="h-7 w-7 rounded-full object-cover"
            />

            <span className="text-[10px] uppercase tracking-[0.15em] text-white/50">
              {username}
            </span>
          </Link>

          <span className="text-[10px] uppercase tracking-wider text-white/30">
            Story
          </span>
        </div>

        <Link to={`/post/${$id}`}>
          <h2 className="mt-4 font-serif text-2xl leading-[1.05] text-white transition group-hover:italic md:text-3xl">
            {title}
          </h2>
        </Link>

        <div className="mt-5 h-px w-full bg-white/10" />
      </div>
    </article>
  );
};

export default Cards;