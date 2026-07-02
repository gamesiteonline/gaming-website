'use client';

import { Game } from '@/types';
import { Card, CardContent, CardImage } from '@/components/ui/Card';
import { Button, Badge, RatingBadge, PlatformBadge, GenreBadge } from '@/components/ui';
import { getTranslation, type Language } from '@/translations';
import { parseSizeToMB } from '@/lib/game-data';

interface GameCardProps {
  game: Game;
  currentLanguage: Language;
  onClick: (game: Game) => void;
}

export function GameCard({ game, currentLanguage, onClick }: GameCardProps) {
  const t = getTranslation(currentLanguage);
  const sizeMB = parseSizeToMB(game.Size);
  const primaryGenre = game.Genre.split(',')[0].trim();

  return (
    <Card
      hover
      onClick={() => onClick(game)}
      className="flex flex-col h-full animate-in"
    >
      {/* Cover Art */}
      <CardImage
        src={game.CoverArtLink}
        alt={`${game.FileName} cover art`}
        className="aspect-[4/3]"
      />

      <CardContent className="flex flex-col flex-1 p-4">
        {/* Game Title */}
        <h3 className="brutal-heading-4 mb-2 line-clamp-2 min-h-[3rem]">
          {game.FileName}
        </h3>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <PlatformBadge platform={game.Platform} />
          <GenreBadge genre={primaryGenre} />
          <RatingBadge rating={game.Rating} />
        </div>

        {/* Size */}
        <p className="brutal-text-sm text-brutal-fg/60 dark:text-brutal-fgDark/60 mb-4">
          <span className="font-mono">{game.Size}</span>
          {sizeMB > 0 && ` • ${sizeMB >= 1024 ? (sizeMB / 1024).toFixed(1) + ' GB' : sizeMB.toFixed(0) + ' MB'}`}
        </p>

        {/* Description Preview */}
        <p className="brutal-text-sm text-brutal-fg/70 dark:text-brutal-fgDark/70 flex-1 line-clamp-3 mb-4">
          {game.Description}
        </p>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2 border-t border-brutal-border dark:border-brutal-border-dark">
          <Button
            variant="primary"
            size="sm"
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); onClick(game); }}
          >
            {t.viewDetails}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(e) => { e.stopPropagation(); window.open(game.DownloadLink, '_blank'); }}
          >
            {t.download}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}