const modeBtn = document.querySelector(".mode-btn");
const iconTitle = document.querySelector("#mode-title");
const topicDefinition = document.querySelector(".topic-definition");
const favCardsSection = document.querySelector(".fav-cards-wrapper");
const favBtn = document.querySelector(".favourite-section");

let renderTopicDetails = (data) => {
  topicDefinition.innerHTML += `
    <div class="topic-content">
      <div class="subtitle">${data.category}</div>
      <h1>${data.topic}</h1>
      <div class="review">
      ${generateStarRating(data.rating)}
    </div>
      <p> ${data.description}</p>
    </div>`;
};

let generateStarRating = (rating) => {
  const fullStarCount = Math.round(rating);
  const halfStar = rating % 1 >= 0.5 ? 1 : 0;
  const emptyStarCount = 5 - fullStarCount - halfStar;

  let starsHtml = "";

  for (let i = 0; i < fullStarCount; i++) {
    starsHtml += `
          <svg
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
          />
        </svg>
          `;
  }

  if (halfStar) {
    starsHtml += `
          <svg xmlns="http://www.w3.org/2000/svg" class="ionicon" viewBox="0 0 512 512"><path d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z" fill="none" stroke="orange" stroke-linejoin="round" stroke-width="32"/><path d="M256 48v316L118 464l54-160-140-96h172l52-160z"/></svg>
          `;
  }

  for (let i = 0; i < emptyStarCount; i++) {
    starsHtml += `
          <svg
          class="empty-star"
          xmlns="http://www.w3.org/2000/svg"
          class="ionicon"
          viewBox="0 0 512 512"
        >
          <path
            d="M480 208H308L256 48l-52 160H32l140 96-54 160 138-100 138 100-54-160z"
            fill="none"
            stroke="orange"
            stroke-linejoin="round"
            stroke-width="32"
          />
        </svg>
          `;
  }

  return starsHtml;
};

let renderSubTopicList = (data) => {
  const subTopicSection = document.querySelector(".sub-topics-list");
  const mainTitle = document.createElement("h1");
  mainTitle.textContent = `${data.topic} Sub Topics`;
  subTopicSection.appendChild(mainTitle);

  data.subtopics.forEach((subTopic) => {
    const subTopicElement = document.createElement("div");
    subTopicElement.className = "sub-topic";

    subTopicElement.innerHTML = `
          <div class="icon">
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
          <div>${subTopic}</div>
        `;

    subTopicSection.appendChild(subTopicElement);
  });
};

let renderTopicCard = (data) => {
  const topicId = data.id;
  const favoriteTopics =
    JSON.parse(localStorage.getItem("favoriteTopics")) || [];

  const cardContainer = document.querySelector(".card-container");
  const cardTopic = document.createElement("div");
  cardTopic.className = "topic-card";
  const topicImage = document.createElement("div");
  topicImage.className = "topic-image";
  topicImage.style.backgroundImage = `url(../assets/${data.image})`;
  const author = document.createElement("div");
  author.className = "author";
  author.innerHTML = `${data.topic} <span>by </span><a href="#">${data.name}</a>`;
  const favoriteButtonWrapper = document.createElement("div");
  favoriteButtonWrapper.className = "favorite-button-wrapper";
  favoriteButtonWrapper.innerHTML = `
        <div class="interested-in-topic">Interested about this topic?</div>
        <button>
          <div class="button-text">Add to Favorites</div>
          <div class="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="ionicon"
              viewBox="0 0 512 512"
            >
              <path
                d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"
                fill="none"
                stroke="white"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="32"
              />
            </svg>
          </div>
        </button>
        <div class="unlimited-credits">Unlimited Credits</div>
      `;

  const button = favoriteButtonWrapper.querySelector("button");
  const buttonText = favoriteButtonWrapper.querySelector(".button-text");

  if (favoriteTopics.includes(topicId)) {
    button.classList.add("favorited");
    buttonText.textContent = "Remove from Favorites";
  } else {
    button.classList.remove("favorited");
    buttonText.textContent = "Add to Favorites";
  }

  button.addEventListener("click", () => {
    if (favoriteTopics.includes(topicId)) {
      const index = favoriteTopics.indexOf(topicId);
      favoriteTopics.splice(index, 1);
      button.classList.remove("favorited");
      buttonText.textContent = "Add to Favorites";
    } else {
      favoriteTopics.push(topicId);
      button.classList.add("favorited");
      buttonText.textContent = "Remove from Favorites";
    }

    localStorage.setItem("favoriteTopics", JSON.stringify(favoriteTopics));
  });

  cardTopic.appendChild(topicImage);
  cardTopic.appendChild(author);
  cardTopic.appendChild(favoriteButtonWrapper);

  cardContainer.appendChild(cardTopic);
};

export let renderDetailsPage = (data) => {
  renderTopicDetails(data);
  renderSubTopicList(data);
  renderTopicCard(data);
};

let toggleDarkMode = () => {
  if (!document.body.classList.contains("dark")) {
    document.body.classList.add("dark");
    iconTitle.textContent = "Light Mode";
    localStorage.setItem("themeMode", JSON.stringify("dark"));
  } else {
    document.body.classList.remove("dark");
    iconTitle.textContent = "Dark Mode";
    localStorage.setItem("themeMode", JSON.stringify("light"));
  }
};

let setDarkThemeMode = () => {
  document.body.classList.add("dark");
  iconTitle.textContent = "Light Mode";
};

let setLightThemeMode = () => {
  document.body.classList.remove("dark");
  iconTitle.textContent = "Dark Mode";
};

export let setThemeMode = () => {
  const themeMode = JSON.parse(localStorage.getItem("themeMode"));
  switch (themeMode) {
    case "dark":
      setDarkThemeMode();
      break;
    case "light":
      setLightThemeMode();
      break;
    default:
      const darkThemeMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (darkThemeMode) {
        setDarkThemeMode();
      } else {
        setLightThemeMode();
      }
      break;
  }
};

modeBtn.addEventListener("click", toggleDarkMode);

export let removeLoading = () => {
  const mainLoading = document.querySelector("#main-loading");
  mainLoading.remove();
};
let renderEmptyMsg = (section) => {
  section.innerHTML = `
        <div class="empty-msg">No topics found</div>
    `;
};

let renderFavCardsSection = (allCardsData, favoriteIds) => {
  for (let item of allCardsData) {
    if (favoriteIds.includes(item["id"])) {
      let favCard = document.createElement("a");
      favCard.href = `../details-page/details-page.html?id=${item.id}`;
      favCard.className = "fav-card";
      const topicImage = document.createElement("div");

      topicImage.style.backgroundImage = `url(../assets/${item.image})`;
      topicImage.className = "fav-img";
      favCard.appendChild(topicImage);

      favCard.innerHTML += `
            <div class="fav-topic">${item.topic}</div>
          `;
      favCardsSection.appendChild(favCard);
    }
  }
};

export let toggleFavCardsSection = (allCardsData) => {
  if (!favBtn.classList.contains("d-none")) {
    favBtn.classList.add("d-none");
    favCardsSection.innerHTML = "";
  } else {
    const favoriteIds = JSON.parse(localStorage.getItem("favoriteTopics"));

    if (favoriteIds.length) {
      renderFavCardsSection(allCardsData, favoriteIds);
    } else {
      renderEmptyMsg(favCardsSection);
    }

    favBtn.classList.remove("d-none");
  }
};
