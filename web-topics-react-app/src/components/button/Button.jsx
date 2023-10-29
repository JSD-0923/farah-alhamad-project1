import React, { useContext, useEffect } from "react";
import { FavContext } from "../../context/FavContext";

export const Button = (props) => {
  const { setToggleFavCardsSection } = useContext(FavContext);
  const handleOnButtonClick = () => {
    if (props.name === "favourite") {
      setToggleFavCardsSection((prev) => !prev);
    } else if (props.name === "themeMode") {
      localStorage.setItem(
        "themeMode",
        props.toggleThemeMode ? JSON.stringify("light") : JSON.stringify("dark")
      );
      props.handler((prev) => !prev);
    }
  };

  return (
    <button onClick={handleOnButtonClick}>
      <div className={`icon ${props.icon}`}></div>
      <div className="icon-title" id="mode-title">
        {props.title}
      </div>
    </button>
  );
};
