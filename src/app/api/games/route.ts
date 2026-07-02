import { NextResponse } from 'next/server';
import { fetchGamesFromGitHub, getUniquePlatforms, getUniqueGenres } from '@/lib/game-data';

export const dynamic = 'force-static';
export const revalidate = 3600;

export async function GET() {
  try {
    const games = await fetchGamesFromGitHub();
    const platforms = getUniquePlatforms(games);
    const genres = getUniqueGenres(games);

    return NextResponse.json({
      games,
      platforms,
      genres,
      total: games.length,
      timestamp: new Date().toISOString(),
    }, {
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch games' },
      { status: 500 }
    );
  }
}