"use client";

import { useState } from "react";

interface HeartLocketProps {
  name: string | null;
  image: string | null;
}

/* Heart path for the full outer shape */
const HEART_FULL =
  "M150,280 C150,280,30,200,30,125 C30,85,58,60,95,60 C118,60,136,75,150,97 C164,75,182,60,205,60 C242,60,270,85,270,125 C270,200,150,280,150,280Z";

/* Right half of the heart (stationary, reveals photo) */
const HEART_RIGHT =
  "M150,280 L150,97 C164,75,182,60,205,60 C242,60,270,85,270,125 C270,200,150,280,150,280Z";

/* Left half of the heart (the cover/door that opens) */
const HEART_LEFT =
  "M150,280 L150,97 C136,75,118,60,95,60 C58,60,30,85,30,125 C30,200,150,280,150,280Z";

/* Inner right recess for photo area */
const HEART_INNER_RIGHT =
  "M150,265 L150,107 C165,87,180,76,198,76 C228,76,252,96,252,130 C252,195,150,265,150,265Z";

/* Inner left recess (visible when open) */
const HEART_INNER_LEFT =
  "M150,265 L150,107 C135,87,120,76,102,76 C72,76,48,96,48,130 C48,195,150,265,150,265Z";

export function HeartLocket({ name, image }: HeartLocketProps) {
  const [isOpen, setIsOpen] = useState(false);

  /* Chain links: 20 links */
  const LINK_COUNT = 20;
  const chainLinks = Array.from({ length: LINK_COUNT }, (_, i) => {
    return -260 + i * 12 + 7;
  });

  return (
    <div className="absolute inset-0 flex flex-col items-center overflow-hidden">
      {/* Wrapper that swings the whole pendant */}
      <div
        className="animate-swing w-[220px] lg:w-[260px]"
        style={{ transformOrigin: "top center" }}
      >
        {/* ====== CHAIN + BAIL (pure SVG, no 3D needed) ====== */}
        <svg
          viewBox="0 -260 300 310"
          width="100%"
          style={{ overflow: "visible", display: "block" }}
        >
          <defs>
            <linearGradient id="goldChain" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#c99a2e" />
              <stop offset="40%" stopColor="#f5e27a" />
              <stop offset="60%" stopColor="#dbb547" />
              <stop offset="100%" stopColor="#a67c00" />
            </linearGradient>
          </defs>

          {/* Chain links */}
          {chainLinks.map((cy, i) => (
            <ellipse
              key={i}
              cx="150"
              cy={cy}
              rx="6"
              ry="5.5"
              fill="none"
              stroke="url(#goldChain)"
              strokeWidth={2.8}
            />
          ))}

          {/* Bail */}
          <path
            d="M150,-18 C138,-18,132,-6,132,10 C132,26,138,40,150,40 C162,40,168,26,168,10 C168,-6,162,-18,150,-18Z"
            fill="none"
            stroke="url(#goldChain)"
            strokeWidth={4}
          />
          <path
            d="M150,-12 C142,-12,138,-2,138,10 C138,22,142,34,150,34 C158,34,162,22,162,10 C162,-2,158,-12,150,-12Z"
            fill="none"
            stroke="#dbb547"
            strokeWidth={0.5}
            opacity={0.3}
          />
        </svg>

        {/* ====== HEART LOCKET (HTML div for 3D transforms) ====== */}
        <div
          className="-mt-[20px] relative mx-auto w-full cursor-pointer"
          style={{ perspective: "800px" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* Right half - stationary, reveals photo when cover opens */}
          <div className="absolute inset-0" style={{ zIndex: 1 }}>
            <svg
              viewBox="0 0 300 300"
              width="100%"
              style={{ overflow: "visible", display: "block" }}
            >
              <defs>
                <linearGradient id="goldInner" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8c84a" />
                  <stop offset="50%" stopColor="#dbb547" />
                  <stop offset="100%" stopColor="#c99a2e" />
                </linearGradient>
                <linearGradient id="recessGold" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#c9a24d" />
                  <stop offset="100%" stopColor="#b08930" />
                </linearGradient>
                <clipPath id="innerRightClip">
                  <path d={HEART_INNER_RIGHT} />
                </clipPath>
                <clipPath id="innerLeftClip">
                  <path d={HEART_INNER_LEFT} />
                </clipPath>
              </defs>

              {/* Right half shell */}
              <path
                d={HEART_RIGHT}
                fill="url(#goldInner)"
                stroke="#a07010"
                strokeWidth={1}
              />
              {/* Right inner recess */}
              <path
                d={HEART_INNER_RIGHT}
                fill="url(#recessGold)"
                stroke="#a07010"
                strokeWidth={0.8}
              />

              {/* Photo in right recess */}
              {image && (
                <image
                  href={image}
                  x="140"
                  y="68"
                  width="120"
                  height="210"
                  clipPath="url(#innerRightClip)"
                  preserveAspectRatio="xMidYMid slice"
                />
              )}
              {!image && (
                <text
                  x="210"
                  y="170"
                  textAnchor="middle"
                  fontFamily="serif"
                  fontSize="11"
                  fontStyle="italic"
                  fill="#8a6010"
                  opacity={0.5}
                >
                  your photo
                </text>
              )}

              {/* Left half shell (interior) */}
              <path
                d={HEART_LEFT}
                fill="url(#goldInner)"
                stroke="#a07010"
                strokeWidth={1}
              />
              {/* Left inner recess */}
              <path
                d={HEART_INNER_LEFT}
                fill="url(#recessGold)"
                stroke="#a07010"
                strokeWidth={0.8}
              />

              {/* Inner rim highlight */}
              <path
                d={HEART_INNER_RIGHT}
                fill="none"
                stroke="#f5e8a0"
                strokeWidth={0.5}
                opacity={0.35}
              />
              <path
                d={HEART_INNER_LEFT}
                fill="none"
                stroke="#f5e8a0"
                strokeWidth={0.5}
                opacity={0.35}
              />

              {/* Center seam line */}
              <line
                x1="150"
                y1="97"
                x2="150"
                y2="280"
                stroke="#a07010"
                strokeWidth={0.8}
                opacity={0.3}
              />
            </svg>
          </div>

          {/* Cover - the full heart front that swings open in two halves */}
          <div
            className="relative"
            style={{ zIndex: 2, transformStyle: "preserve-3d" }}
          >
            {/* LEFT DOOR - hinges from left edge */}
            <div
              className="absolute left-0 top-0 w-1/2"
              style={{
                height: "100%",
                transformOrigin: "left center",
                transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
                transform: isOpen ? "perspective(600px) rotateY(-150deg)" : "perspective(600px) rotateY(0deg)",
              }}
            >
              <svg
                viewBox="0 0 150 300"
                width="100%"
                height="100%"
                style={{ overflow: "visible", display: "block" }}
              >
                <defs>
                  <linearGradient id="goldLeft" x1="0.1" y1="0" x2="0.9" y2="1">
                    <stop offset="0%" stopColor="#f7e98e" />
                    <stop offset="15%" stopColor="#e6c44a" />
                    <stop offset="35%" stopColor="#f5e27a" />
                    <stop offset="50%" stopColor="#d4a017" />
                    <stop offset="65%" stopColor="#f0d860" />
                    <stop offset="85%" stopColor="#c99a2e" />
                    <stop offset="100%" stopColor="#a67c00" />
                  </linearGradient>
                  <radialGradient id="specLeft" cx="0.4" cy="0.25" r="0.5">
                    <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.75" />
                    <stop offset="30%" stopColor="#f5e8a0" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="edgeLeft" cx="0.5" cy="0.45" r="0.52">
                    <stop offset="55%" stopColor="transparent" />
                    <stop offset="85%" stopColor="rgba(140,80,0,0.25)" />
                    <stop offset="100%" stopColor="rgba(100,55,0,0.45)" />
                  </radialGradient>
                  <filter id="shadowLeft" x="-25%" y="-15%" width="150%" height="150%">
                    <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="rgba(80,50,0,0.3)" />
                  </filter>
                </defs>
                <g filter="url(#shadowLeft)">
                  {/* Thickness rim */}
                  <path
                    d={HEART_LEFT}
                    fill="#a67c00"
                    transform="translate(1,2)"
                  />
                  {/* Main body */}
                  <path d={HEART_LEFT} fill="url(#goldLeft)" stroke="#a07010" strokeWidth={1.2} />
                  {/* Specular highlights */}
                  <path d={HEART_LEFT} fill="url(#specLeft)" />
                  <path d={HEART_LEFT} fill="url(#edgeLeft)" />
                  {/* Sculpted swirl */}
                  <path
                    d="M70,130 C75,112,100,107,112,118 C118,128,112,150,96,156 C82,160,68,150,70,140"
                    fill="none"
                    stroke="#c99a2e"
                    strokeWidth={3}
                    strokeLinecap="round"
                    opacity={0.45}
                  />
                  <path
                    d="M70,130 C75,112,100,107,112,118 C118,128,112,150,96,156 C82,160,68,150,70,140"
                    fill="none"
                    stroke="#f5e8a0"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    opacity={0.2}
                    transform="translate(-1,-1)"
                  />
                  {/* Highlight spots */}
                  <ellipse cx="85" cy="95" rx="22" ry="12" fill="white" opacity={0.18} transform="rotate(-25 85 95)" />
                  <ellipse cx="72" cy="90" rx="6" ry="3" fill="white" opacity={0.3} transform="rotate(-25 72 90)" />
                  {/* Seam */}
                  <line x1="150" y1="60" x2="150" y2="280" stroke="#a07010" strokeWidth={0.8} opacity={0.3} />
                  {/* Edge highlight */}
                  <path d={HEART_LEFT} fill="none" stroke="#f5e8a0" strokeWidth={0.6} opacity={0.3} />
                </g>
              </svg>
            </div>

            {/* RIGHT DOOR - hinges from right edge */}
            <div
              className="absolute right-0 top-0 w-1/2"
              style={{
                height: "100%",
                transformOrigin: "right center",
                transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s",
                transform: isOpen ? "perspective(600px) rotateY(150deg)" : "perspective(600px) rotateY(0deg)",
              }}
            >
              <svg
                viewBox="150 0 150 300"
                width="100%"
                height="100%"
                style={{ overflow: "visible", display: "block" }}
              >
                <defs>
                  <linearGradient id="goldRight" x1="0.1" y1="0" x2="0.9" y2="1">
                    <stop offset="0%" stopColor="#f7e98e" />
                    <stop offset="15%" stopColor="#e6c44a" />
                    <stop offset="35%" stopColor="#f5e27a" />
                    <stop offset="50%" stopColor="#d4a017" />
                    <stop offset="65%" stopColor="#f0d860" />
                    <stop offset="85%" stopColor="#c99a2e" />
                    <stop offset="100%" stopColor="#a67c00" />
                  </linearGradient>
                  <radialGradient id="specRight" cx="0.6" cy="0.25" r="0.5">
                    <stop offset="0%" stopColor="#fffbe6" stopOpacity="0.75" />
                    <stop offset="30%" stopColor="#f5e8a0" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="edgeRight" cx="0.5" cy="0.45" r="0.52">
                    <stop offset="55%" stopColor="transparent" />
                    <stop offset="85%" stopColor="rgba(140,80,0,0.25)" />
                    <stop offset="100%" stopColor="rgba(100,55,0,0.45)" />
                  </radialGradient>
                  <filter id="shadowRight" x="-25%" y="-15%" width="150%" height="150%">
                    <feDropShadow dx="2" dy="4" stdDeviation="6" floodColor="rgba(80,50,0,0.3)" />
                  </filter>
                </defs>
                <g filter="url(#shadowRight)">
                  <path d={HEART_RIGHT} fill="#a67c00" transform="translate(1,2)" />
                  <path d={HEART_RIGHT} fill="url(#goldRight)" stroke="#a07010" strokeWidth={1.2} />
                  <path d={HEART_RIGHT} fill="url(#specRight)" />
                  <path d={HEART_RIGHT} fill="url(#edgeRight)" />
                  {/* Sculpted swirl */}
                  <path
                    d="M200,120 C210,108,230,115,225,130 C220,145,200,150,192,142"
                    fill="none"
                    stroke="#c99a2e"
                    strokeWidth={3}
                    strokeLinecap="round"
                    opacity={0.45}
                  />
                  <path
                    d="M200,120 C210,108,230,115,225,130 C220,145,200,150,192,142"
                    fill="none"
                    stroke="#f5e8a0"
                    strokeWidth={1.2}
                    strokeLinecap="round"
                    opacity={0.2}
                    transform="translate(-1,-1)"
                  />
                  <ellipse cx="215" cy="95" rx="16" ry="8" fill="white" opacity={0.15} transform="rotate(20 215 95)" />
                  <line x1="150" y1="60" x2="150" y2="280" stroke="#a07010" strokeWidth={0.8} opacity={0.3} />
                  <path d={HEART_RIGHT} fill="none" stroke="#f5e8a0" strokeWidth={0.6} opacity={0.3} />
                </g>
              </svg>
            </div>

            {/* Invisible spacer to give the container the correct height */}
            <svg
              viewBox="0 0 300 300"
              width="100%"
              style={{ display: "block", visibility: "hidden" }}
            >
              <path d={HEART_FULL} />
            </svg>
          </div>
        </div>
      </div>

      {/* Message below locket */}
      <div
        className="mt-2 text-center transition-all duration-700"
        style={{
          opacity: isOpen && name ? 1 : 0,
          transform: isOpen && name ? "translateY(0)" : "translateY(8px)",
        }}
      >
        <p className="font-serif text-lg italic text-muted-foreground">
          {"For "}
          <span className="text-foreground">{name}</span>
          {", with love."}
        </p>
      </div>

      {/* Hint */}
      {!isOpen && (
        <p className="mt-1 text-center font-sans text-[10px] uppercase tracking-[0.25em] text-muted-foreground/50">
          click to open
        </p>
      )}
    </div>
  );
}
