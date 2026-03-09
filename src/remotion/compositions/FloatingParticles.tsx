import React, { useMemo } from "react";
import { useCurrentFrame, useVideoConfig, random } from "remotion";

interface FloatingParticlesProps {
  count?: number;
  color?: string;
  seed?: string;
}

export const FloatingParticles: React.FC<FloatingParticlesProps> = ({
  count = 30,
  color = "#00A3FF",
  seed = "resend-particles",
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;

  const particles = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      x: random(`${seed}-x-${i}`) * width,
      y: random(`${seed}-y-${i}`) * height,
      size: 2 + random(`${seed}-s-${i}`) * 4,
      speed: 0.3 + random(`${seed}-sp-${i}`) * 0.7,
      phase: random(`${seed}-ph-${i}`) * Math.PI * 2,
      drift: (random(`${seed}-d-${i}`) - 0.5) * 40,
    }));
  }, [count, seed, width, height]);

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p, i) => {
        const yOffset = Math.sin(time * p.speed + p.phase) * 30;
        const xOffset = Math.cos(time * p.speed * 0.7 + p.phase) * p.drift;
        const pulseOpacity = 0.15 + Math.sin(time * p.speed * 1.5 + p.phase) * 0.1;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: p.x + xOffset,
              top: p.y + yOffset,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: color,
              opacity: pulseOpacity,
              boxShadow: `0 0 ${p.size * 3}px ${color}40`,
            }}
          />
        );
      })}
    </div>
  );
};
