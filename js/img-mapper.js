(function () {
  const currentScript = document.currentScript;
  const mapSrc = currentScript.getAttribute('data-map') || 'imageMap.json';

  fetch(mapSrc)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${mapSrc}`);
      return res.json();
    })
    .then(map => {
      // Replace image src
      document.querySelectorAll('img[data-img-key]').forEach(img => {
        const key = img.dataset.imgKey;
        if (map[key]) {
          img.src = map[key];
          img.setAttribute('loading', 'lazy'); // Optional: lazy loading
        } else {
          console.warn(`Image key "${key}" not found in ${mapSrc}`);
        }
      });

      // Replace link href
      document.querySelectorAll('[data-href-key]').forEach(link => {
        const key = link.dataset.hrefKey;
        if (map[key]) {
          link.href = map[key];
        } else {
          console.warn(`Link key "${key}" not found in ${mapSrc}`);
        }
      });
    })
    .catch(err => {
      console.error('Error loading mapping file:', err);
    });
})();