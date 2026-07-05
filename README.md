# GameSiteOnline - Skeuomorphic PC Games Database

A beautifully designed skeuomorphic website for browsing and downloading PC games from the Internet Archive.

## Overview

GameSiteOnline features a rich skeuomorphic design with realistic textures that mimic real-world materials like wood, leather, and paper. The website provides access to a curated collection of top-rated PC games with direct download links from the Internet Archive.

All game data is stored locally in the repository as JSON, making it easy to clone and run the site anywhere without external dependencies.

## Features

- **Authentic Skeuomorphic Design**: Realistic textures and depth effects
- **10 Game Categories**: Action, Adventure, RPG, Strategy, Simulation, Sports, Fighting, Puzzle, Racing, Platformer
- **Top-Rated Games**: Curated selection of highly-rated PC games
- **Internet Archive Integration**: Direct download links to legally available games
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Search & Filter**: Find games by genre, rating, name, and more
- **Detailed Game Information**: Release year, developer, publisher, file size
- **Legal & Safe**: Only links to games legally available through Internet Archive
- **Complete Legal Pages**: Privacy Policy, Terms of Service, and Contact information

## Data Source

The game data is stored locally in `/data/games.json` as a JSON array. Each game object contains:

- `id`: Unique identifier (category prefix + number)
- `name`: Game title
- `category`: Game genre
- `rating`: Aggregate rating (0-10 scale) from Metacritic, IGN, and Steam
- `year`: Release year
- `developer`: Game developer
- `publisher`: Game publisher
- `fileSize`: Download size (e.g., "4.2 GB")
- `downloadLink`: Direct download link from Internet Archive

You can easily extend the dataset by adding more objects to the JSON array following the same format.

## Pages

- `index.html` - Homepage with featured games and search
- `pages/browse.html` - Complete game browser with filtering and sorting
- `pages/about.html` - Information about GameSiteOnline
- `pages/privacy.html` - Privacy policy
- `pages/terms.html` - Terms of service
- `pages/contact.html` - Contact form and information

## Technical Implementation

### Frontend Technologies

- HTML5
- CSS3 (with CSS variables, flexbox, grid)
- JavaScript (ES6+)
- Font Awesome 6 for icons

### Design Features

- CSS Variables for easy theming
- Responsive layout with CSS Grid and Flexbox
- Skeuomorphic effects using background images and CSS gradients
- Interactive elements with hover/active states
- Flip-card effect for game displays
- Loading animations and transitions
- Form validation and feedback

### JavaScript Functionality

- Game data loaded from `/data/games.json` via fetch API
- Game filtering by category and sorting
- Search functionality
- Contact form handling with validation
- Animation effects (ripple, fade-in, etc.)

## File Structure

```
/gamesiteonline
├── index.html
├── /css
│   └── style.css
├── /js
│   ├── main.js
│   ├── browse.js
│   └── contact.js
├── /data
│   └── games.json          ← Game database (JSON)
├── /images
│   ├── (placeholder images)
│   ├── wood-texture.jpg
│   ├── leather-texture.jpg
│   └── paper-texture.jpg
└── /pages
    ├── browse.html
    ├── about.html
    ├── privacy.html
    ├── terms.html
    └── contact.html
```

## How to Use

1. Clone or download the repository
2. Open `index.html` in your web browser
3. Browse games by category or use the search function
4. Click on any game to see more details and download links
5. Use the filter options to narrow down your search
6. Visit the About, Privacy, Terms, and Contact pages via the footer or header navigation

## Customization

### Changing Colors
Edit the CSS variables in `css/style.css`:
```css
:root {
    --primary-color: #8B4513; /* SaddleBrown */
    --secondary-color: #D2B48C; /* Tan */
    --accent-color: #CD853F; /* Peru */
    /* ... */
}
```

### Updating Textures
Replace the texture images in the `/images` folder:
- `wood-texture.jpg` - Used for headers and footers
- `leather-texture.jpg` - Used for hero sections and CTAs
- `paper-texture.jpg` - Used for content backgrounds

### Adding More Games
Edit `/data/games.json` to add more game objects following the same format:
```json
{
    "id": "CATEGORY_ID",
    "name": "Game Name",
    "category": "Category Name",
    "rating": 9.5,
    "year": 2020,
    "developer": "Developer Name",
    "publisher": "Publisher Name",
    "fileSize": "X GB",
    "downloadLink": "https://archive.org/details/game_identifier"
}
```

## Credits

- **Developed by**: Fahad Mohamed
- **Design Inspiration**: Skeuomorphic design principles
- **Game Data**: Based on ratings from Metacritic, IGN, and Steam (stored locally)
- **Download Links**: Internet Archive Software Library
- **Icons**: Font Awesome 6

## License

This project is for educational and demonstration purposes. The actual game data and download links point to the Internet Archive, which has its own terms of use for the hosted content.

## Disclaimer

GameSiteOnline provides links to games hosted on the Internet Archive. We do not host any game files ourselves. All games linked are believed to be legally available for download through the Internet Archive's software library. Users should verify the legality of downloads in their jurisdiction before proceeding.