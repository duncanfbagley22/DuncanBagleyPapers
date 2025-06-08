(function() {
  // Get the mapping file from a <script> tag attribute, fallback to 'imageMap.json'
  const currentScript = document.currentScript;
  const mapSrc = currentScript.getAttribute('data-map') || '../../json/thumbnails.json';

  fetch(mapSrc)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load ${mapSrc}`);
      return res.json();
    })
    .then(map => {
      document.querySelectorAll('img[data-img-key]').forEach(img => {
        const key = img.getAttribute('data-img-key');
        if (map[key]) {
          img.src = map[key];
        } else {
          console.warn(`Image key "${key}" not found in ${mapSrc}`);
        }
      });
    })
    .catch(err => {
      console.error('Error loading image map:', err);
    });
})();
