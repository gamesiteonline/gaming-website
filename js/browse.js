// GameSiteOnline - Browse Games JavaScript
// Developed by Fahad Mohamed

document.addEventListener('DOMContentLoaded', function() {
    // Sample game data - in a real implementation, this would come from the database
    let allGames = [];

    // DOM Elements
    const gamesContainer = document.getElementById('gamesContainer');
    const gamesCount = document.getElementById('gamesCount');
    const genreFilter = document.getElementById('genreFilter');
    const sortBy = document.getElementById('sortBy');
    const searchGames = document.getElementById('searchGames');
    const searchBtn = document.getElementById('searchBtn');

    // Display games in the grid
    function displayGames(games) {
        // Clear the container
        gamesContainer.innerHTML = '';

        // Check if we have games to display
        if (games.length === 0) {
            gamesContainer.innerHTML = '<p class="no-results">No games found matching your criteria.</p>';
            updateCount(0);
            return;
        }

        // Create game cards
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.className = 'game-card';

            // Format file size for display
            const fileSize = game.fileSize;

            gameCard.innerHTML = `
                <div class="game-card-front">
                    <img src="/images/game-placeholder.jpg" alt="${game.name}">
                    <div class="game-overlay">
                        <h3>${game.name}</h3>
                        <div class="game-rating">
                            <span class="rating-value">${game.rating}</span>
                            <span class="rating-label">/10</span>
                        </div>
                    </div>
                </div>
                <div class="game-card-back">
                    <h3>${game.name}</h3>
                    <p><strong>Genre:</strong> ${game.category}</p>
                    <p><strong>Year:</strong> ${game.year}</p>
                    <p><strong>Developer:</strong> ${game.developer}</p>
                    <p><strong>Publisher:</strong> ${game.publisher}</p>
                    <p><strong>File Size:</strong> ${fileSize}</p>
                    <a href="${game.downloadLink}" class="download-btn" target="_blank">
                        <i class="fas fa-download"></i> Download
                    </a>
                </div>
            `;

            gamesContainer.appendChild(gameCard);
        });
    }

    // Update the games count
    function updateCount(count) {
        if (gamesCount) {
            gamesCount.textContent = count;
        }
    }

    // Filter games based on selected criteria
    function filterGames() {
        const selectedGenre = genreFilter.value;
        const selectedSort = sortBy.value;

        let filteredGames = [...allGames];

        // Filter by genre
        if (selectedGenre !== 'all') {
            filteredGames = filteredGames.filter(game =>
                game.category.toLowerCase() === selectedGenre
            );
        }

        // Sort games
        switch (selectedSort) {
            case 'rating-high':
                filteredGames.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating-low':
                filteredGames.sort((a, b) => a.rating - b.rating);
                break;
            case 'name-az':
                filteredGames.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-za':
                filteredGames.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case 'year-new':
                filteredGames.sort((a, b) => b.year - a.year);
                break;
            case 'year-old':
                filteredGames.sort((a, b) => a.year - b.year);
                break;
            default:
                // Default sort by rating high to low
                filteredGames.sort((a, b) => b.rating - a.rating);
        }

        displayGames(filteredGames);
        updateCount(filteredGames.length);
    }

    // Search games by name
    function searchGamesFunc() {
        const searchTerm = searchGames.value.trim().toLowerCase();

        if (searchTerm === '') {
            filterGames(); // Just apply current filters
            return;
        }

        const filteredGames = allGames.filter(game =>
            game.name.toLowerCase().includes(searchTerm)
        );

        // Apply additional filters if any
        const selectedGenre = genreFilter.value;
        if (selectedGenre !== 'all') {
            const genreFiltered = filteredGames.filter(game =>
                game.category.toLowerCase() === selectedGenre
            );
            displayGames(genreFiltered);
            updateCount(genreFiltered.length);
        } else {
            displayGames(filteredGames);
            updateCount(filteredGames.length);
        }
    }

    // Load games from JSON file
    function loadGames() {
        // Show loading message
        if (gamesContainer) {
            gamesContainer.innerHTML = '<div class="loading-message"><p>Loading games...</p></div>';
        }

        fetch('/data/games.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                allGames = data;
                // Initialize with all games
                filterGames();
            })
            .catch(error => {
                console.error('Error loading games:', error);
                if (gamesContainer) {
                    gamesContainer.innerHTML = '<p class="error">Failed to load games. Please try again later.</p>';
                    updateCount(0);
                }
            });
    }

    // Initialize the page
    function init() {
        // Add event listeners
        genreFilter.addEventListener('change', filterGames);
        sortBy.addEventListener('change', filterGames);
        searchBtn.addEventListener('click', searchGamesFunc);
        searchGames.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGamesFunc();
            }
        });

        // Load data
        loadGames();
    }

    // Start
    init();

    // Add ripple effect to buttons (same as in main.js)
    const buttons = document.querySelectorAll('.btn-primary, .category-btn, .download-btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = e.clientX - rect.left - size/2 + 'px';
            ripple.style.top = e.clientY - rect.top - size/2 + 'px';

            ripple.addEventListener('animationend', function() {
                ripple.remove();
            });
        });
    });
});