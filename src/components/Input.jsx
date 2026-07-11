import React from "react";
import { useId } from "react";

const Input = React.forwardRef(function input(
  { label, type = "text", className = "", ...props },
  ref
) {
    const id = useId()
  return (
    <div className="w-full">
       {label && <label className="block mb-1 pl-1" htmlFor={id}>
        {label}
        </label>
        }
        <input type={type} className={`px-3 py-2 text-sm rounded-lg  text-black duration-200 outline-none bg-white/20 w-full ${className}`} ref={ref} {...props} id={id}/>
    </div>
  )
});

export default Input;
