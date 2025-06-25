// Sample prediction data (in a real application, this would come from a backend)
const predictions = {
    free: [
        {
            match: "Manchester United vs Liverpool",
            prediction: "Over 2.5 Goals",
            odds: "1.85",
            time: "20:00",
            confidence: "High",
            league: "Premier League"
        },
        {
            match: "Barcelona vs Real Madrid",
            prediction: "Both Teams to Score",
            odds: "1.65",
            time: "21:00",
            confidence: "Very High",
            league: "La Liga"
        },
        {
            match: "Bayern Munich vs Dortmund",
            prediction: "Home Win",
            odds: "1.95",
            time: "19:30",
            confidence: "Medium",
            league: "Bundesliga"
        },
        {
            match: "PSG vs Marseille",
            prediction: "Over 3.5 Goals",
            odds: "2.10",
            time: "20:45",
            confidence: "High",
            league: "Ligue 1"
        },
        {
            match: "Juventus vs Inter Milan",
            prediction: "Under 2.5 Goals",
            odds: "1.75",
            time: "20:45",
            confidence: "Medium",
            league: "Serie A"
        }
    ],
    categories: {
        banker: [
            {
                match: "Arsenal vs Chelsea",
                prediction: "Home Win",
                odds: "1.45",
                time: "17:30",
                confidence: "Very High",
                league: "Premier League"
            }
        ],
        odds: [
            {
                match: "Atletico Madrid vs Sevilla",
                prediction: "Draw",
                odds: "2.00",
                time: "21:00",
                confidence: "High",
                league: "La Liga"
            }
        ],
        over1: [
            {
                match: "Leicester vs Aston Villa",
                prediction: "Over 1.5 Goals",
                odds: "1.35",
                time: "15:00",
                confidence: "Very High",
                league: "Premier League"
            }
        ],
        over2: [
            {
                match: "Napoli vs Roma",
                prediction: "Over 2.5 Goals",
                odds: "1.65",
                time: "20:45",
                confidence: "High",
                league: "Serie A"
            }
        ],
        under: [
            {
                match: "Getafe vs Cadiz",
                prediction: "Under 2.5 Goals",
                odds: "1.55",
                time: "18:30",
                confidence: "High",
                league: "La Liga"
            }
        ],
        btts: [
            {
                match: "Lyon vs Monaco",
                prediction: "Both Teams to Score",
                odds: "1.75",
                time: "20:00",
                confidence: "High",
                league: "Ligue 1"
            }
        ],
        draw: [
            {
                match: "Wolfsburg vs Leverkusen",
                prediction: "Draw",
                odds: "3.40",
                time: "17:30",
                confidence: "Medium",
                league: "Bundesliga"
            }
        ],
        scores: [
            {
                match: "Brighton vs Crystal Palace",
                prediction: "2-1",
                odds: "8.50",
                time: "15:00",
                confidence: "Medium",
                league: "Premier League"
            }
        ],
        vvip: [
            {
                match: "Porto vs Benfica",
                prediction: "Home Win & Over 2.5",
                odds: "2.25",
                time: "20:30",
                confidence: "Very High",
                league: "Primeira Liga"
            }
        ],
        otherSports: {
            basketball: [
                {
                    match: "Lakers vs Warriors",
                    prediction: "Over 220.5 Points",
                    odds: "1.90",
                    time: "03:30",
                    confidence: "High",
                    league: "NBA"
                }
            ],
            tennis: [
                {
                    match: "Djokovic vs Alcaraz",
                    prediction: "Over 3.5 Sets",
                    odds: "1.85",
                    time: "14:00",
                    confidence: "High",
                    tournament: "Wimbledon"
                }
            ],
            hockey: [
                {
                    match: "Maple Leafs vs Canadiens",
                    prediction: "Over 5.5 Goals",
                    odds: "1.95",
                    time: "01:00",
                    confidence: "Medium",
                    league: "NHL"
                }
            ],
            boxing: [
                {
                    match: "Fury vs Usyk",
                    prediction: "Fury by Decision",
                    odds: "2.10",
                    time: "22:00",
                    confidence: "High",
                    event: "Heavyweight Championship"
                }
            ]
        }
    }
};

// DOM Elements
document.addEventListener('DOMContentLoaded', () => {
    // Load free predictions
    loadFreePredictions();

    // Add event listeners for category cards
    setupCategoryCards();

    // Setup search functionality
    setupSearch();

    // Setup contact form
    setupContactForm();

    // Setup current date display
    setupCurrentDate();
});

// Load free predictions
function loadFreePredictions() {
    const predictionsGrid = document.querySelector('.predictions-grid');
    if (!predictionsGrid) return;

    predictions.free.forEach(prediction => {
        const predictionCard = createPredictionCard(prediction);
        predictionsGrid.appendChild(predictionCard);
    });
}

// Create prediction card
function createPredictionCard(prediction) {
    const card = document.createElement('div');
    card.className = 'prediction-card';

    const confidenceClass = prediction.confidence.toLowerCase().replace(' ', '-');

    card.innerHTML = `
        <div class="match-info">
            <span class="league">${prediction.league || prediction.tournament || prediction.event}</span>
            <h3>${prediction.match}</h3>
            <p class="time">${prediction.time}</p>
        </div>
        <div class="prediction-info">
            <p class="prediction">${prediction.prediction}</p>
            <div class="prediction-meta">
                <span class="odds">${prediction.odds}</span>
                <span class="confidence ${confidenceClass}">${prediction.confidence}</span>
            </div>
        </div>
    `;

    // Add animation delay based on index
    const index = Array.from(card.parentElement?.children || []).length;
    card.style.animationDelay = `${index * 0.1}s`;

    return card;
}

// Setup category cards
function setupCategoryCards() {
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.classList[1];
            if (category === 'other-sports') return; // Handle separately
            showCategoryPredictions(category);
        });
    });
}

// Show category predictions
function showCategoryPredictions(category) {
    const predictionsGrid = document.querySelector('.predictions-grid');
    if (!predictionsGrid) return;

    // Clear existing predictions
    predictionsGrid.innerHTML = '';

    // Get predictions for the selected category
    const categoryPredictions = predictions.categories[category] || [];

    // Display predictions
    categoryPredictions.forEach(prediction => {
        const predictionCard = createPredictionCard(prediction);
        predictionsGrid.appendChild(predictionCard);
    });

    // Scroll to predictions section
    document.querySelector('.predictions-section').scrollIntoView({ behavior: 'smooth' });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.createElement('input');
    searchInput.type = 'search';
    searchInput.placeholder = 'Search predictions by team, league, or prediction type...';
    searchInput.className = 'search-input';
    searchInput.setAttribute('aria-label', 'Search predictions');

    const predictionsSection = document.querySelector('.predictions-section');
    if (predictionsSection) {
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.appendChild(searchInput);

        predictionsSection.insertBefore(searchContainer, predictionsSection.firstChild);

        // Add clear button
        const clearButton = document.createElement('button');
        clearButton.className = 'search-clear';
        clearButton.innerHTML = '×';
        clearButton.setAttribute('aria-label', 'Clear search');
        clearButton.style.fontSize = '1.5rem';
        clearButton.style.fontWeight = 'bold';
        searchContainer.appendChild(clearButton);

        // Search functionality with debouncing
        let searchTimeout;
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            // Show/hide clear button
            if (searchTerm.length > 0) {
                clearButton.classList.add('visible');
            } else {
                clearButton.classList.remove('visible');
            }

            // Clear previous timeout
            clearTimeout(searchTimeout);

            // Add loading state
            searchInput.classList.add('loading');

            // Debounce search
            searchTimeout = setTimeout(() => {
                searchInput.classList.remove('loading');
                filterPredictions(searchTerm);
            }, 300);
        });

        // Clear search
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            clearButton.classList.remove('visible');
            filterPredictions('');
        });

        // Handle Enter key
        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                const searchTerm = searchInput.value.toLowerCase();
                filterPredictions(searchTerm);
            }
        });
    }
}

// Filter predictions
function filterPredictions(searchTerm) {
    const predictionCards = document.querySelectorAll('.prediction-card');
    const predictionsGrid = document.querySelector('.predictions-grid');

    if (!predictionsGrid) return;

    let visibleCount = 0;

    predictionCards.forEach((card, index) => {
        const text = card.textContent.toLowerCase();
        const isVisible = text.includes(searchTerm);

        if (isVisible) {
            visibleCount++;
            card.style.display = 'block';
            card.style.animationDelay = `${index * 0.05}s`;
            card.style.animation = 'slideDown 0.3s ease-out forwards';
        } else {
            card.style.display = 'none';
        }
    });

    // Show "no results" message if needed
    let noResultsMessage = predictionsGrid.querySelector('.no-results');
    if (visibleCount === 0 && searchTerm.length > 0) {
        if (!noResultsMessage) {
            noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results';
            noResultsMessage.innerHTML = `
                <div style="text-align: center; padding: 3rem; color: #666; grid-column: 1 / -1;">
                    <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; color: #ddd;"></i>
                    <h3>No predictions found</h3>
                    <p>Try searching for a different team, league, or prediction type.</p>
                </div>
            `;
            predictionsGrid.appendChild(noResultsMessage);
        }
    } else if (noResultsMessage) {
        noResultsMessage.remove();
    }
}

// Setup contact form
function setupContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // In a real application, this would send the data to a backend
            console.log('Form submitted:', data);

            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }
}

// Setup current date display
function setupCurrentDate() {
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        const today = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        dateElement.textContent = today.toLocaleDateString('en-US', options);
    }
}

// Add smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll-based animations
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('.category-card, .prediction-card');
    elements.forEach(element => {
        const position = element.getBoundingClientRect();
        if (position.top < window.innerHeight && position.bottom >= 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
});
