import { renderTopicsCard, removeLoading } from "./index.view.js";

let data = [];

let fetchTopicsList = async () => {
  try {
    const response = await fetch("https://tap-web-1.herokuapp.com/topics/list");

    if (!response.ok) {
      throw new Error("Something went wrong. Web topics failed to load.");
    }

    data = await response.json();
  } catch (error) {
    console.error("Something went wrong. Web topics failed to load.");
  }
};

let init = async () => {
  await fetchTopicsList();
  removeLoading();
  renderTopicsCard(data);
};

init();
