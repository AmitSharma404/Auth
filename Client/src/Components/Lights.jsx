import { useEffect, useRef, useCallback, useState } from "react";

const COLS = 30;
const ROWS = 16;
const TOTAL = COLS * ROWS;

// Neon disco palette
const COLORS = [
  "#ff00ff", "#00ffff", "#ff0066", "#66ff00",
  "#ff6600", "#0066ff", "#ffff00", "#ff0000",
  "#00ff66", "#9900ff", "#ff3399", "#00ffaa",
];

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// Lightning bolt path generator — returns array of cell indices forming a bolt
const generateLightningBolt = () => {
  const path = [];
  let col = Math.floor(Math.random() * COLS);
  for (let row = 0; row < ROWS; row++) {
    path.push(row * COLS + col);
    // branch sideways randomly
    const drift = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
    col = Math.max(0, Math.min(COLS - 1, col + drift));
    // occasional fork
    if (Math.random() > 0.6) {
      const fork = Math.max(0, Math.min(COLS - 1, col + (Math.random() > 0.5 ? 1 : -1)));
      path.push(row * COLS + fork);
    }
  }
  return path;
};

// Radial burst from a center cell
const generateRadialBurst = (centerIdx) => {
  const cx = centerIdx % COLS;
  const cy = Math.floor(centerIdx / COLS);
  const cells = [];
  for (let r = 0; r <= 4; r++) {
    for (let angle = 0; angle < 360; angle += 30) {
      const rad = (angle * Math.PI) / 180;
      const x = Math.round(cx + r * Math.cos(rad));
      const y = Math.round(cy + r * Math.sin(rad));
      if (x >= 0 && x < COLS && y >= 0 && y < ROWS) {
        cells.push({ idx: y * COLS + x, delay: r * 40 });
      }
    }
  }
  return cells;
};

// Wave pattern — horizontal sweep
const generateWave = (direction) => {
  const cells = [];
  const start = direction === "left" ? 0 : COLS - 1;
  const step = direction === "left" ? 1 : -1;
  for (let c = 0; c < COLS; c++) {
    const col = start + c * step;
    for (let r = 0; r < ROWS; r++) {
      cells.push({ idx: r * COLS + col, delay: c * 30 });
    }
  }
  return cells;
};

// Diagonal rain
const generateDiagonalRain = () => {
  const cells = [];
  for (let d = 0; d < COLS + ROWS; d++) {
    for (let r = 0; r < ROWS; r++) {
      const c = d - r;
      if (c >= 0 && c < COLS) {
        cells.push({ idx: r * COLS + c, delay: d * 25 });
      }
    }
  }
  return cells;
};

export const Lights = () => {
  const cellRefs = useRef([]);
  const animFrameRef = useRef(null);
  const intervalRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Reset all cells to dim
  const resetCells = useCallback(() => {
    cellRefs.current.forEach((cell) => {
      if (cell) {
        cell.style.backgroundColor = "#111";
        cell.style.boxShadow = "none";
        cell.style.transform = "scale(1)";
        cell.style.opacity = "0.3";
      }
    });
  }, []);

  // Light up a single cell with color + glow
  const lightCell = useCallback((idx, color, intensity = 1) => {
    const cell = cellRefs.current[idx];
    if (!cell) return;
    cell.style.backgroundColor = color;
    cell.style.boxShadow = `0 0 ${8 * intensity}px ${color}, 0 0 ${16 * intensity}px ${color}`;
    cell.style.transform = `scale(${1 + 0.3 * intensity})`;
    cell.style.opacity = `${0.6 + 0.4 * intensity}`;
  }, []);

  // Dim a cell back
  const dimCell = useCallback((idx) => {
    const cell = cellRefs.current[idx];
    if (!cell) return;
    cell.style.backgroundColor = "#111";
    cell.style.boxShadow = "none";
    cell.style.transform = "scale(1)";
    cell.style.opacity = "0.3";
  }, []);

  // Pattern: Lightning bolt
  const triggerLightning = useCallback(() => {
    const bolt = generateLightningBolt();
    const color = getRandomColor();
    // Flash the whole grid faintly
    cellRefs.current.forEach((c) => {
      if (c) c.style.opacity = "0.5";
    });
    bolt.forEach((idx, i) => {
      setTimeout(() => lightCell(idx, color, 1.5), i * 20);
      setTimeout(() => dimCell(idx), i * 20 + 300);
    });
    setTimeout(resetCells, bolt.length * 20 + 500);
  }, [lightCell, dimCell, resetCells]);

  // Pattern: Radial burst
  const triggerBurst = useCallback(() => {
    const center = Math.floor(Math.random() * TOTAL);
    const burst = generateRadialBurst(center);
    const color = getRandomColor();
    burst.forEach(({ idx, delay }) => {
      setTimeout(() => lightCell(idx, color), delay);
      setTimeout(() => dimCell(idx), delay + 250);
    });
    setTimeout(resetCells, 600);
  }, [lightCell, dimCell, resetCells]);

  // Pattern: Wave sweep
  const triggerWave = useCallback(() => {
    const dir = Math.random() > 0.5 ? "left" : "right";
    const wave = generateWave(dir);
    const color = getRandomColor();
    wave.forEach(({ idx, delay }) => {
      setTimeout(() => lightCell(idx, color, 0.8), delay);
      setTimeout(() => dimCell(idx), delay + 200);
    });
    setTimeout(resetCells, COLS * 30 + 400);
  }, [lightCell, dimCell, resetCells]);

  // Pattern: Diagonal rain
  const triggerDiagonal = useCallback(() => {
    const rain = generateDiagonalRain();
    const color = getRandomColor();
    rain.forEach(({ idx, delay }) => {
      setTimeout(() => lightCell(idx, color, 0.7), delay);
      setTimeout(() => dimCell(idx), delay + 180);
    });
    setTimeout(resetCells, (COLS + ROWS) * 25 + 400);
  }, [lightCell, dimCell, resetCells]);

  // Pattern: Random sparkle
  const triggerSparkle = useCallback(() => {
    const count = 40 + Math.floor(Math.random() * 40);
    for (let i = 0; i < count; i++) {
      const idx = Math.floor(Math.random() * TOTAL);
      const color = getRandomColor();
      const delay = Math.random() * 600;
      setTimeout(() => lightCell(idx, color, Math.random() * 1.5), delay);
      setTimeout(() => dimCell(idx), delay + 200 + Math.random() * 200);
    }
    setTimeout(resetCells, 1200);
  }, [lightCell, dimCell, resetCells]);

  // Pattern: Checkerboard flash
  const triggerCheckerboard = useCallback(() => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = r * COLS + c;
        const isEven = (r + c) % 2 === 0;
        setTimeout(() => lightCell(idx, isEven ? color1 : color2, 0.8), 0);
      }
    }
    setTimeout(() => {
      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const idx = r * COLS + c;
          const isEven = (r + c) % 2 === 0;
          lightCell(idx, isEven ? color2 : color1, 0.8);
        }
      }
    }, 300);
    setTimeout(resetCells, 700);
  }, [lightCell, resetCells]);

  // Pattern: Double lightning (two simultaneous bolts)
  const triggerDoubleLightning = useCallback(() => {
    const bolt1 = generateLightningBolt();
    const bolt2 = generateLightningBolt();
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    // Bright flash
    cellRefs.current.forEach((c) => {
      if (c) {
        c.style.opacity = "0.6";
        c.style.backgroundColor = "#222";
      }
    });

    bolt1.forEach((idx, i) => {
      setTimeout(() => lightCell(idx, color1, 1.8), i * 15);
      setTimeout(() => dimCell(idx), i * 15 + 350);
    });
    bolt2.forEach((idx, i) => {
      setTimeout(() => lightCell(idx, color2, 1.8), i * 15 + 50);
      setTimeout(() => dimCell(idx), i * 15 + 400);
    });
    setTimeout(resetCells, Math.max(bolt1.length, bolt2.length) * 15 + 600);
  }, [lightCell, dimCell, resetCells]);

  // Cycle through patterns
  const patterns = useRef([]);

  useEffect(() => {
    patterns.current = [
      triggerLightning,
      triggerBurst,
      triggerWave,
      triggerSparkle,
      triggerLightning,
      triggerDiagonal,
      triggerCheckerboard,
      triggerDoubleLightning,
      triggerBurst,
      triggerLightning,
    ];
  }, [triggerLightning, triggerBurst, triggerWave, triggerSparkle, triggerDiagonal, triggerCheckerboard, triggerDoubleLightning]);

  useEffect(() => {
    setMounted(true);
    let patternIndex = 0;

    const runNextPattern = () => {
      if (patterns.current.length === 0) return;
      patterns.current[patternIndex % patterns.current.length]();
      patternIndex++;
    };

    // Start after a short delay
    const timeout = setTimeout(() => {
      runNextPattern();
      intervalRef.current = setInterval(runNextPattern, 1400);
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden flex items-center justify-center">
      <div
        className="grid gap-0.5"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
          width: "100vw",
          height: "100vh",
          padding: "2px",
        }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (cellRefs.current[i] = el)}
            className="rounded-sm"
            style={{
              backgroundColor: "#111",
              opacity: 0.3,
              transition: "all 0.15s ease",
              willChange: "background-color, box-shadow, transform, opacity",
            }}
          />
        ))}
      </div>
    </div>
  );
};