'use client';

import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className, hover = true, onClick }: CardProps) {
  return (
    <article
      className={cn(
        'brutal-card dark:brutal-card-dark overflow-hidden',
        hover && 'cursor-pointer transition-all duration-200 hover:shadow-brutal-lg hover:-translate-x-1 hover:-translate-y-1',
        !hover && 'shadow-brutal',
        onClick && 'cursor-pointer',
        className
      )}
      onClick={onClick}
      role={onClick ? 'button' : 'article'}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }} : undefined}
    >
      {children}
    </article>
  );
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <header className={cn('p-4 border-b border-brutal-border dark:border-brutal-border-dark', className)}>{children}</header>;
}

export function CardContent({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('p-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <footer className={cn('p-4 border-t border-brutal-border dark:border-brutal-border-dark bg-brutal-muted/30 dark:bg-brutal-mutedDark/30', className)}>{children}</footer>;
}

export function CardImage({ src, alt, className, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { className?: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden bg-brutal-muted dark:bg-brutal-mutedDark">
      <img
        src={src}
        alt={alt}
        className={cn('w-full h-full object-cover transition-transform duration-300 hover:scale-105', className)}
        loading="lazy"
        {...props}
      />
    </div>
  );
}