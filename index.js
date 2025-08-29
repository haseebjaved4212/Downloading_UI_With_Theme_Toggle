// Theme handling
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Initialize theme
setTheme(getPreferredTheme());

// Theme toggle button
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
    }
});

// Download simulation
const downloadButton = document.getElementById('downloadButton');
const progress = document.getElementById('progress');
const status = document.getElementById('status');
const percent = document.getElementById('percent');

downloadButton.addEventListener('click', () => {
    let width = 0;
    status.textContent = 'Status: Downloading...';
    percent.textContent = '0%';
    progress.style.width = '0%';
    downloadButton.disabled = true;

    const interval = setInterval(() => {
        if (width >= 100) {
            clearInterval(interval);
            status.textContent = 'Status: Download Complete!';
            downloadButton.disabled = false;
        } else {
            width++;
            progress.style.width = width + '%';
            percent.textContent = width + '%';
        }
    }, 50);
});