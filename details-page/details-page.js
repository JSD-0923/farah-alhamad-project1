import {
  renderDetailsPage,
  toggleFavCardsSection,
  removeLoading,
  setThemeMode,
} from "./details-page.view.js";

let data;
let allCardsData;

const favButton = document.querySelector(".favorite-Button");
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");

let fetchTopicDetails = async () => {
  try {
    const url = `https://tap-web-1.herokuapp.com/topics/details/${id}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Something went wrong. Details page failed to load.");
    }

    data = await response.json();
  } catch (error) {
    console.error("Something went wrong. Details page failed to load.");
  }
};

let init = async () => {
  setThemeMode();
  await fetchTopicDetails();
  renderDetailsPage(data);
};

let fetchAllCards = async () => {
  try {
    const response = await fetch("https://tap-web-1.herokuapp.com/topics/list");

    if (!response.ok) {
      throw new Error("Something went wrong. Web topics failed to load.");
    }

    allCardsData = await response.json();
  } catch (error) {
    console.error("Something went wrong. Web topics failed to load.");
  }
};

let toggleFavSection = async () => {
  if (!allCardsData) {
    await fetchAllCards();
    removeLoading();
  }
  toggleFavCardsSection(allCardsData);
};

init();

favButton.addEventListener("click", () => toggleFavSection());
