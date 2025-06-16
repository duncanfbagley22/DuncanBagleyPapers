document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const jsonUrl = body.dataset.json;
  const sectionName = body.dataset.section;

  const container = document.getElementById("gallery-container");

  if (!jsonUrl || !sectionName) {
    container.innerHTML = "<p>Error: Missing data-json or data-section on <body>.</p>";
    return;
  }

  fetch(jsonUrl)
    .then(res => res.json())
    .then(data => {
      const items = data[sectionName];
      if (!items || !Array.isArray(items)) {
        container.innerHTML = `<p>No media found for section "${sectionName}".</p>`;
        return;
      }

      items.forEach(item => {
        const col = document.createElement("div");
        col.className = "col-md-3 portfolio-item";

        const link = document.createElement("a");
        link.href = item.type === "video" && item.video_link ? item.video_link : item.url;
        link.target = "_blank";

        const img = document.createElement("img");
        img.className = "img-responsive";
        img.src = item.url;
        img.alt = item.name || "";

        link.appendChild(img);
        col.appendChild(link);
        container.appendChild(col);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Failed to load gallery.</p>";
    });
});
