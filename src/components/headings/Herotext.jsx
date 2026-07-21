import React from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/3d.png";

const Herotext = () => {
  return (
    <div className="flex flex-col w-full min-h-screen items-center justify-center text-white px-4 sm:px-8">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full py-5">
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold leading-tight">
            Every Story Deserves to be Shared
          </h1>
          <h3 className="mt-4 text-base sm:text-lg md:text-xl italic font-light font-sans text-gray-200">
            Write, publish, and inspire readers around the world
          </h3>
          <Link
            to="/signup"
            className="mt-6 inline-block bg-violet-500 hover:bg-violet-600 transition-colors duration-200 px-6 py-3 rounded-full font-medium"
          >
            Get Started
          </Link>
        </div>

        <div className="shrink-0">
          <img
            className="w-full h-full object-cover"
            src={heroImage}
            alt="Person writing"
          />
        </div>
      </div>
    </div>
  );
};

export default Herotext;