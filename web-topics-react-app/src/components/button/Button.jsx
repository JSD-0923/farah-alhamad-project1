import React from "react";

export const Button = (props) => {
  return (
    <button>
      <div className={`icon ${props.icon}`}></div>
      <div className="icon-title" id="mode-title">
        {props.title}
      </div>
    </button>
  );
};
