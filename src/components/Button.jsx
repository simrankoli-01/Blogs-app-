import React from "react";

function Button({
  children,
  type = "button",
  bgcolor = "bg-[#171717]",
  textcolor = "text-white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] transition duration-300 hover:bg-black/80 ${bgcolor} ${textcolor} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;