import React from "react";

export const WelcomeBar = () => {
  return (
    <section className="page-heading-container">
      <div className="page-heading-wrapper">
        <div className="main-title">Welcome to our website!</div>
        <div className="subtitle">
          We have a new design that fresh, modern and easy to use.
        </div>
      </div>
      <div className="triangle">
        <div className="blue-triangle"></div>
        <div className="green-triangle"></div>
      </div>
    </section>
  );
};
