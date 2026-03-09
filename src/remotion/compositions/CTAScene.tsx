import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from "remotion";
import { FadeInChars, FadeInWords } from "../library/components/text/TextAnimation";
import { Glow } from "../library/components/effects/Glow";

export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo icon
  const iconScale = spring({ frame, fps, config: { damping: 12, mass: 0.8 }, delay: 5 });
  const iconOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // CTA text
  const ctaY = interpolate(frame, [15, 30], [30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ctaOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Button
  const btnScale = spring({ frame, fps, config: { damping: 12, mass: 0.7 }, delay: 40 });
  const btnOpacity = interpolate(frame, [40, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // URL
  const urlOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Decorative feature pills
  const pillBaseDelay = 65;

  // Subtle glow animation
  const glowPulse = Math.sin(frame / fps * 2) * 0.3 + 0.7;

  // Ambient ring
  const ringScale = interpolate(frame, [8, 40], [0.6, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });
  const ringOpacity = interpolate(frame, [8, 25], [0, 0.15], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      {/* Ambient ring behind content */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          border: "1px solid rgba(0,163,255,0.15)",
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
          boxShadow: "0 0 80px rgba(0,163,255,0.08), inset 0 0 80px rgba(0,163,255,0.04)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32, position: "relative" }}>
        {/* Mail icon */}
        <Glow color="#00A3FF" intensity={35} pulsate pulseDuration={2.5} layers={3}>
          <div style={{ transform: `scale(${iconScale})`, opacity: iconOpacity }}>
            <Img
              src="https://api.iconify.design/lucide/mail.svg?color=%2300A3FF&width=72"
              width={72}
              height={72}
            />
          </div>
        </Glow>

        {/* Headline */}
        <div style={{ opacity: ctaOpacity, transform: `translateY(${ctaY}px)` }}>
          <FadeInChars
            startFrom={18}
            stagger={0.03}
            duration={0.5}
            ease="power3.out"
            style={{
              fontSize: 76,
              fontWeight: 700,
              color: "#FFFFFF",
              textAlign: "center",
              letterSpacing: "-0.02em",
            }}
          >
            Start sending today
          </FadeInChars>
        </div>

        {/* Button */}
        <div
          style={{
            opacity: btnOpacity,
            transform: `scale(${btnScale})`,
            padding: "20px 56px",
            borderRadius: 14,
            background: "linear-gradient(135deg, #00A3FF, #0070CC)",
            boxShadow: `0 10px 40px rgba(0,163,255,${0.35 * glowPulse}), 0 0 80px rgba(0,163,255,${0.12 * glowPulse}), inset 0 1px 0 rgba(255,255,255,0.15)`,
          }}
        >
          <span style={{ fontSize: 24, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
            Get your API key →
          </span>
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
          {["99.9% Deliverability", "Free Tier", "No Credit Card"].map((pill, i) => {
            const pillDelay = pillBaseDelay + i * 6;
            const pillScale = spring({ frame, fps, config: { damping: 13 }, delay: pillDelay });
            const pillOpacity = interpolate(frame, [pillDelay, pillDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            return (
              <div
                key={pill}
                style={{
                  opacity: pillOpacity,
                  transform: `scale(${pillScale})`,
                  padding: "8px 20px",
                  borderRadius: 20,
                  backgroundColor: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>{pill}</span>
              </div>
            );
          })}
        </div>

        {/* URL */}
        <div style={{ opacity: urlOpacity, marginTop: 4 }}>
          <FadeInWords
            startFrom={56}
            stagger={0.06}
            style={{ fontSize: 20, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}
          >
            resend.com/signup
          </FadeInWords>
        </div>
      </div>
    </AbsoluteFill>
  );
};
