import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Easing } from "remotion";
import { FadeInWords } from "../library/components/text/TextAnimation";

export const ProblemScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Element opacity
  const iconOpacity = interpolate(frame, [5, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  // Strike-through animation on "spam folders"
  const strikeWidth = interpolate(frame, [70, 90], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });

  // Redirect arrow
  const arrowOpacity = interpolate(frame, [85, 95], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const arrowX = interpolate(frame, [85, 100], [-20, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // "inbox" highlight
  const inboxOpacity = interpolate(frame, [90, 105], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const inboxScale = spring({ frame, fps, config: { damping: 10, mass: 0.6 }, delay: 92 });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 40, maxWidth: 1200, padding: "0 100px" }}>
        {/* Main headline - single line to prevent word break */}
        <FadeInWords
          startFrom={8}
          stagger={0.07}
          duration={0.6}
          ease="power3.out"
          style={{
            fontSize: 58,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.25,
            whiteSpace: "nowrap",
          }}
        >
          Your emails deserve to reach humans
        </FadeInWords>

        {/* Spam vs Inbox */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, marginTop: 16 }}>
          {/* Spam - crossed out */}
          <div style={{ position: "relative", opacity: iconOpacity }}>
            <span style={{ fontSize: 38, fontWeight: 600, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
              spam folders
            </span>
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: 0,
                width: `${strikeWidth}%`,
                height: 3,
                backgroundColor: "#ef4444",
                transform: "translateY(-50%)",
                boxShadow: "0 0 12px rgba(239,68,68,0.5)",
              }}
            />
          </div>

          {/* Arrow */}
          <div style={{ opacity: arrowOpacity, transform: `translateX(${arrowX}px)`, fontSize: 36, color: "#00A3FF" }}>
            →
          </div>

          {/* Inbox - highlighted */}
          <div style={{ opacity: inboxOpacity, transform: `scale(${inboxScale})` }}>
            <span
              style={{
                fontSize: 38,
                fontWeight: 700,
                color: "#00A3FF",
                fontFamily: "monospace",
                textShadow: "0 0 30px rgba(0,163,255,0.5), 0 0 60px rgba(0,163,255,0.2)",
              }}
            >
              the inbox
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
