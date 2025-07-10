function loadMedia(config) {
  const params = new URLSearchParams(window.location.search);

  const jsonPath = params.get("json") || config.jsonPath || "media.json";
  const section = params.get("section") || config.section || "Week 1";
  const currentPage = parseInt(params.get("page") || "1", 10);
  const pageSize = config.pageSize || 20;

  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      const items = data[section];
      if (!items || items.length === 0) {
        document.getElementById("gallery-container").innerHTML = "<p>No media found.</p>";
        return;
      }

      const totalPages = Math.ceil(items.length / pageSize);
      const pageItems = items.slice((currentPage - 1) * pageSize, currentPage * pageSize);

      const container = document.getElementById("gallery-container");
      container.innerHTML = "";

      pageItems.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-3 portfolio-item";

        const link = document.createElement("a");
        link.href = item.video_link || item.thumbnail;
        link.target = "_blank";

const wrapper = document.createElement("div");
wrapper.className = "media-wrapper";

const media = document.createElement("img");
media.className = "img-responsive";
media.src = item.thumbnail;
media.alt = item.name || "";

wrapper.appendChild(media);

// If it's a video, add a play icon overlay
if (item.video_link) {
  const playIcon = document.createElement("div");
  playIcon.className = "play-icon";
  wrapper.appendChild(playIcon);
}

link.appendChild(wrapper);
col.appendChild(link);
container.appendChild(col);
      });

      renderPagination(currentPage, totalPages, section, jsonPath);
    })
    .catch(err => {
      console.error("Error loading media:", err);
      document.getElementById("gallery-container").innerHTML = "<p>Error loading media.</p>";
    });
}

function renderPagination(currentPage, totalPages, section, jsonPath) {
  const container = document.getElementById("pagination-container");
  container.innerHTML = "";

  if (totalPages <= 1) return;

  const ul = document.createElement("ul");
  ul.className = "pagination";

  const createPageLink = (page, label, isActive = false) => {
    const li = document.createElement("li");
    if (isActive) li.classList.add("active");

    const a = document.createElement("a");
    a.href = `?section=${encodeURIComponent(section)}&json=${encodeURIComponent(jsonPath)}&page=${page}`;
    a.textContent = label;
    li.appendChild(a);
    return li;
  };

  ul.appendChild(createPageLink(Math.max(1, currentPage - 1), "«"));

  for (let i = 1; i <= totalPages; i++) {
    ul.appendChild(createPageLink(i, i, i === currentPage));
  }

  ul.appendChild(createPageLink(Math.min(totalPages, currentPage + 1), "»"));
  container.appendChild(ul);
}
