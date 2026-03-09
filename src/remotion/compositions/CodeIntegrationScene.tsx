import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from "remotion";
import { FadeInWords } from "../library/components/text/TextAnimation";
import { Glow } from "../library/components/effects/Glow";

const CODE_LINES = [
  { text: "import { Resend } from 'resend';", color: "#c084fc" },
  { text: "", color: "" },
  { text: "const resend = new Resend('re_123...');", color: "#FFFFFF" },
  { text: "", color: "" },
  { text: "await resend.emails.send({", color: "#22d3ee" },
  { text: "  from: 'hello@yourdomain.com',", color: "#a3e635" },
  { text: "  to: 'user@gmail.com',", color: "#a3e635" },
  { text: "  subject: 'Welcome!',", color: "#fbbf24" },
  { text: "  html: '<h1>Hello World</h1>'", color: "#fbbf24" },
  { text: "});", color: "#22d3ee" },
];

export const CodeIntegrationScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [0, 15], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Code window
  const windowScale = spring({ frame, fps, config: { damping: 15, mass: 0.8 }, delay: 10 });
  const windowOpacity = interpolate(frame, [10, 20], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Language tabs
  const tabsOpacity = interpolate(frame, [100, 115], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Success badge
  const badgeScale = spring({ frame, fps, config: { damping: 10, mass: 0.6 }, delay: 110 });
  const badgeOpacity = interpolate(frame, [110, 120], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 1100 }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: labelOpacity, transform: `translateX(${labelX}px)` }}>
          <Glow color="#00A3FF" intensity={15}>
            <Img
              src="https://api.iconify.design/lucide/zap.svg?color=%2300A3FF&width=36"
              width={36}
              height={36}
            />
          </Glow>
          <FadeInWords
            startFrom={3}
            stagger={0.06}
            style={{ fontSize: 20, fontWeight: 600, color: "#00A3FF", letterSpacing: "0.1em", textTransform: "uppercase" as const }}
          >
            Lightning-Fast Integration
          </FadeInWords>
        </div>

        {/* Code window */}
        <div
          style={{
            opacity: windowOpacity,
            transform: `scale(${windowScale})`,
            background: "rgba(15, 15, 25, 0.9)",
            border: "1px solid rgba(0,163,255,0.2)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,163,255,0.08)",
          }}
        >
          {/* Window chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28ca42" }} />
            <span style={{ marginLeft: 16, fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>send-email.ts</span>
          </div>

          {/* Code content */}
          <div style={{ padding: "24px 28px", fontFamily: "monospace", fontSize: 18, lineHeight: 1.8 }}>
            {CODE_LINES.map((line, i) => {
              const lineDelay = 18 + i * 5;
              const lineOpacity = interpolate(frame, [lineDelay, lineDelay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const lineX = interpolate(frame, [lineDelay, lineDelay + 10], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

              if (!line.text) return <div key={i} style={{ height: 12 }} />;

              return (
                <div
                  key={i}
                  style={{
                    opacity: lineOpacity,
                    transform: `translateX(${lineX}px)`,
                    color: line.color,
                    whiteSpace: "pre",
                  }}
                >
                  {line.text}
                </div>
              );
            })}
          </div>
        </div>

        {/* Language tabs + success */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", gap: 12, opacity: tabsOpacity }}>
            {["Node.js", "Python", "Ruby", "Go", "cURL"].map((lang, i) => {
              const tabDelay = 100 + i * 4;
              const tabScale = spring({ frame, fps, config: { damping: 12 }, delay: tabDelay });
              return (
                <div
                  key={lang}
                  style={{
                    transform: `scale(${tabScale})`,
                    padding: "8px 18px",
                    borderRadius: 8,
                    backgroundColor: i === 0 ? "rgba(0,163,255,0.2)" : "rgba(255,255,255,0.06)",
                    border: i === 0 ? "1px solid rgba(0,163,255,0.4)" : "1px solid rgba(255,255,255,0.08)",
                    color: i === 0 ? "#00A3FF" : "rgba(255,255,255,0.5)",
                    fontSize: 14,
                    fontWeight: 500,
                  }}
                >
                  {lang}
                </div>
              );
            })}
          </div>

          {/* 3 lines of code badge */}
          <div style={{ opacity: badgeOpacity, transform: `scale(${badgeScale})`, display: "flex", alignItems: "center", gap: 10, padding: "10px 20px", borderRadius: 10, backgroundColor: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.3)" }}>
            <Img
              src="https://api.iconify.design/lucide/check-circle.svg?color=%2322c55e&width=24"
              width={24}
              height={24}
            />
            <span style={{ color: "#22c55e", fontSize: 16, fontWeight: 600 }}>3 lines to send</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
