 const fetchTopics = async () => {
    try {
        const response = await fetch(`https://tap-web-1.herokuapp.com/topics/list`);
        return response.json();
        
     } catch (error) {
        throw error;
    }
    
};
const renderTopics = (topics) => {
    const topicsList = document.querySelector('.row.topics-list');
    topicsList.innerHTML = topics.map(topic => `
  <div class="p-2 col-sm-6 col-md-4 col-lg-3 col-xl-2">
              <a href="./details-page/details-page.html" class="card">
                <div class="topic-image html"></div>
                <div class="p-3">
                  <div class="topic-name">${topic.category}</div>
                  <div class="course-title">${topic.topic}</div>
                  <div class="review-stars">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                      />
                    </svg>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="ionicon"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M394 480a16 16 0 01-9.39-3L256 383.76 127.39 477a16 16 0 01-24.55-18.08L153 310.35 23 221.2a16 16 0 019-29.2h160.38l48.4-148.95a16 16 0 0130.44 0l48.4 149H480a16 16 0 019.05 29.2L359 310.35l50.13 148.53A16 16 0 01394 480z"
                      />
                    </svg>
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
                  </div>
                  <div class="author">Author: ${topic.name}</div>
                </div>
              </a>
            </div>
  `)
}
//render all topics when the page initially loads
window.onload=async function(){
  let topics=  await fetchTopics();
    renderTopics(topics);

};
