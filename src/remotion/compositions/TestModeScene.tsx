import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from "remotion";
import { FadeInWords } from "../library/components/text/TextAnimation";
import { Glow } from "../library/components/effects/Glow";

const TEST_EMAILS = [
  { to: "user@test.com", subject: "Welcome aboard!", status: "simulated" },
  { to: "team@test.com", subject: "Weekly report", status: "simulated" },
  { to: "admin@test.com", subject: "Password reset", status: "simulated" },
];

export const TestModeScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [0, 15], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Toggle switch animation
  const toggleProgress = interpolate(frame, [18, 35], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Panel animation
  const panelScale = spring({ frame, fps, config: { damping: 14 }, delay: 15 });
  const panelOpacity = interpolate(frame, [15, 25], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Shield badge
  const shieldScale = spring({ frame, fps, config: { damping: 10, mass: 0.6 }, delay: 100 });
  const shieldOpacity = interpolate(frame, [100, 112], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: 1000 }}>
        {/* Section label */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: labelOpacity, transform: `translateX(${labelX}px)` }}>
          <Glow color="#00A3FF" intensity={15}>
            <Img
              src="https://api.iconify.design/lucide/shield-check.svg?color=%2300A3FF&width=36"
              width={36}
              height={36}
            />
          </Glow>
          <FadeInWords
            startFrom={3}
            stagger={0.06}
            style={{ fontSize: 20, fontWeight: 600, color: "#00A3FF", letterSpacing: "0.1em", textTransform: "uppercase" as const }}
          >
            Comprehensive Test Mode
          </FadeInWords>
        </div>

        {/* Test Mode Panel */}
        <div
          style={{
            opacity: panelOpacity,
            transform: `scale(${panelScale})`,
            background: "rgba(15, 15, 25, 0.9)",
            border: "1px solid rgba(0,163,255,0.2)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,163,255,0.08)",
          }}
        >
          {/* Header with toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <span style={{ fontSize: 18, fontWeight: 600, color: "#FFFFFF" }}>Email Simulation</span>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ fontSize: 14, color: "rgba(255,255,255,0.5)" }}>Test Mode</span>
              {/* Toggle */}
              <div style={{ width: 48, height: 26, borderRadius: 13, backgroundColor: toggleProgress > 0.5 ? "#00A3FF" : "rgba(255,255,255,0.15)", position: "relative", transition: "none" }}>
                <div
                  style={{
                    position: "absolute",
                    top: 3,
                    left: 3 + toggleProgress * 22,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Email rows */}
          <div style={{ padding: "8px 0" }}>
            {TEST_EMAILS.map((email, i) => {
              const rowDelay = 40 + i * 12;
              const rowOpacity = interpolate(frame, [rowDelay, rowDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              const rowX = interpolate(frame, [rowDelay, rowDelay + 12], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

              const checkDelay = rowDelay + 15;
              const checkScale = spring({ frame, fps, config: { damping: 10 }, delay: checkDelay });

              return (
                <div
                  key={i}
                  style={{
                    opacity: rowOpacity,
                    transform: `translateX(${rowX}px)`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "16px 28px",
                    borderBottom: i < TEST_EMAILS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span style={{ fontSize: 15, color: "rgba(255,255,255,0.85)", fontFamily: "monospace" }}>{email.to}</span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{email.subject}</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, transform: `scale(${checkScale})` }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#fbbf24" }} />
                    <span style={{ fontSize: 13, color: "#fbbf24", fontWeight: 500 }}>{email.status}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div style={{ padding: "16px 28px", backgroundColor: "rgba(0,163,255,0.04)", borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <span style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
              ✓ No real emails sent · Safe for development & staging
            </span>
          </div>
        </div>

        {/* Shield badge */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div style={{ opacity: shieldOpacity, transform: `scale(${shieldScale})`, display: "flex", alignItems: "center", gap: 10, padding: "10px 24px", borderRadius: 10, backgroundColor: "rgba(0,163,255,0.1)", border: "1px solid rgba(0,163,255,0.25)" }}>
            <Img
              src="https://api.iconify.design/lucide/shield-check.svg?color=%2300A3FF&width=22"
              width={22}
              height={22}
            />
            <span style={{ color: "#00A3FF", fontSize: 15, fontWeight: 600 }}>Zero risk email testing</span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
