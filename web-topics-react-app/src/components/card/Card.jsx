import React, { useState, useEffect } from "react";
import { StarRating } from "../star-rating/StarRating";

const Card = (props) => {
  const [image, setImage] = useState(null);

  const loadImage = async (imageName) => {
    try {
      let cardImage = await import(`../../assets/${imageName}`);
      setImage(cardImage.default);
    } catch {
      setImage(null);
    }
  };

  useEffect(() => {
    loadImage(props.cardData.image);
  }, [props.cardData.image]);

  return (
    <>
      {image && (
        <img src={image} className="topic-image" alt={props.cardData.topic} />
      )}
      <div className="card-content">
        <div className="topic-name">{props.cardData.category}</div>
        <div className="course-title">{props.cardData.topic}</div>
        <div className="review-stars">
          <StarRating rating={props.cardData.rating} />
        </div>
        <div className="author">Author: {props.cardData.name}</div>
      </div>
    </>
  );
};

export default Card;
