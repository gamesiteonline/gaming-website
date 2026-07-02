# GAMESITEONLINE

A production-ready game distribution platform built with **Next.js 14**, **TypeScript**, and **Tailwind CSS** — featuring **Neo-Brutalism** design, bilingual support (English/Kiswahili), and integration with the [game-database](https://github.com/gamesiteonline/game-database) repository.

![GAMESITEONLINE](https://github.com/gamesiteonline/gamesiteonline/blob/main/image/1782870111467.png?raw=true)

## Features

- 🎮 **Game Database**: Browse 10,000+ games across 7 platforms (DOS, PS1, PS2, PS3/PS4, Xbox 360, PC Dreamcast, Mobile)
- 🎨 **Neo-Brutalism Design**: Bold typography, high contrast, raw UI elements
- 🌍 **Bilingual**: Full English & Kiswahili support with persistent language selection
- 🔍 **Advanced Search & Filters**: Filter by platform, genre, rating, size; search across name, description, platform
- 📱 **Responsive**: Mobile-first, works on all devices
- ⚡ **Performance**: Static generation, lazy loading, optimized images, ISR caching
- 📥 **AN1-style Download Protocol**: Game details, direct download, Telegram bot, WhatsApp channel
- 🔒 **Contact Protection**: Phone number hidden behind modal with multiple contact options

## Tech Stack

- **Framework**: Next.js 14 (App Router, React Server Components)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom Neo-Brutalism design system
- **State**: React Context + localStorage for language persistence
- **Data Fetching**: SWR-like patterns with Next.js cache revalidation
- **Deployment**: Vercel-ready (static export supported)

## Project Structure

```
gamesiteonline/
├── public/
│   └── data/                 # Cached game data (generated)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── games/        # GET /api/games - all games
│   │   │   └── games/[id]/   # GET /api/games/[id] - single game
│   │   ├── games/
│   │   │   └── [id]/         # Game detail page (SSG)
│   │   ├── globals.css       # Global styles & Neo-Brutalism design system
│   │   ├── layout.tsx        # Root layout with metadata
│   │   └── page.tsx          # Home page
│   ├── components/
│   │   ├── games/            # Game components (Card, Grid, Filters, Detail)
│   │   ├── layout/           # Layout components (Header, Footer, Modals)
│   │   ├── providers/        # Context providers (Language)
│   │   └── ui/               # Base UI components (Button, Input, Modal, Card, Badge)
│   ├── lib/
│   │   ├── game-data.ts      # Data fetching, filtering, sorting utilities
│   │   └── utils.ts          # Helper functions
│   ├── translations/
│   │   ├── en.ts             # English translations
│   │   ├── sw.ts             # Kiswahili translations
│   │   └── index.ts          # Translation utilities
│   └── types/
│       └── index.ts          # TypeScript type definitions
├── scripts/
│   └── fetch-games.ts        # Script to pre-fetch game data
├── package.json
├── tsconfig.json
├── next.config.js
├── tailwind.config.ts
└
├── postcss.config.js
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18.17+
- npm/yarn/pnpm

### Installation

```bash
# Clone the repository
cd /root/gamesiteonline

# Install dependencies
npm install

# Pre-fetch game data (optional, for offline development)
npm run fetch-games

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

### Static Export (for CDN hosting)

```bash
# Add to next.config.js:
# output: 'export'

npm run build
# Output will be in ./out/
```

## Data Source

Games are fetched from the [game-database](https://github.com/gamesiteonline/game-database) repository:

- `DOS_Games.json` — Classic DOS games
- `PS1_PSX.json` — PlayStation 1 games
- `PS2_PSP.json` — PlayStation 2 & PSP games
- `PS3_PS4_Labels.json` — PlayStation 3 & 4 games
- `XBOX_360.json` — Xbox 360 games
- `PC_Dreamcast.json` — PC & Dreamcast games
- `Mobile_APKs_IPAs.json` — Mobile games

Data is cached with **ISR (Incremental Static Regeneration)** — revalidated every hour.

## Language Support

The app supports **English** and **Kiswahili**:

- On first visit, a modal prompts language selection
- Choice is stored in `localStorage` (`gamesite-language`)
- All UI text, labels, buttons, and descriptions are dynamically translated
- Language can be switched anytime via header button

### Adding New Languages

1. Create `src/translations/{code}.ts` following the translation schema
2. Add to `src/translations/index.ts` languages array
3. Update `LanguageProvider` to include new language

## Neo-Brutalism Design System

Custom Tailwind theme in `tailwind.config.ts`:

### Colors
```css
--brutal-bg: #FAFAFA          /* Light background */
--brutal-bgDark: #1A1A1A      /* Dark background */
--brutal-fg: #1A1A1A          /* Light foreground */
--brutal-fgDark: #FAFAFA      /* Dark foreground */
--brutal-primary: #FF3B30     /* Primary red */
--brutal-secondary: #007AFF   /* Secondary blue */
--brutal-accent: #FFCC00      /* Accent yellow */
--brutal-border: #1A1A1A      /* Light borders */
--brutal-borderDark: #FAFAFA  /* Dark borders */
```

### Shadows
- `shadow-brutal` — 4px 4px 0px (light)
- `shadow-brutal-lg` — 8px 8px 0px (light)
- `shadow-brutal-dark` — 4px 4px 0px (dark)
- `shadow-brutal-lg-dark` — 8px 8px 0px (dark)

### Typography
- **Headers**: Space Grotesk (bold, tight tracking)
- **Body**: Space Grotesk
- **Code/Mono**: JetBrains Mono

### Components
All components use raw borders (3-4px), bold shadows, and high contrast. No rounded corners, no gradients, no subtle effects.

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/games` | GET | All games with platforms & genres |
| `/api/games/[id]` | GET | Single game by GameID |

Responses include cache headers: `Cache-Control: public, s-maxage=3600, stale-while-revalidate=86400`

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

```bash
docker build -t gamesiteonline .
docker run -p 3000:3000 gamesiteonline
```

### Static Hosting (Netlify, Cloudflare Pages, etc.)

Enable static export in `next.config.js`:
```js
const nextConfig = {
  output: 'export',
  // ... other config
};
```

Then `npm run build` and deploy the `out/` folder.

## Environment Variables

No required environment variables. Optional:

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Site URL for SEO | `http://localhost:3000` |

## Performance Optimizations

- **Static Generation**: Game detail pages pre-rendered at build time
- **ISR**: Game list revalidated hourly
- **Image Optimization**: Next.js Image with remote patterns, lazy loading
- **Font Optimization**: `next/font` with `display: swap`
- **Code Splitting**: Automatic per-route
- **Bundle Analysis**: `npm run build && npx @next/bundle-analyzer`

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Focus management in modals
- Keyboard navigation support
- Color contrast ratios (WCAG AA)
- Reduced motion support

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `npm run lint` and `npm run build`
5. Submit a PR

## License

MIT License — see LICENSE file for details.

## Credits

- **Owner**: Fahad Mohamed from Tanzania 🇹🇿
- **Game Data**: [game-database](https://github.com/gamesiteonline/game-database)
- **Cover Art**: Various sources (Unsplash, libretro, manuscdn)
- **Emulator Compatibility Info**: Community-sourced

## Contact

- **WhatsApp Channel**: https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q
- **Telegram**: https://t.me/faliz_AI
- **Email**: gamesiteonlinetz@gmail.com
- **Phone**: +255 796 339 436 (SMS)

---

**GAMESITEONLINE** — *Digital Archive of Dreams* 🇹🇿