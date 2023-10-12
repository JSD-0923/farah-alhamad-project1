let data;
const topicDefinition = document.querySelector(".topic-definition");
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");

console.log(id);

let fetchTopicDetails = async () => {
  try {
    const url = `https://tap-web-1.herokuapp.com/topics/details/${id}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong. Details page failed to load.");
    }

    data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Something went wrong. Details page failed to load.");
  }
};

let renderTopicDetails = async () => {
  await fetchTopicDetails();
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
renderTopicDetails();
