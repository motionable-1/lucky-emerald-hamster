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
  const ctaOpacity = interpolate(frame, [15, 28], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const ctaY = interpolate(frame, [15, 30], [25, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Button
  const btnScale = spring({ frame, fps, config: { damping: 12, mass: 0.7 }, delay: 40 });
  const btnOpacity = interpolate(frame, [40, 50], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // URL
  const urlOpacity = interpolate(frame, [55, 70], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Subtle button glow pulse
  const glowPulse = Math.sin(frame / fps * 2) * 0.3 + 0.7;

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
        {/* Mail icon */}
        <Glow color="#00A3FF" intensity={30} pulsate pulseDuration={2.5} layers={2}>
          <div style={{ transform: `scale(${iconScale})`, opacity: iconOpacity }}>
            <Img
              src="https://api.iconify.design/lucide/mail.svg?color=%2300A3FF&width=64"
              width={64}
              height={64}
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
              fontSize: 72,
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
            padding: "18px 48px",
            borderRadius: 12,
            background: "linear-gradient(135deg, #00A3FF, #0070CC)",
            boxShadow: `0 8px 32px rgba(0,163,255,${0.3 * glowPulse}), 0 0 60px rgba(0,163,255,${0.15 * glowPulse})`,
            cursor: "pointer",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
            Get your API key →
          </span>
        </div>

        {/* URL */}
        <div style={{ opacity: urlOpacity }}>
          <FadeInWords
            startFrom={56}
            stagger={0.06}
            style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}
          >
            resend.com/signup
          </FadeInWords>
        </div>
      </div>
    </AbsoluteFill>
  );
};
