"use client";

import { Star } from "lucide-react";
import { useFavorites, type FavoriteItem } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type FavoriteButtonProps = {
  item: FavoriteItem;
  className?: string;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
};

export function FavoriteButton({ 
  item, 
  className, 
  showLabel = false,
  size = "md" 
}: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  const favorited = isLoaded && isFavorite(item.id);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(item);
  };

  const sizeClasses = {
    sm: "h-7 w-7",
    md: "h-8 w-8",
    lg: "h-9 w-9"
  };

  const iconSizes = {
    sm: "h-3.5 w-3.5",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  if (!isLoaded) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className={cn(sizeClasses[size], "opacity-50 cursor-not-allowed", className)}
        disabled
      >
        <Star className={iconSizes[size]} />
      </Button>
    );
  }

  return (
    <Button
      variant="ghost"
      size={showLabel ? "sm" : "icon"}
      onClick={handleClick}
      className={cn(
        !showLabel && sizeClasses[size],
        "transition-all duration-200 relative z-20 cursor-pointer",
        className
      )}
      title={favorited ? "Remove from favorites" : "Add to favorites"}
      aria-label={favorited ? "Remove from favorites" : "Add to favorites"}
    >
      <Star 
        className={cn(
          iconSizes[size],
          favorited && "fill-current",
          "transition-all duration-200"
        )} 
      />
      {showLabel && (
        <span className="ml-1.5">
          {favorited ? "Favorited" : "Favorite"}
        </span>
      )}
    </Button>
  );
}
