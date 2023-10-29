import React, { useEffect, useState } from "react";
import { TopicDefinition } from "../../components/topic-definition/TopicDefinition";
import { useParams } from "react-router-dom";
import { TopicCard } from "../../components/topic-card/TopicCard";
import SubTopics from "../../components/sub-topics/SubTopics";
export const DetailsPage = () => {
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
    <div>
      <div className="details-topic">
        <div className="topic-definition">
          <TopicDefinition topicData={topicData} />
        </div>
        <div className="card-container">
          <TopicCard topicData={topicData} />
        </div>
      </div>
      <SubTopics topicData={topicData} />
    </div>
  );
};
