"use client"

import { useState } from "react"
import { Star } from "lucide-react"

// Rating component
export const Rating = ({ rating, onChange }: { rating: number, onChange?: (value: number) => void }) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div 
      className="flex items-center gap-1 px-2 py-1.5 rounded-md transition-colors"
      onClick={(e) => e.stopPropagation()} // Prevent opening the modal when clicking on the container
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={`
            ${star <= (hoverRating || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}
            ${onChange ? "cursor-pointer transition-colors duration-150" : ""}
          `}
          onMouseEnter={() => onChange && setHoverRating(star)}
          onMouseLeave={() => onChange && setHoverRating(0)}
          onClick={(e) => {
            if (onChange) {
              e.stopPropagation();
              onChange(star);
            }
          }}
        />
      ))}
    </div>
  );
}