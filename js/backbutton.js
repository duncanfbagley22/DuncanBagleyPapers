function goToMainPage() {
    const url = new URL(window.location.href);
    const path = url.pathname;

    // Extract the filename and directory path
    const parts = path.split('/');
    const filename = parts.pop(); // Get last part (e.g., Week6X.html)

    // Replace "WeekX.html" where X is any single character, with "Week.html"
    const newFilename = filename.replace(/(Week\d+).\.html$/, '$1.html');

    // Reconstruct path
    const newPath = [...parts, newFilename].join('/');

    // Navigate to new URL
    window.location.href = newPath;
}