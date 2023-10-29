import React, { useState, useEffect } from "react";
export const FavCard = (props) => {
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
      <div>
        {image && (
          <img src={image} className="fav-img" alt={props.cardData.topic} />
        )}
      </div>
      <div className="fav-topic">{props.cardData.topic}</div>
    </>
  );
};
