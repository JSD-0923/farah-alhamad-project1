import React from "react";
import "./Header.css";
import { Button } from "../button/Button";

export const Header = (props) => {
  return (
    <header>
      <div className="logo">Web Topics</div>
      <div className="btn-wrapper">
        <Button
          title={props.toggleThemeMode ? "Light Mode" : "Dark Mode"}
          icon="moon-icon"
          name="themeMode"
          handler={props.setToggleThemeMode}
          toggleThemeMode={props.toggleThemeMode}
        />
        <Button title="Favourites" icon="fav-icon" name="favourite" />
      </div>
    </header>
  );
};
