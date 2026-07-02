import fs from 'fs';
import path from 'path';
import { fetchGamesFromGitHub, getUniquePlatforms, getUniqueGenres } from '../src/lib/game-data';

async function main() {
  console.log('Fetching games from GitHub...');
  
  try {
    const games = await fetchGamesFromGitHub();
    console.log(`Fetched ${games.length} games`);
    
    const platforms = getUniquePlatforms(games);
    console.log(`Found ${platforms.length} platforms:`);
    platforms.forEach(p => console.log(`  - ${p.name}: ${p.count} games`));
    
    const genres = getUniqueGenres(games);
    console.log(`Found ${genres.length} genres (top 20):`);
    genres.slice(0, 20).forEach(g => console.log(`  - ${g.name}: ${g.count} games`));
    
    // Save to public/data for static access
    const outputDir = path.join(process.cwd(), 'public', 'data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(outputDir, 'games.json'),
      JSON.stringify(games, null, 2)
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'platforms.json'),
      JSON.stringify(platforms, null, 2)
    );
    
    fs.writeFileSync(
      path.join(outputDir, 'genres.json'),
      JSON.stringify(genres, null, 2)
    );
    
    console.log('\nData saved to public/data/');
    console.log('Done!');
  } catch (error) {
    console.error('Error fetching games:', error);
    process.exit(1);
  }
}

main();