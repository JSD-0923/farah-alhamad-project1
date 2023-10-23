const modeBtn = document.querySelector(".mode-btn");
const iconTitle = document.querySelector("#mode-title");
const cardsSection = document.querySelector(".cards-section");
const favCardsSection = document.querySelector(".fav-cards-wrapper");
const topicsnumber = document.querySelector(".title-topics-found");
const favBtn = document.querySelector(".favourite-section");
const selectFilterElement = document.querySelector('select[name="filter"]');

export let renderTopicsCard = (cards) => {
  cardsSection.innerHTML = "";
  topicsnumber.textContent = `"${cards.length}" Web Topics Found`;
  if (cards.length) {
    cards.forEach((item) => {
      const card = document.createElement("a");
      card.href = `./details-page/details-page.html?id=${item.id}`;
      card.className = "card";
      const topicImage = document.createElement("div");
      topicImage.style.backgroundImage = `url(./assets/${item.image})`;
      topicImage.className = `topic-image ${item.topic.toLowerCase()}`;
      card.appendChild(topicImage);

      card.innerHTML += `
                  <div class="card-content">
                    <div class="topic-name">${item.category}</div>
                    <div class="course-title">${item.topic}</div>
                    <div class="review-stars">
                      ${generateStarRating(item.rating)}
                    </div>
                    <div class="author">Author: ${item.name}</div>
                  </div>`;
      cardsSection.appendChild(card);
    });
  } else {
    renderEmptyMsg(cardsSection);
  }
};

export let removeLoading = () => {
  const mainLoading = document.querySelector("#main-loading");
  mainLoading.remove();
};

export let renderFilterdCategories = (cardCategories) => {
  cardCategories.forEach((category) => {
    let option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    selectFilterElement.appendChild(option);
  });
};

let renderEmptyMsg = (section) => {
  section.innerHTML = `
        <div class="empty-msg">No topics found</div>
    `;
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

let renderFavCardsSection = (data, favoriteIds) => {
  for (let item of data) {
    if (favoriteIds.includes(item["id"])) {
      let favCard = document.createElement("a");
      favCard.href = `./details-page/details-page.html?id=${item.id}`;
      favCard.className = "fav-card";
      const topicImage = document.createElement("div");

      topicImage.style.backgroundImage = `url(./assets/${item.image})`;
      topicImage.className = "fav-img";
      favCard.appendChild(topicImage);

      favCard.innerHTML += `
          <div class="fav-topic">${item.topic}</div>
        `;
      favCardsSection.appendChild(favCard);
    }
  }
};

export let toggleFavCardsSection = (data) => {
  if (!favBtn.classList.contains("d-none")) {
    favBtn.classList.add("d-none");
    favCardsSection.innerHTML = "";
  } else {
    const favoriteIds = JSON.parse(localStorage.getItem("favoriteTopics"));

    if (favoriteIds.length) {
      renderFavCardsSection(data, favoriteIds);
    } else {
      renderEmptyMsg(favCardsSection);
    }

    favBtn.classList.remove("d-none");
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
