import React from "react";

function Button({
  children,
  type = "button",
  bgcolor = "bg-white",
  textcolor = "text-black",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      {...props}
      className={`px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] transition duration-300 hover:bg-black/80 hover:text-white ${bgcolor} ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;