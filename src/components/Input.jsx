// Input.jsx
import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block font-sans text-xs font-medium uppercase tracking-[0.18em] text-black/60"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        ref={ref}
        type={type}
        {...props}
        className={`w-full border border-black/10 bg-white px-4 py-3 text-sm text-black placeholder:text-black/30 outline-none transition focus:border-black ${className}`}
      />
    </div>
  );
});

export default Input;