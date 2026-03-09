import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from "remotion";
import { FadeInChars, FadeInWords } from "../library/components/text/TextAnimation";
import { Glow } from "../library/components/effects/Glow";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Mail icon animation
  const iconScale = spring({ frame, fps, config: { damping: 12, mass: 0.8 }, delay: 5 });
  const iconOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Logo text
  const logoOpacity = interpolate(frame, [18, 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const logoY = interpolate(frame, [18, 35], [20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Accent line
  const lineWidth = interpolate(frame, [35, 55], [0, 200], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // Tagline
  const tagOpacity = interpolate(frame, [45, 60], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tagY = interpolate(frame, [45, 60], [15, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 24 }}>
        {/* Mail Icon */}
        <Glow color="#00A3FF" intensity={25} pulsate pulseDuration={3} layers={2}>
          <div style={{ transform: `scale(${iconScale})`, opacity: iconOpacity }}>
            <Img
              src="https://api.iconify.design/lucide/mail.svg?color=%2300A3FF&width=80"
              width={80}
              height={80}
            />
          </div>
        </Glow>

        {/* Logo */}
        <div style={{ opacity: logoOpacity, transform: `translateY(${logoY}px)` }}>
          <FadeInChars
            startFrom={20}
            stagger={0.04}
            duration={0.6}
            ease="power3.out"
            style={{
              fontSize: 96,
              fontWeight: 700,
              color: "#FFFFFF",
              letterSpacing: "-0.03em",
            }}
          >
            Resend
          </FadeInChars>
        </div>

        {/* Accent line */}
        <div
          style={{
            width: lineWidth,
            height: 3,
            background: "linear-gradient(90deg, transparent, #00A3FF, transparent)",
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div style={{ opacity: tagOpacity, transform: `translateY(${tagY}px)` }}>
          <FadeInWords
            startFrom={46}
            stagger={0.08}
            duration={0.5}
            ease="power2.out"
            style={{
              fontSize: 28,
              fontWeight: 400,
              color: "rgba(255,255,255,0.7)",
              letterSpacing: "0.05em",
            }}
          >
            Email for developers
          </FadeInWords>
        </div>
      </div>
    </AbsoluteFill>
  );
};
