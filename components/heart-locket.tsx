"use client";

import { useState, useMemo } from "react";

interface PhotoAlbumProps {
  name: string | null;
  images: string[];
}

/* Pre-defined positions and rotations for up to 8 polaroids scattered naturally */
const POLAROID_LAYOUTS = [
  { x: 15, y: 8, rotate: -12 },
  { x: 45, y: 2, rotate: 6 },
  { x: 28, y: 35, rotate: -4 },
  { x: 55, y: 30, rotate: 10 },
  { x: 5, y: 55, rotate: -8 },
  { x: 40, y: 58, rotate: 14 },
  { x: 20, y: 75, rotate: -6 },
  { x: 50, y: 72, rotate: 3 },
];

export function PhotoAlbum({ name, images }: PhotoAlbumProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const polaroids = useMemo(() => {
    return POLAROID_LAYOUTS.slice(0, Math.max(images.length, 8));
  }, [images.length]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden p-8">
      {/* Polaroid scatter area */}
      <div className="relative w-full max-w-[550px] aspect-square">
        {polaroids.map((layout, i) => {
          const hasImage = i < images.length;
          const isHovered = hoveredIndex === i;

          return (
            <div
              key={i}
              className="absolute transition-all duration-500 ease-out"
              style={{
                left: `${layout.x}%`,
                top: `${layout.y}%`,
                width: "42%",
                transform: `rotate(${layout.rotate}deg) ${isHovered ? "scale(1.08) translateY(-8px)" : "scale(1)"}`,
                zIndex: isHovered ? 20 : i,
                animation: `polaroidIn 0.6s ease-out ${i * 0.1}s both`,
              }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Polaroid frame */}
              <div
                className="bg-white rounded-sm overflow-hidden"
                style={{
                  padding: "6% 6% 18% 6%",
                  boxShadow: isHovered
                    ? "0 12px 40px rgba(0,0,0,0.18), 0 4px 12px rgba(0,0,0,0.1)"
                    : "0 4px 16px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.3s ease",
                }}
              >
                {/* Photo area */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "1 / 1" }}
                >
                  {hasImage ? (
                    <img
                      src={images[i]}
                      alt={`Photo ${i + 1}`}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-[#e0ddd8]" />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message below album */}
      {name && (
        <div
          className="mt-6 text-center transition-all duration-700"
          style={{
            animation: "polaroidIn 0.6s ease-out 0.9s both",
          }}
        >
          <p className="font-serif text-lg italic text-muted-foreground">
            {"For "}
            <span className="text-foreground">{name}</span>
            {", with love."}
          </p>
        </div>
      )}
    </div>
  );
}
