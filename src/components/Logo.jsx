import React from "react";
import { RiQuillPenAiFill } from "react-icons/ri";
import { GiFeather } from "react-icons/gi";

function Logo({ width = "100px" }) {
  return (
    <div className="flex items-center justify-center text-white">
      <span>
        <GiFeather className="md:text-3xl text-2xl"/>
      </span>
      <h2 className="md:text-3xl text-2xl  mt-2 logo-font">Blog's</h2>
    </div>
  );
}

export default Logo;
