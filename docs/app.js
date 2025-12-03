// ==================== State Management ====================
let allLogos = [];
let filteredLogos = [];
const REPO_URL = 'https://raw.githubusercontent.com/jonhtechywe-maker/car-brand-logo-dataset/main';
const DATA_JSON_URL = `${REPO_URL}/logos/data.json`;

// ==================== DOM Elements ====================
const logosGrid = document.getElementById('logosGrid');
const searchInput = document.getElementById('searchInput');
const resultsCount = document.getElementById('resultsCount');
const loading = document.getElementById('loading');
const error = document.getElementById('error');
const noResults = document.getElementById('noResults');
const themeToggle = document.getElementById('themeToggle');

// ==================== Theme Management ====================
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('.theme-icon');
    icon.textContent = theme === 'dark' ? '🌙' : '☀️';
}

// ==================== Data Fetching ====================
async function fetchLogos() {
    try {
        loading.style.display = 'block';
        error.style.display = 'none';
        
        const response = await fetch(DATA_JSON_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        allLogos = data;
        filteredLogos = data;
        
        loading.style.display = 'none';
        renderLogos(filteredLogos);
        updateResultsCount(filteredLogos.length);
        
    } catch (err) {
        console.error('Error fetching logos:', err);
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}

// ==================== Rendering ====================
function renderLogos(logos) {
    logosGrid.innerHTML = '';
    
    if (logos.length === 0) {
        noResults.style.display = 'block';
        return;
    }
    
    noResults.style.display = 'none';
    
    logos.forEach((logo, index) => {
        const card = createLogoCard(logo, index);
        logosGrid.appendChild(card);
    });
}

function createLogoCard(logo, index) {
    const card = document.createElement('div');
    card.className = 'logo-card';
    card.style.animationDelay = `${Math.min(index * 0.05, 1)}s`;
    
    // Create image container
    const imageContainer = document.createElement('div');
    imageContainer.className = 'logo-image-container';
    
    // Create image element
    const img = document.createElement('img');
    img.className = 'logo-image';
    img.src = logo.image.optimized || logo.image.thumb;
    img.alt = `${logo.name} logo`;
    img.loading = 'lazy';
    
    // Handle image load error
    img.onerror = function() {
        this.src = logo.image.thumb || logo.image.original;
    };
    
    imageContainer.appendChild(img);
    
    // Create name element
    const name = document.createElement('div');
    name.className = 'logo-name';
    name.textContent = logo.name;
    
    // Assemble card
    card.appendChild(imageContainer);
    card.appendChild(name);
    
    // Add click handler to open source in new tab
    card.addEventListener('click', () => {
        window.open(logo.image.source, '_blank');
    });
    
    return card;
}

// ==================== Search & Filter ====================
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase().trim();
    
    if (searchTerm === '') {
        filteredLogos = allLogos;
    } else {
        filteredLogos = allLogos.filter(logo => {
            const nameMatch = logo.name.toLowerCase().includes(searchTerm);
            const slugMatch = logo.slug.toLowerCase().includes(searchTerm);
            return nameMatch || slugMatch;
        });
    }
    
    renderLogos(filteredLogos);
    updateResultsCount(filteredLogos.length);
}

// Debounce search for better performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const debouncedSearch = debounce(handleSearch, 300);

// ==================== UI Updates ====================
function updateResultsCount(count) {
    const total = allLogos.length;
    if (count === total) {
        resultsCount.textContent = `Showing all ${total} logos`;
    } else {
        resultsCount.textContent = `Found ${count} of ${total} logos`;
    }
}

// ==================== Event Listeners ====================
function initEventListeners() {
    searchInput.addEventListener('input', debouncedSearch);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Add keyboard shortcut for search (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// ==================== Initialization ====================
function init() {
    initTheme();
    initEventListeners();
    fetchLogos();
}

// Start the app when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
