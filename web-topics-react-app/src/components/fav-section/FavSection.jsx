import React, { useState, useEffect } from "react";
import { FavCard } from "../fav-card/FavCard";

export const FavSection = (props) => {
  const [favoriteTopics, setFavoriteTopics] = useState([]);

  useEffect(() => {
    const storedFavoriteTopics =
      JSON.parse(localStorage.getItem("favoriteTopics")) || [];
    setFavoriteTopics(storedFavoriteTopics);
  }, []);

  return (
    <section className="favourite-section">
      <div className="fav-title">My Favourite Topics</div>
      <div className="fav-cards-wrapper">
        {favoriteTopics.map((favoriteId) => {
          const topicData = props.data.find((data) => data.id === favoriteId);
          if (topicData) {
            return (
              <div key={topicData.id} className="fav-card">
                <FavCard cardData={topicData} />
              </div>
            );
          }

          return null;
        })}
      </div>
    </section>
  );
};
