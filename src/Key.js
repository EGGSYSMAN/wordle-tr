import React from "react";
import cx from "classnames";

export default function Key({ children, className, ...props }) {
  return (
    <button
      {...props}
      className={cx(
        `flex-1 bg-gray-300 font-bold p1 text-xs h-14 rounded flex justify-center items-center mb-2 uppercase`,
        className
      )}
    >
      {children}
    </button>
  );
}
