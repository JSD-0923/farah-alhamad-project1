import React from "react";
import "./Header.css";
import { Button } from "../button/Button";
export const Header = () => {
  return (
    <header>
      <div className="logo">Web Topics</div>
      <div className="btn-wrapper">
        <Button title="Dark Mode" icon="moon-icon" />
        <Button title="Favourites" icon="fav-icon" />
      </div>
    </header>
  );
};
