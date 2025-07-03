function goToMainPage() {
    const url = new URL(window.location.href);
    const path = url.pathname;

    // Extract the filename and directory path
    const parts = path.split('/');
    const filename = parts.pop(); // Get last part (e.g., Week6P.html)

    // Replace "P.html" or "p.html" with ".html"
    const newFilename = filename.replace(/(Week\d+)[Pp]\.html$/, '$1.html');

    // Reconstruct path and preserve query string if needed (optional)
    const newPath = [...parts, newFilename].join('/');
    
    // Navigate to new URL (without query string)
    window.location.href = newPath;
}