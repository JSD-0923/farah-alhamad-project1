import React from "react";
import { StarRating } from "../star-rating/StarRating";

export const TopicDefinition = (props) => {
  return (
    <div className="topic-content">
      <div className="subtitle">{props.topicData.category}</div>
      <h1>{props.topicData.topic}</h1>
      <div className="review">
        <StarRating rating={props.topicData.rating} />
      </div>
      <p>{props.topicData.description}</p>
    </div>
  );
};
