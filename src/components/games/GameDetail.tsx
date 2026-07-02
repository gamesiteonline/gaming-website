'use client';

import { Game } from '@/types';
import { Button, Badge, Card, CardContent, RatingBadge, PlatformBadge, GenreBadge } from '@/components/ui';
import { getTranslation, type Language } from '@/translations';
import { parseSizeToMB } from '@/lib/game-data';

interface GameDetailProps {
  game: Game;
  currentLanguage: Language;
  onBack: () => void;
  onDownload: (game: Game) => void;
}

export function GameDetail({ game, currentLanguage, onBack, onDownload }: GameDetailProps) {
  const t = getTranslation(currentLanguage);
  const sizeMB = parseSizeToMB(game.Size);
  const genres = game.Genre.split(',').map(g => g.trim());

  return (
    <div className="min-h-screen pb-16 animate-in">
      <div className="brutal-container">
        {/* Back Button */}
        <Button variant="ghost" onClick={onBack} className="mb-6">
          ← {t.backToGames}
        </Button>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Cover & Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cover Art */}
            <Card className="overflow-hidden">
              <div className="aspect-[3/4] relative bg-brutal-muted dark:bg-brutal-mutedDark">
                <img
                  src={game.CoverArtLink}
                  alt={`${game.FileName} cover art`}
                  className="w-full h-full object-cover"
                  loading="eager"
                />
              </div>
            </Card>

            {/* Game Title & Meta */}
            <div className="space-y-4">
              <h1 className="brutal-heading-1">{game.FileName}</h1>
              
              <div className="flex flex-wrap items-center gap-3">
                <PlatformBadge platform={game.Platform} size="lg" />
                <RatingBadge rating={game.Rating} />
                <Badge variant="accent" size="lg" className="font-mono">
                  {game.Size}
                </Badge>
                <Badge variant="outline" size="lg" className="font-mono">
                  {game.Extension}
                </Badge>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardContent>
                <h2 className="brutal-heading-3 mb-4">{t.description}</h2>
                <p className="brutal-text text-brutal-fg/80 dark:text-brutal-fgDark/80 whitespace-pre-wrap">
                  {game.Description}
                </p>
              </CardContent>
            </Card>

            {/* Compatibility */}
            <Card>
              <CardContent>
                <h2 className="brutal-heading-3 mb-4">{t.compatibility}</h2>
                <p className="brutal-text text-brutal-fg/80 dark:text-brutal-fgDark/80 whitespace-pre-wrap">
                  {game.Compatibility}
                </p>
              </CardContent>
            </Card>

            {/* Genres */}
            <Card>
              <CardContent>
                <h2 className="brutal-heading-3 mb-4">{t.genre}</h2>
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <GenreBadge key={genre} genre={genre} size="md" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Download Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 space-y-6">
              <CardContent className="space-y-6">
                {/* Download Button */}
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full brutal-btn-lg"
                  onClick={() => onDownload(game)}
                >
                  {t.downloadNow}
                </Button>

                {/* Download Protocol Notice */}
                <div className="brutal-card-dark border-brutal-border-dark border-brutal p-4 space-y-3">
                  <h3 className="brutal-heading-4 text-brutal-accent">{t.downloadProtocol}</h3>
                  
                  <div className="brutal-badge-primary">
                    {t.telegramNotice}
                  </div>

                  <a
                    href="https://t.me/gamesiteonlinetz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block brutal-btn-secondary text-center"
                  >
                    Open Telegram Bot
                  </a>

                  <div className="brutal-divider" />

                  <p className="brutal-text-sm text-center">
                    {t.whatsappInvite}
                  </p>
                  <a
                    href="https://whatsapp.com/channel/0029VbChyDUI1rcht5jajL3q"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block brutal-btn-outline text-center"
                  >
                    Join WhatsApp Channel
                  </a>
                </div>

                {/* Direct Download Link */}
                <div className="pt-4 border-t border-brutal-border dark:border-brutal-border-dark">
                  <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-2">
                    Direct Download:
                  </p>
                  <a
                    href={game.DownloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brutal-mono text-sm text-brutal-primary hover:text-brutal-primary/80 break-all block p-3 brutal-card-dark border-brutal-border-dark border-brutal"
                  >
                    {game.DownloadLink}
                  </a>
                </div>

                {/* Game ID */}
                <div className="pt-4 border-t border-brutal-border dark:border-brutal-border-dark">
                  <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-1">
                    Game ID:
                  </p>
                  <code className="brutal-mono text-brutal-fg/80 dark:text-brutal-fgDark/80">
                    {game.GameID}
                  </code>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}