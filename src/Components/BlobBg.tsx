import React, { useEffect, useRef, useCallback } from "react";

const themeBlobColors = [
  "rgba(42, 127, 63, 0.15)",   // green soft
  "rgba(234, 252, 239, 0.35)", // light green
  "rgba(108, 122, 106, 0.20)", // softText
  "rgba(255, 255, 255, 0.15)", // white glow
  "rgba(221, 230, 216, 0.25)", // border gray
];


interface BlobConfig {
  id: number;
  x: number;
  y: number;
  color: string;
}

interface BlobPosition {
  x: number;
  y: number;
}

interface AnimatedBlobBackgroundProps {
  className?: string;
  blobCount?: number;
  blobPositions?: BlobPosition[];
  colors?: string[];
  animationDuration?: number;
  blurAmount?: number;
  minScale?: number;
  maxScale?: number;
  minOpacity?: number;
  maxOpacity?: number;
  backgroundGradient?: string;
  children?: React.ReactNode;
  uniqueId: string;
}

const AnimatedBlobBackground: React.FC<AnimatedBlobBackgroundProps> = ({
  className = "",
  blobCount = 25,
  blobPositions,
  colors = themeBlobColors, // UPDATED TO YOUR COLOR THEME
  animationDuration = 2000,
  blurAmount = 25,
  minScale = 1.2,
  maxScale = 1.9,
  minOpacity = 0.2,
  maxOpacity = 0.6,
  backgroundGradient = "linear-gradient(180deg, #EAFCEF 0%, #F7F9F7 100%)",
  children,
  uniqueId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const rnd = (min: number, max: number): number =>
    Math.floor(Math.random() * (max - min + 1) + min);

  const rndBorderRadius = useCallback(
    (): string =>
      [...Array(4).keys()].map(() => rnd(40, 80) + "%").join(" ") +
      " / " +
      [...Array(4).keys()].map(() => rnd(40, 80) + "%").join(" "),
    []
  );

  const animateBlob = useCallback(
    (id: number): void => {
      const blob = document.getElementById(
        `blob-${uniqueId}-${id}`
      ) as HTMLDivElement;
      if (!blob) return;

      blob.style.transition = `all ${animationDuration}ms ease`;
      blob.style.transform = `translate(${rnd(-20, 20)}px, ${rnd(
        -20,
        20
      )}px) scale(${
        rnd(minScale * 100, maxScale * 100) / 100
      }) rotate(${rnd(-20, 20)}deg)`;
      blob.style.borderRadius = rndBorderRadius();
      blob.style.opacity = (
        rnd(minOpacity * 100, maxOpacity * 100) / 100
      ).toString();
    },
    [
      uniqueId,
      animationDuration,
      minScale,
      maxScale,
      minOpacity,
      maxOpacity,
      rndBorderRadius,
    ]
  );

  const createBlob = useCallback(
    ({ id, x, y, color }: BlobConfig): HTMLDivElement => {
      const blob = document.createElement("div");
      blob.id = `blob-${uniqueId}-${id}`;
      blob.className = `absolute rounded-full`;
      blob.style.cssText = `
        top: ${y}%;
        left: ${x}%;
        background: ${color};
        height: 30%;
        width: 20%;
        mix-blend-mode: screen;
        filter: blur(${blurAmount}px);
        opacity: ${rnd(minOpacity * 100, maxOpacity * 100) / 100};
        border-radius: ${rndBorderRadius()};
        transform: scale(${rnd(minScale * 100, maxScale * 100) / 100});
      `;
      return blob;
    },
    [
      uniqueId,
      blurAmount,
      minScale,
      maxScale,
      minOpacity,
      maxOpacity,
      rndBorderRadius,
    ]
  );

  const genBlobs = useCallback((): void => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = "";

    const count = blobPositions ? blobPositions.length : blobCount;

    [...Array(count).keys()].forEach((id: number) => {
      const x = blobPositions ? blobPositions[id].x : rnd(10, 80);
      const y = blobPositions ? blobPositions[id].y : rnd(5, 50);
      const color = colors[rnd(0, colors.length - 1)];

      const blob = createBlob({ x, y, color, id });
      container.appendChild(blob);

      animateBlob(id);
    });
  }, [blobCount, blobPositions, colors, createBlob, animateBlob]);

  useEffect(() => {
    genBlobs();
  }, [genBlobs]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${className}`}>
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ background: backgroundGradient }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBlobBackground;
