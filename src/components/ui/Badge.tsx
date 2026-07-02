'use client';

import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  dot?: boolean;
  dotColor?: string;
}

export function Badge({
  className,
  variant = 'default',
  size = 'md',
  dot,
  dotColor,
  children,
  ...props
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 font-brutal font-semibold border-brutal-border dark:border-brutal-border-dark border-brutal shadow-brutal-sm';

  const variantClasses = {
    default: 'bg-brutal-muted dark:bg-brutal-mutedDark text-brutal-fg dark:text-brutal-fgDark',
    primary: 'bg-brutal-primary text-white',
    secondary: 'bg-brutal-secondary text-white',
    accent: 'bg-brutal-accent text-brutal-fg',
    outline: 'bg-transparent',
  };

  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-xs',
    lg: 'px-4 py-1.5 text-sm',
  };

  return (
    <span
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {dot && (
        <span
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: dotColor || 'currentColor' }}
        />
      )}
      {children}
    </span>
  );
}

export function RatingBadge({ rating, className }: { rating: string; className?: string }) {
  const numericRating = parseFloat(rating.match(/^([\d.]+)/)?.[1] || '0');
  
  let variant: 'default' | 'primary' | 'secondary' | 'accent' = 'default';
  if (numericRating >= 9) variant = 'primary';
  else if (numericRating >= 8) variant = 'secondary';
  else if (numericRating >= 7) variant = 'accent';

  return (
    <Badge variant={variant} className={className} dot dotColor="currentColor">
      {rating}
    </Badge>
  );
}

export function PlatformBadge({ platform, className }: { platform: string; className?: string }) {
  return (
    <Badge variant="outline" size="sm" className={className}>
      {platform}
    </Badge>
  );
}

export function GenreBadge({ genre, className }: { genre: string; className?: string }) {
  return (
    <Badge variant="default" size="sm" className={className}>
      {genre}
    </Badge>
  );
}