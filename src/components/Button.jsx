import React from "react";

function Button({
  children,
  type = "button",
  bgcolor = "bg-violet-600",
  textcolor = "white",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      className={`md:px-4 px-2 py-1 md:py-2 rounded-xl ${bgcolor} ${textcolor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
