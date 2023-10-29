import React, { useState, useEffect } from "react";
import { ActionButton } from "../action-button/ActionButton";

export const TopicCard = (props) => {
  const [image, setImage] = useState(null);
  const [favorite, setFavorite] = useState(false);

  const loadImage = async (imageName) => {
    try {
      let cardImage = await import(`../../assets/${imageName}`);
      setImage(cardImage.default);
    } catch {
      setImage(null);
    }
  };

  useEffect(() => {
    loadImage(props.topicData.image);
    const favoriteTopics =
      JSON.parse(localStorage.getItem("favoriteTopics")) || [];
    setFavorite(favoriteTopics.includes(props.topicData.id));
  }, [props.topicData.image, props.topicData.id]);

  const toggleFavorite = () => {
    const favoriteTopics =
      JSON.parse(localStorage.getItem("favoriteTopics")) || [];
    if (favorite) {
      const index = favoriteTopics.indexOf(props.topicData.id);
      if (index !== -1) {
        favoriteTopics.splice(index, 1);
      }
    } else {
      favoriteTopics.push(props.topicData.id);
    }

    localStorage.setItem("favoriteTopics", JSON.stringify(favoriteTopics));
    setFavorite(!favorite);
  };

  return (
    <div className="topic-card">
      <div className="topic-image">
        {image && (
          <img
            src={image}
            className="topic-image"
            alt={props.topicData.topic}
          />
        )}
      </div>
      <div className="author">
        {props.topicData.topic} <span>by </span>
        <a>{props.topicData.name}</a>
      </div>
      <div className="favorite-button-wrapper">
        <div className="interested-in-topic">Interested about this topic?</div>
        <ActionButton favorite={favorite} toggleFavorite={toggleFavorite} />
        <div className="unlimited-credits">Unlimited Credits</div>
      </div>
    </div>
  );
};
