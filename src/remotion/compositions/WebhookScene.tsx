import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, spring, interpolate, Img, Easing } from "remotion";
import { FadeInWords } from "../library/components/text/TextAnimation";
import { Glow } from "../library/components/effects/Glow";

const EVENTS = [
  { type: "email.delivered", time: "0.23s", color: "#22c55e", icon: "✓" },
  { type: "email.opened", time: "1.47s", color: "#00A3FF", icon: "👁" },
  { type: "email.clicked", time: "3.12s", color: "#a78bfa", icon: "🔗" },
  { type: "email.bounced", time: "0.05s", color: "#ef4444", icon: "✕" },
];

export const WebhookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Section label
  const labelOpacity = interpolate(frame, [0, 12], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const labelX = interpolate(frame, [0, 15], [-30, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

  // JSON window
  const windowScale = spring({ frame, fps, config: { damping: 14 }, delay: 12 });
  const windowOpacity = interpolate(frame, [12, 22], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", gap: 48, width: 1200, alignItems: "flex-start", padding: "0 40px" }}>
        {/* Left - Event feed */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 24 }}>
          {/* Section label */}
          <div style={{ display: "flex", alignItems: "center", gap: 16, opacity: labelOpacity, transform: `translateX(${labelX}px)` }}>
            <Glow color="#00A3FF" intensity={15}>
              <Img
                src="https://api.iconify.design/lucide/webhook.svg?color=%2300A3FF&width=36"
                width={36}
                height={36}
              />
            </Glow>
            <FadeInWords
              startFrom={3}
              stagger={0.06}
              style={{ fontSize: 20, fontWeight: 600, color: "#00A3FF", letterSpacing: "0.1em", textTransform: "uppercase" as const }}
            >
              Real-Time Webhooks
            </FadeInWords>
          </div>

          {/* Event cards */}
          {EVENTS.map((event, i) => {
            const cardDelay = 25 + i * 15;
            const cardOpacity = interpolate(frame, [cardDelay, cardDelay + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
            const cardX = interpolate(frame, [cardDelay, cardDelay + 12], [-40, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.out(Easing.cubic) });

            // Ping dot
            const pingScale = interpolate(
              frame,
              [cardDelay + 5, cardDelay + 20, cardDelay + 35],
              [1, 1.8, 1],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );
            const pingOpacity = interpolate(
              frame,
              [cardDelay + 5, cardDelay + 20, cardDelay + 35],
              [0.8, 0, 0.5],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
            );

            return (
              <div
                key={i}
                style={{
                  opacity: cardOpacity,
                  transform: `translateX(${cardX}px)`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 24px",
                  borderRadius: 12,
                  backgroundColor: "rgba(15, 15, 25, 0.8)",
                  border: `1px solid ${event.color}25`,
                  boxShadow: `0 4px 20px ${event.color}10`,
                }}
              >
                {/* Ping indicator */}
                <div style={{ position: "relative", width: 12, height: 12 }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: event.color }} />
                  <div
                    style={{
                      position: "absolute",
                      inset: -4,
                      borderRadius: "50%",
                      border: `2px solid ${event.color}`,
                      transform: `scale(${pingScale})`,
                      opacity: pingOpacity,
                    }}
                  />
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{ fontSize: 16, fontWeight: 600, color: event.color, fontFamily: "monospace" }}>
                    {event.type}
                  </span>
                </div>

                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", fontFamily: "monospace" }}>
                  {event.time}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right - JSON Response */}
        <div
          style={{
            flex: 1,
            opacity: windowOpacity,
            transform: `scale(${windowScale})`,
            background: "rgba(15, 15, 25, 0.9)",
            border: "1px solid rgba(0,163,255,0.2)",
            borderRadius: 16,
            overflow: "hidden",
            boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 40px rgba(0,163,255,0.08)",
          }}
        >
          {/* Chrome */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "14px 20px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ff5f57" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#ffbd2e" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", backgroundColor: "#28ca42" }} />
            <span style={{ marginLeft: 16, fontSize: 13, color: "rgba(255,255,255,0.35)", fontFamily: "monospace" }}>webhook payload</span>
          </div>

          {/* JSON */}
          <div style={{ padding: "20px 24px", fontFamily: "monospace", fontSize: 15, lineHeight: 1.8 }}>
            {[
              { text: "{", color: "#FFFFFF", delay: 30 },
              { text: '  "type": "email.delivered",', color: "#22c55e", delay: 35 },
              { text: '  "data": {', color: "#FFFFFF", delay: 40 },
              { text: '    "email_id": "em_28dj3k",', color: "#fbbf24", delay: 45 },
              { text: '    "to": "user@gmail.com",', color: "#a3e635", delay: 50 },
              { text: '    "delivered_at": "2024-...",', color: "#c084fc", delay: 55 },
              { text: '    "status": "delivered"', color: "#22d3ee", delay: 60 },
              { text: "  }", color: "#FFFFFF", delay: 65 },
              { text: "}", color: "#FFFFFF", delay: 68 },
            ].map((line, i) => {
              const lineOpacity = interpolate(frame, [line.delay, line.delay + 8], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
              return (
                <div key={i} style={{ opacity: lineOpacity, color: line.color, whiteSpace: "pre" }}>
                  {line.text}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
