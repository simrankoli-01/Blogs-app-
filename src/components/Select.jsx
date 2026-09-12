// Select.jsx
import React, { useId } from "react";

const Select = React.forwardRef(function Select(
  { label, className = "", options = [], ...props },
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

      <select
        {...props}
        ref={ref}
        id={id}
        className={`w-full border border-black/10 bg-white px-4 py-3 text-sm text-black outline-none transition focus:border-black ${className}`}
      >
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Select;