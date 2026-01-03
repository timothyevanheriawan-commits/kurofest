"use client";

/**
 * Venue SVG - Architectural Blueprint Style
 * Features: Walls, Halls, Entrances, Zone Textures
 */

export function VenueSVG() {
    return (
        <svg
            viewBox="0 0 1000 1000"
            className="h-full w-full"
            fill="none"
            aria-label="Tokyo Big Sight venue floor plan"
        >
            {/* ═══════════════════════════════════════════════════════════════════
          DEFINITIONS - Patterns & Gradients
          ═══════════════════════════════════════════════════════════════════ */}
            <defs>
                {/* Fine grid pattern */}
                <pattern
                    id="fine-grid"
                    width="20"
                    height="20"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.05"
                        strokeWidth="0.5"
                        className="text-sumi-950"
                    />
                </pattern>

                {/* Main grid pattern */}
                <pattern
                    id="main-grid"
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        d="M 100 0 L 0 0 0 100"
                        fill="none"
                        stroke="currentColor"
                        strokeOpacity="0.08"
                        strokeWidth="1"
                        className="text-sumi-950"
                    />
                </pattern>

                {/* Booth crowd density pattern */}
                <pattern
                    id="crowd-pattern"
                    width="8"
                    height="8"
                    patternUnits="userSpaceOnUse"
                >
                    <circle cx="4" cy="4" r="1" fill="currentColor" className="text-sumi-400" opacity="0.3" />
                </pattern>

                {/* Diagonal hatch for restricted areas */}
                <pattern
                    id="hatch-pattern"
                    width="10"
                    height="10"
                    patternUnits="userSpaceOnUse"
                    patternTransform="rotate(45)"
                >
                    <line
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="10"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-sumi-300"
                        opacity="0.3"
                    />
                </pattern>
            </defs>

            {/* ═══════════════════════════════════════════════════════════════════
          BACKGROUND LAYERS
          ═══════════════════════════════════════════════════════════════════ */}
            <rect width="1000" height="1000" fill="url(#fine-grid)" />
            <rect width="1000" height="1000" fill="url(#main-grid)" />

            {/* ═══════════════════════════════════════════════════════════════════
          OUTER WALLS - Heavy Architectural Frame
          ═══════════════════════════════════════════════════════════════════ */}
            <path
                d="M 50 80 
           L 950 80 
           L 950 920 
           L 50 920 
           Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="6"
                className="text-sumi-950"
            />

            {/* Double wall effect */}
            <path
                d="M 60 90 
           L 940 90 
           L 940 910 
           L 60 910 
           Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-sumi-400"
                strokeDasharray="4 4"
            />

            {/* ═══════════════════════════════════════════════════════════════════
          HALL DIVISIONS
          ═══════════════════════════════════════════════════════════════════ */}

            {/* Center vertical divider (Halls 1-4 | Halls 5-8) */}
            <line
                x1="500"
                y1="80"
                x2="500"
                y2="920"
                stroke="currentColor"
                strokeWidth="4"
                className="text-sumi-950"
            />

            {/* Horizontal dividers */}
            <line
                x1="50"
                y1="350"
                x2="950"
                y2="350"
                stroke="currentColor"
                strokeWidth="2"
                className="text-sumi-400"
                strokeDasharray="8 8"
            />
            <line
                x1="50"
                y1="620"
                x2="950"
                y2="620"
                stroke="currentColor"
                strokeWidth="2"
                className="text-sumi-400"
                strokeDasharray="8 8"
            />

            {/* ═══════════════════════════════════════════════════════════════════
          ZONES - Filled Areas
          ═══════════════════════════════════════════════════════════════════ */}

            {/* Main Stage Area (Top Center) */}
            <rect
                x="300"
                y="100"
                width="400"
                height="180"
                fill="currentColor"
                className="text-sumi-100"
                stroke="currentColor"
                strokeWidth="3"
            />
            <rect
                x="300"
                y="100"
                width="400"
                height="180"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
                className="text-sumi-950"
            />
            {/* Stage platform */}
            <rect
                x="380"
                y="120"
                width="240"
                height="80"
                fill="currentColor"
                className="text-shu-600"
                opacity="0.2"
            />
            <rect
                x="380"
                y="120"
                width="240"
                height="80"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-shu-600"
            />
            <text
                x="500"
                y="165"
                textAnchor="middle"
                className="text-sumi-950 text-[14px] font-bold uppercase tracking-[0.2em]"
                fill="currentColor"
            >
                Main Stage
            </text>
            <text
                x="500"
                y="185"
                textAnchor="middle"
                className="text-sumi-500 text-[10px] tracking-[0.1em]"
                fill="currentColor"
                fontFamily="serif"
            >
                メインステージ
            </text>

            {/* Stage B (Right side) */}
            <rect
                x="700"
                y="380"
                width="180"
                height="120"
                fill="currentColor"
                className="text-sumi-100"
                stroke="currentColor"
                strokeWidth="2"
            />
            <rect
                x="700"
                y="380"
                width="180"
                height="120"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-sumi-950"
            />
            <text
                x="790"
                y="445"
                textAnchor="middle"
                className="text-sumi-700 text-[11px] font-bold uppercase tracking-[0.15em]"
                fill="currentColor"
            >
                Stage B
            </text>

            {/* Artist Alley (Left side - with crowd texture) */}
            <rect
                x="80"
                y="380"
                width="350"
                height="200"
                fill="url(#crowd-pattern)"
            />
            <rect
                x="80"
                y="380"
                width="350"
                height="200"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-sumi-950"
            />
            {/* Booth grid lines */}
            {[1, 2, 3, 4].map((i) => (
                <line
                    key={`booth-v-${i}`}
                    x1={80 + i * 70}
                    y1="380"
                    x2={80 + i * 70}
                    y2="580"
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-sumi-300"
                />
            ))}
            {[1, 2, 3].map((i) => (
                <line
                    key={`booth-h-${i}`}
                    x1="80"
                    y1={380 + i * 50}
                    x2="430"
                    y2={380 + i * 50}
                    stroke="currentColor"
                    strokeWidth="1"
                    className="text-sumi-300"
                />
            ))}
            <text
                x="255"
                y="490"
                textAnchor="middle"
                className="text-sumi-700 text-[12px] font-bold uppercase tracking-[0.15em]"
                fill="currentColor"
            >
                Artist Alley
            </text>

            {/* Cosplay Zone (Right bottom) */}
            <rect
                x="550"
                y="650"
                width="350"
                height="200"
                fill="currentColor"
                className="text-sumi-50"
                stroke="currentColor"
                strokeWidth="2"
            />
            <rect
                x="550"
                y="650"
                width="350"
                height="200"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-sumi-950"
            />
            {/* Photo backdrop areas */}
            <rect x="580" y="680" width="60" height="60" fill="currentColor" className="text-sumi-200" />
            <rect x="660" y="680" width="60" height="60" fill="currentColor" className="text-sumi-200" />
            <rect x="740" y="680" width="60" height="60" fill="currentColor" className="text-sumi-200" />
            <text
                x="725"
                y="780"
                textAnchor="middle"
                className="text-sumi-700 text-[12px] font-bold uppercase tracking-[0.15em]"
                fill="currentColor"
            >
                Cosplay Zone
            </text>

            {/* Food Court (Left bottom) */}
            <rect
                x="80"
                y="650"
                width="250"
                height="200"
                fill="currentColor"
                className="text-sumi-100"
                stroke="currentColor"
                strokeWidth="2"
            />
            <rect
                x="80"
                y="650"
                width="250"
                height="200"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                className="text-sumi-950"
            />
            {/* Table symbols */}
            {[0, 1, 2].map((row) =>
                [0, 1, 2].map((col) => (
                    <circle
                        key={`table-${row}-${col}`}
                        cx={130 + col * 70}
                        cy={700 + row * 50}
                        r="15"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        className="text-sumi-300"
                    />
                ))
            )}
            <text
                x="205"
                y="820"
                textAnchor="middle"
                className="text-sumi-700 text-[12px] font-bold uppercase tracking-[0.15em]"
                fill="currentColor"
            >
                Food Court
            </text>

            {/* Rest Area (Center) */}
            <rect
                x="360"
                y="650"
                width="140"
                height="120"
                fill="url(#hatch-pattern)"
            />
            <rect
                x="360"
                y="650"
                width="140"
                height="120"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-sumi-400"
                strokeDasharray="4 4"
            />
            <text
                x="430"
                y="715"
                textAnchor="middle"
                className="text-sumi-500 text-[10px] uppercase tracking-[0.1em]"
                fill="currentColor"
            >
                Rest Area
            </text>

            {/* ═══════════════════════════════════════════════════════════════════
          ENTRANCES - Triangle Markers
          ═══════════════════════════════════════════════════════════════════ */}

            {/* Main Entrance (Bottom) */}
            <path
                d="M 480 920 L 520 920 L 500 890 Z"
                fill="currentColor"
                className="text-shu-600"
            />
            <text
                x="500"
                y="960"
                textAnchor="middle"
                className="text-sumi-950 text-[10px] font-bold uppercase tracking-[0.15em]"
                fill="currentColor"
            >
                Main Entrance
            </text>
            <text
                x="500"
                y="975"
                textAnchor="middle"
                className="text-sumi-500 text-[9px]"
                fill="currentColor"
                fontFamily="serif"
            >
                正面入口
            </text>

            {/* Side Entrance (Left) */}
            <path
                d="M 50 480 L 50 520 L 80 500 Z"
                fill="currentColor"
                className="text-sumi-600"
            />
            <text
                x="30"
                y="550"
                textAnchor="middle"
                className="text-sumi-600 text-[8px] uppercase tracking-[0.1em]"
                fill="currentColor"
                transform="rotate(-90 30 550)"
            >
                Exit
            </text>

            {/* ═══════════════════════════════════════════════════════════════════
          PILLARS - Structural Elements
          ═══════════════════════════════════════════════════════════════════ */}
            {[
                [200, 350], [400, 350], [600, 350], [800, 350],
                [200, 620], [400, 620], [600, 620], [800, 620],
            ].map(([x, y], i) => (
                <rect
                    key={`pillar-${i}`}
                    x={x - 8}
                    y={y - 8}
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="text-sumi-950"
                />
            ))}

            {/* ═══════════════════════════════════════════════════════════════════
          COMPASS - North Indicator
          ═══════════════════════════════════════════════════════════════════ */}
            <g transform="translate(920, 50)">
                <circle
                    cx="0"
                    cy="0"
                    r="20"
                    fill="currentColor"
                    className="text-washi-100"
                    stroke="currentColor"
                    strokeWidth="2"
                />
                <circle
                    cx="0"
                    cy="0"
                    r="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-sumi-950"
                />
                <text
                    x="0"
                    y="5"
                    textAnchor="middle"
                    className="text-sumi-950 text-[12px] font-bold"
                    fill="currentColor"
                >
                    N
                </text>
                <line
                    x1="0"
                    y1="-12"
                    x2="0"
                    y2="-20"
                    stroke="currentColor"
                    strokeWidth="3"
                    className="text-shu-600"
                />
            </g>

            {/* ═══════════════════════════════════════════════════════════════════
          HALL LABELS
          ═══════════════════════════════════════════════════════════════════ */}
            <text
                x="275"
                y="320"
                textAnchor="middle"
                className="text-sumi-300 text-[24px] font-bold"
                fill="currentColor"
            >
                HALL 1-4
            </text>
            <text
                x="725"
                y="320"
                textAnchor="middle"
                className="text-sumi-300 text-[24px] font-bold"
                fill="currentColor"
            >
                HALL 5-8
            </text>

            {/* ═══════════════════════════════════════════════════════════════════
          MEASUREMENT MARKERS
          ═══════════════════════════════════════════════════════════════════ */}
            {/* Scale bar */}
            <line
                x1="80"
                y1="50"
                x2="180"
                y2="50"
                stroke="currentColor"
                strokeWidth="2"
                className="text-sumi-950"
            />
            <line x1="80" y1="45" x2="80" y2="55" stroke="currentColor" strokeWidth="2" className="text-sumi-950" />
            <line x1="180" y1="45" x2="180" y2="55" stroke="currentColor" strokeWidth="2" className="text-sumi-950" />
            <text
                x="130"
                y="40"
                textAnchor="middle"
                className="text-sumi-500 text-[9px] font-mono"
                fill="currentColor"
            >
                50m
            </text>
        </svg>
    );
}