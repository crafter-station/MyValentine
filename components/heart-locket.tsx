"use client";

import { useState } from "react";

interface HeartLocketProps {
  name: string | null;
  image: string | null;
}

/* Puffier, rounder heart paths */
const HEART_FULL =
  "M150,285 C150,285,22,205,22,122 C22,78,54,52,93,52 C122,52,141,70,150,100 C159,70,178,52,207,52 C246,52,278,78,278,122 C278,205,150,285,150,285Z";

const HEART_RIGHT =
  "M150,285 L150,100 C159,70,178,52,207,52 C246,52,278,78,278,122 C278,205,150,285,150,285Z";

const HEART_LEFT =
  "M150,285 L150,100 C141,70,122,52,93,52 C54,52,22,78,22,122 C22,205,150,285,150,285Z";

const HEART_INNER_RIGHT =
  "M150,268 L150,110 C160,85,178,72,202,72 C234,72,260,94,260,128 C260,198,150,268,150,268Z";

const HEART_INNER_LEFT =
  "M150,268 L150,110 C140,85,122,72,98,72 C66,72,40,94,40,128 C40,198,150,268,150,268Z";

export function HeartLocket({ name, image }: HeartLocketProps) {
  const [isOpen, setIsOpen] = useState(false);

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
        {/* ====== CHAIN + BAIL ====== */}
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
            <linearGradient id="bailGold" x1="0" y1="0" x2="0.5" y2="1">
              <stop offset="0%" stopColor="#f5e27a" />
              <stop offset="40%" stopColor="#d4a017" />
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

          {/* Bail ring */}
          <circle
            cx="150"
            cy="-12"
            r="9"
            fill="none"
            stroke="url(#goldChain)"
            strokeWidth={3.5}
          />
          <circle
            cx="150"
            cy="-12"
            r="9"
            fill="none"
            stroke="#f9f1a0"
            strokeWidth={0.6}
            opacity={0.4}
          />

          {/* Triangular bail connector */}
          <path
            d="M138,8 L143,-2 L157,-2 L162,8 L159,20 C155,26,145,26,141,20 Z"
            fill="url(#bailGold)"
            stroke="#8b6914"
            strokeWidth={1}
          />
          {/* Bail specular */}
          <ellipse cx="150" cy="6" rx="7" ry="4" fill="white" opacity={0.25} />
          {/* Bail depth stroke */}
          <path
            d="M138,8 L143,-2 L157,-2 L162,8 L159,20 C155,26,145,26,141,20 Z"
            fill="none"
            stroke="#f5e8a0"
            strokeWidth={0.5}
            opacity={0.3}
          />
        </svg>

        {/* ====== HEART LOCKET ====== */}
        <div
          className="-mt-[20px] relative mx-auto w-full cursor-pointer"
          style={{ perspective: "800px" }}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {/* Interior — stationary, reveals photo when cover opens */}
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
                  width="128"
                  height="215"
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

              {/* Inner rim highlights */}
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

              {/* Center seam */}
              <line
                x1="150"
                y1="100"
                x2="150"
                y2="285"
                stroke="#a07010"
                strokeWidth={0.8}
                opacity={0.3}
              />
            </svg>
          </div>

          {/* Cover — the full heart front that swings open */}
          <div
            className="relative"
            style={{
              zIndex: 2,
              transformStyle: "preserve-3d",
              transform: "rotate(10deg)",
            }}
          >
            {/* LEFT DOOR */}
            <div
              className="absolute left-0 top-0 w-1/2"
              style={{
                height: "100%",
                transformOrigin: "left center",
                transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1)",
                transform: isOpen
                  ? "perspective(600px) rotateY(-150deg)"
                  : "perspective(600px) rotateY(0deg)",
              }}
            >
              <svg
                viewBox="0 0 150 300"
                width="100%"
                height="100%"
                style={{ overflow: "visible", display: "block" }}
              >
                <defs>
                  {/* Base gold gradient */}
                  <linearGradient
                    id="puffyGoldL"
                    x1="0.15"
                    y1="0"
                    x2="0.85"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#8b6914" />
                    <stop offset="18%" stopColor="#d4a017" />
                    <stop offset="35%" stopColor="#f5e27a" />
                    <stop offset="52%" stopColor="#e6c44a" />
                    <stop offset="70%" stopColor="#c99a2e" />
                    <stop offset="100%" stopColor="#7d5a0f" />
                  </linearGradient>
                  {/* 3D curvature radial */}
                  <radialGradient
                    id="puffyRadialL"
                    cx="0.55"
                    cy="0.28"
                    r="0.65"
                  >
                    <stop offset="0%" stopColor="#faf3a8" />
                    <stop offset="20%" stopColor="#f5e27a" />
                    <stop offset="45%" stopColor="#d4a017" />
                    <stop offset="70%" stopColor="#b08930" />
                    <stop offset="100%" stopColor="#8b6914" />
                  </radialGradient>
                  {/* Specular highlight (main) */}
                  <radialGradient id="specL" cx="0.6" cy="0.2" r="0.28">
                    <stop offset="0%" stopColor="#fffef0" stopOpacity="0.92" />
                    <stop offset="35%" stopColor="#fff9d0" stopOpacity="0.5" />
                    <stop
                      offset="100%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  {/* Specular spot (intense) */}
                  <radialGradient id="specSpotL" cx="0.55" cy="0.16" r="0.1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="50%" stopColor="#fffef0" stopOpacity="0.45" />
                    <stop
                      offset="100%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  {/* Ambient occlusion (edge darkening) */}
                  <radialGradient id="aoL" cx="0.5" cy="0.42" r="0.50">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop
                      offset="65%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                    <stop offset="88%" stopColor="#6b4810" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4a3008" stopOpacity="0.5" />
                  </radialGradient>
                  {/* Bottom-right shadow zone */}
                  <radialGradient id="shadowL" cx="0.75" cy="0.78" r="0.45">
                    <stop offset="0%" stopColor="#5a3d0f" stopOpacity="0.45" />
                    <stop offset="45%" stopColor="#6b4810" stopOpacity="0.2" />
                    <stop
                      offset="100%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  {/* Soft glow filter for specular */}
                  <filter
                    id="softGlowL"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                  </filter>
                  {/* 3D shadow filter */}
                  <filter
                    id="shadow3DL"
                    x="-30%"
                    y="-20%"
                    width="170%"
                    height="170%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="4"
                      result="blur1"
                    />
                    <feOffset in="blur1" dx="3" dy="7" result="off1" />
                    <feFlood floodColor="#3d2808" floodOpacity="0.35" />
                    <feComposite in2="off1" operator="in" result="shadow1" />
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="9"
                      result="blur2"
                    />
                    <feOffset in="blur2" dx="2" dy="4" result="off2" />
                    <feFlood floodColor="#5a3d0f" floodOpacity="0.12" />
                    <feComposite in2="off2" operator="in" result="shadow2" />
                    <feMerge>
                      <feMergeNode in="shadow2" />
                      <feMergeNode in="shadow1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#shadow3DL)">
                  {/* Layer 1: Depth offset */}
                  <path
                    d={HEART_LEFT}
                    fill="#7d5a0f"
                    transform="translate(1.5,2.5)"
                    opacity={0.3}
                  />
                  {/* Layer 2: Base gold */}
                  <path d={HEART_LEFT} fill="url(#puffyGoldL)" />
                  {/* Layer 3: 3D curvature */}
                  <path
                    d={HEART_LEFT}
                    fill="url(#puffyRadialL)"
                    opacity={0.75}
                  />
                  {/* Layer 4: Ambient occlusion */}
                  <path d={HEART_LEFT} fill="url(#aoL)" />
                  {/* Layer 5: Shadow zone */}
                  <path d={HEART_LEFT} fill="url(#shadowL)" />
                  {/* Layer 6: Specular highlight */}
                  <path d={HEART_LEFT} fill="url(#specL)" />
                  {/* Layer 7: Specular spot with blur */}
                  <path
                    d={HEART_LEFT}
                    fill="url(#specSpotL)"
                    filter="url(#softGlowL)"
                  />
                  {/* Layer 8: Edge rim highlight */}
                  <path
                    d={HEART_LEFT}
                    fill="none"
                    stroke="#f9f1a0"
                    strokeWidth={0.7}
                    opacity={0.35}
                  />
                  {/* Layer 9: Outline */}
                  <path
                    d={HEART_LEFT}
                    fill="none"
                    stroke="#8b6914"
                    strokeWidth={1.2}
                  />
                  {/* Seam line */}
                  <line
                    x1="150"
                    y1="52"
                    x2="150"
                    y2="285"
                    stroke="#8b6914"
                    strokeWidth={0.6}
                    opacity={0.25}
                  />
                </g>
              </svg>
            </div>

            {/* RIGHT DOOR */}
            <div
              className="absolute right-0 top-0 w-1/2"
              style={{
                height: "100%",
                transformOrigin: "right center",
                transition: "transform 0.8s cubic-bezier(0.4,0,0.2,1) 0.1s",
                transform: isOpen
                  ? "perspective(600px) rotateY(150deg)"
                  : "perspective(600px) rotateY(0deg)",
              }}
            >
              <svg
                viewBox="150 0 150 300"
                width="100%"
                height="100%"
                style={{ overflow: "visible", display: "block" }}
              >
                <defs>
                  {/* Base gold gradient */}
                  <linearGradient
                    id="puffyGoldR"
                    x1="0.15"
                    y1="0"
                    x2="0.85"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#f7e98e" />
                    <stop offset="22%" stopColor="#e6c44a" />
                    <stop offset="42%" stopColor="#f5e27a" />
                    <stop offset="58%" stopColor="#d4a017" />
                    <stop offset="78%" stopColor="#c99a2e" />
                    <stop offset="100%" stopColor="#8b6914" />
                  </linearGradient>
                  {/* 3D curvature radial */}
                  <radialGradient
                    id="puffyRadialR"
                    cx="0.42"
                    cy="0.28"
                    r="0.65"
                  >
                    <stop offset="0%" stopColor="#faf3a8" />
                    <stop offset="20%" stopColor="#f5e27a" />
                    <stop offset="45%" stopColor="#d4a017" />
                    <stop offset="70%" stopColor="#b08930" />
                    <stop offset="100%" stopColor="#8b6914" />
                  </radialGradient>
                  {/* Specular highlight */}
                  <radialGradient id="specR" cx="0.35" cy="0.22" r="0.3">
                    <stop offset="0%" stopColor="#fffef0" stopOpacity="0.85" />
                    <stop offset="35%" stopColor="#fff9d0" stopOpacity="0.45" />
                    <stop
                      offset="100%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  {/* Specular spot (intense) */}
                  <radialGradient id="specSpotR" cx="0.38" cy="0.17" r="0.09">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="50%" stopColor="#fffef0" stopOpacity="0.4" />
                    <stop
                      offset="100%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  {/* Ambient occlusion */}
                  <radialGradient id="aoR" cx="0.5" cy="0.42" r="0.50">
                    <stop offset="0%" stopColor="transparent" stopOpacity="0" />
                    <stop
                      offset="65%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                    <stop offset="88%" stopColor="#6b4810" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#4a3008" stopOpacity="0.5" />
                  </radialGradient>
                  {/* Shadow zone (bottom-right) */}
                  <radialGradient id="shadowR" cx="0.7" cy="0.75" r="0.42">
                    <stop offset="0%" stopColor="#5a3d0f" stopOpacity="0.5" />
                    <stop offset="45%" stopColor="#6b4810" stopOpacity="0.25" />
                    <stop
                      offset="100%"
                      stopColor="transparent"
                      stopOpacity="0"
                    />
                  </radialGradient>
                  {/* Soft glow filter */}
                  <filter
                    id="softGlowR"
                    x="-50%"
                    y="-50%"
                    width="200%"
                    height="200%"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                  </filter>
                  {/* 3D shadow filter */}
                  <filter
                    id="shadow3DR"
                    x="-30%"
                    y="-20%"
                    width="170%"
                    height="170%"
                  >
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="4"
                      result="blur1"
                    />
                    <feOffset in="blur1" dx="3" dy="7" result="off1" />
                    <feFlood floodColor="#3d2808" floodOpacity="0.35" />
                    <feComposite in2="off1" operator="in" result="shadow1" />
                    <feGaussianBlur
                      in="SourceAlpha"
                      stdDeviation="9"
                      result="blur2"
                    />
                    <feOffset in="blur2" dx="2" dy="4" result="off2" />
                    <feFlood floodColor="#5a3d0f" floodOpacity="0.12" />
                    <feComposite in2="off2" operator="in" result="shadow2" />
                    <feMerge>
                      <feMergeNode in="shadow2" />
                      <feMergeNode in="shadow1" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#shadow3DR)">
                  {/* Layer 1: Depth offset */}
                  <path
                    d={HEART_RIGHT}
                    fill="#7d5a0f"
                    transform="translate(1.5,2.5)"
                    opacity={0.3}
                  />
                  {/* Layer 2: Base gold */}
                  <path d={HEART_RIGHT} fill="url(#puffyGoldR)" />
                  {/* Layer 3: 3D curvature */}
                  <path
                    d={HEART_RIGHT}
                    fill="url(#puffyRadialR)"
                    opacity={0.75}
                  />
                  {/* Layer 4: Ambient occlusion */}
                  <path d={HEART_RIGHT} fill="url(#aoR)" />
                  {/* Layer 5: Shadow zone */}
                  <path d={HEART_RIGHT} fill="url(#shadowR)" />
                  {/* Layer 6: Specular highlight */}
                  <path d={HEART_RIGHT} fill="url(#specR)" />
                  {/* Layer 7: Specular spot with blur */}
                  <path
                    d={HEART_RIGHT}
                    fill="url(#specSpotR)"
                    filter="url(#softGlowR)"
                  />
                  {/* Layer 8: Edge rim highlight */}
                  <path
                    d={HEART_RIGHT}
                    fill="none"
                    stroke="#f9f1a0"
                    strokeWidth={0.7}
                    opacity={0.35}
                  />
                  {/* Layer 9: Outline */}
                  <path
                    d={HEART_RIGHT}
                    fill="none"
                    stroke="#8b6914"
                    strokeWidth={1.2}
                  />
                  {/* Seam line */}
                  <line
                    x1="150"
                    y1="52"
                    x2="150"
                    y2="285"
                    stroke="#8b6914"
                    strokeWidth={0.6}
                    opacity={0.25}
                  />
                </g>
              </svg>
            </div>

            {/* Invisible spacer for correct height */}
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
