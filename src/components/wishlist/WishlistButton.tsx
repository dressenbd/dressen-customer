"use client";

import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/hooks/useWishlist';
import { cn } from '@/lib/utils';

interface WishlistButtonProps {
  productId: string;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  variant?: 'default' | 'outline' | 'ghost';
}

export default function WishlistButton({ 
  productId, 
  className, 
  size = 'default',
  variant = 'outline' 
}: WishlistButtonProps) {
  const { toggleWishlist, isInWishlist, isLoading } = useWishlist();
  const inWishlist = isInWishlist(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(productId);
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleClick}
      disabled={isLoading}
      className={cn(
        'transition-all duration-200',
        inWishlist && 'text-red-500 border-red-300 bg-red-50',
        className
      )}
    >
      <Heart 
        className={cn(
          'w-4 h-4',
          size === 'sm' && 'w-3 h-3',
          size === 'lg' && 'w-5 h-5',
          inWishlist && 'fill-current'
        )} 
      />
      {size !== 'sm' && size !== 'icon' && (
        <span className="ml-2">
          {isLoading ? 'Loading...' : inWishlist ? 'Saved' : 'Save'}
        </span>
      )}
    </Button>
  );
}