import {
  renderTopicsCard,
  removeLoading,
  toggleFavCardsSection,
} from "./index.view.js";

const favButton = document.querySelector(".favorite-Button");
const searchInput = document.querySelector(".search-input");
const sortInput = document.querySelector('select[name="sort"]');
const selectFilterElement = document.querySelector('select[name="filter"]');

let data = [];
let cards = [];
let cardCategories = [];
let searchTerm = "";
let sortValue = "";
let filterValue = "";
let debounceSearch;

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

let renderFilterdCategories = (cardCategories) => {
  cardCategories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectFilterElement.appendChild(option);
  });
};

let init = async () => {
  await fetchTopicsList();
  for (let i = 0; i < data.length; i++) {
    if (!cardCategories.includes(data[i]["category"])) {
      cardCategories.push(data[i]["category"]);
    }
  }
  cards = JSON.parse(JSON.stringify(data));
  removeLoading();
  renderTopicsCard(cards);
  renderFilterdCategories(cardCategories);
};

let handleSearchInput = () => {
  cards = data.filter((card) => {
    return card["topic"].toLowerCase().includes(searchTerm.toLowerCase());
  });
};

let handleSortInput = () => {
  switch (sortValue) {
    case "title":
      cards.sort((a, b) => {
        return a.topic.toLowerCase() >= b.topic.toLowerCase() ? 1 : -1;
      });
      break;
    case "author":
      cards.sort((a, b) => {
        return a.name.toLowerCase() >= b.name.toLowerCase() ? 1 : -1;
      });
      break;
    case "reset":
      handleSearchInput();
      break;
  }
};

let handleFilterInput = () => {
  cards = cards.filter((card) => {
    return card["category"].includes(filterValue);
  });
};

let applyInputChange = () => {
  handleSearchInput();
  handleSortInput();
  handleFilterInput();
  renderTopicsCard(cards);
};

let onInputChange = async (e, inputType) => {
  switch (inputType) {
    case "search":
      clearTimeout(debounceSearch);
      debounceSearch = setTimeout(() => {
        searchTerm = e.target.value;
        applyInputChange();
      }, 300);
      break;
    case "sort":
      sortValue = e.target.value;
      applyInputChange();
      break;
    case "filter":
      filterValue = e.target.value;
      applyInputChange();
      break;
  }
};

init();

favButton.addEventListener("click", () => toggleFavCardsSection(data));

searchInput.addEventListener("keyup", (e) => onInputChange(e, "search"));

sortInput.addEventListener("change", (e) => onInputChange(e, "sort"));

selectFilterElement.addEventListener("change", (e) =>
  onInputChange(e, "filter")
);
