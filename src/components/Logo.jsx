import React from "react";
import { GiButterfly } from "react-icons/gi";
import { GiButterflyFlower } from "react-icons/gi";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center justify-center text-white">
      <span>
        <GiButterflyFlower className="md:text-3xl text-2xl"/>
      </span>
      <h2 className="md:text-2xl text-xl font-serif">memoir</h2>
    </div>
  );
}

export default Logo;
