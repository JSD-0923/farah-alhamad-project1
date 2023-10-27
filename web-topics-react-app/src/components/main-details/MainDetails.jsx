import React, { useEffect, useState } from "react";
import { TopicDefinition } from "../topic-definition/TopicDefinition";
import { useParams } from "react-router-dom";

export const MainDetails = () => {
  const [topicData, setTopicData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchTopicDetails = async () => {
      try {
        const detailsUrl = `https://tap-web-1.herokuapp.com/topics/details/${id}`;
        const response = await fetch(detailsUrl);
        if (!response.ok) {
          throw new Error("Something went wrong. Details page failed to load.");
        }

        const data = await response.json();
        setTopicData(data);
      } catch (error) {
        console.error("Something went wrong. Details page failed to load.");
      }
    };

    fetchTopicDetails();
  }, []);

  return (
    <main>
      <div className="details-topic">
        <div className="topic-definition">
          <TopicDefinition topicData={topicData} />
        </div>
        <div className="card-container">
          <div className="topic-card"></div>
        </div>
      </div>
      <section className="sub-topics-section">
        <div className="sub-topics-list"></div>
      </section>
    </main>
  );
};
