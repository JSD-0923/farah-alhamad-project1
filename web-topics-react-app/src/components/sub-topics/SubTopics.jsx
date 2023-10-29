import React from "react";

const SubTopics = (props) => {
  return (
    <section className="sub-topics-section">
      <div className="sub-topics-list">
        <h1>{props.topicData.topic} Sub Topics</h1>
        {props.topicData.subtopics &&
          props.topicData.subtopics.map((topic, id) => (
            <div className="sub-topic" key={id}>
              <div className="icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="ionicon"
                  viewBox="0 0 512 512"
                >
                  <path
                    d="M448 256c0-106-86-192-192-192S64 150 64 256s86 192 192 192 192-86 192-192z"
                    fill="none"
                    stroke="green"
                    stroke-miterlimit="10"
                    stroke-width="32"
                  />
                  <path
                    fill="none"
                    stroke="green"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="32"
                    d="M352 176L217.6 336 160 272"
                  />
                </svg>
              </div>
              <div>{topic}</div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default SubTopics;
