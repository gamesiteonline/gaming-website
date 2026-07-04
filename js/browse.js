// GameSiteOnline - Browse Games JavaScript
// Developed by Fahad Mohamed

document.addEventListener('DOMContentLoaded', function() {
    // Sample game data - in a real implementation, this would come from the database
    const sampleGames = [
        {
            id: "ACT_001",
            name: "Half-Life 2",
            category: "Action",
            rating: 9.6,
            year: 2004,
            developer: "Valve",
            publisher: "Valve",
            fileSize: "4.2 GB",
            downloadLink: "https://archive.org/details/halflife2"
        },
        {
            id: "ACT_002",
            name: "DOOM (2016)",
            category: "Action",
            rating: 9.4,
            year: 2016,
            developer: "id Software",
            publisher: "Bethesda Softworks",
            fileSize: "55 GB",
            downloadLink: "https://archive.org/details/doom2016"
        },
        {
            id: "ACT_003",
            name: "Portal 2",
            category: "Action",
            rating: 9.5,
            year: 2011,
            developer: "Valve",
            publisher: "Valve",
            fileSize: "3.8 GB",
            downloadLink: "https://archive.org/details/portal2"
        },
        {
            id: "RPG_001",
            name: "The Elder Scrolls V: Skyrim",
            category: "RPG",
            rating: 9.4,
            year: 2011,
            developer: "Bethesda Game Studios",
            publisher: "Bethesda Softworks",
            fileSize: "6.8 GB",
            downloadLink: "https://archive.org/details/elderscrollsvskyrim"
        },
        {
            id: "RPG_002",
            name: "The Witcher 3: Wild Hunt",
            category: "RPG",
            rating: 9.5,
            year: 2015,
            developer: "CD Projekt Red",
            publisher: "CD Projekt",
            fileSize: "35 GB",
            downloadLink: "https://archive.org/details/witcher3wildhunt"
        },
        {
            id: "STR_001",
            name: "Civilization VI",
            category: "Strategy",
            rating: 9.1,
            year: 2016,
            developer: "Firaxis Games",
            publisher: "2K Games",
            fileSize: "8.5 GB",
            downloadLink: "https://archive.org/details/civilizationvi"
        },
        {
            id: "STR_002",
            name: "StarCraft II",
            category: "Strategy",
            rating: 9.3,
            year: 2010,
            developer: "Blizzard Entertainment",
            publisher: "Blizzard Entertainment",
            fileSize: "30 GB",
            downloadLink: "https://archive.org/details/starcraft2"
        },
        {
            id: "SIM_001",
            name: "The Sims 4",
            category: "Simulation",
            rating: 8.7,
            year: 2014,
            developer: "Maxis",
            publisher: "Electronic Arts",
            fileSize: "10 GB",
            downloadLink: "https://archive.org/details/thesims4"
        },
        {
            id: "SIM_002",
            name: "Cities: Skylines",
            category: "Simulation",
            rating: 9.2,
            year: 2015,
            developer: "Colossal Order",
            publisher: "Paradox Interactive",
            fileSize: "4 GB",
            downloadLink: "https://archive.org/details/citiesskylines"
        },
        {
            id: "RAC_001",
            name: "Forza Horizon 4",
            category: "Racing",
            rating: 9.3,
            year: 2018,
            developer: "Playground Games",
            publisher: "Xbox Game Studios",
            fileSize: "65 GB",
            downloadLink: "https://archive.org/details/forzahorizon4"
        },
        {
            id: "RAC_002",
            name: "Rocket League",
            category: "Racing",
            rating: 8.9,
            year: 2015,
            developer: "Psyonix",
            publisher: "Psyonix",
            fileSize: "15 GB",
            downloadLink: "https://archive.org/details/rocketleague"
        }
    ];

    // DOM Elements
    const gamesContainer = document.getElementById('gamesContainer');
    const gamesCount = document.getElementById('gamesCount');
    const genreFilter = document.getElementById('genreFilter');
    const sortBy = document.getElementById('sortBy');
    const searchGames = document.getElementById('searchGames');
    const searchBtn = document.getElementById('searchBtn');

    // Initialize the page
    function init() {
        displayGames(sampleGames);
        updateCount(sampleGames.length);

        // Add event listeners
        genreFilter.addEventListener('change', filterGames);
        sortBy.addEventListener('change', filterGames);
        searchBtn.addEventListener('click', searchGamesFunc);
        searchGames.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                searchGamesFunc();
            }
        });
    }

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
                    <img src="../images/game-placeholder.jpg" alt="${game.name}">
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

        let filteredGames = [...sampleGames];

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

        const filteredGames = sampleGames.filter(game =>
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

    // Initialize the page
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