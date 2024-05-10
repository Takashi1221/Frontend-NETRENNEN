import React from "react";

const sizes = {
  "2xl": "text-2xl font-bold md:text-[22px]",
  xl: "text-xl font-bold",
  s: "text-sm font-bold",
  md: "text-base font-bold",
  xs: "text-xs font-bold",
  lg: "text-lg font-bold",
};

const Heading = ({ children, className = "", size = "md", as, ...restProps }) => {
  const Component = as || "h6";

  return (
    <Component className={`text-blue_gray-900 font-nokora ${className} ${sizes[size]}`} {...restProps}>
      {children}
    </Component>
  );
};

export { Heading };
