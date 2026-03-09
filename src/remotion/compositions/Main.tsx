import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, Audio, Artifact } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { GridBackground } from "../library/components/effects/GridBackground";
import { FloatingParticles } from "./FloatingParticles";
import { IntroScene } from "./IntroScene";
import { ProblemScene } from "./ProblemScene";
import { CodeIntegrationScene } from "./CodeIntegrationScene";
import { TestModeScene } from "./TestModeScene";
import { WebhookScene } from "./WebhookScene";
import { CTAScene } from "./CTAScene";

const { fontFamily } = loadInter("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const TRANSITION_DURATION = 15;

// Scene durations (in frames at 30fps)
const INTRO_DURATION = 105;
const PROBLEM_DURATION = 135;
const CODE_DURATION = 150;
const TEST_DURATION = 140;
const WEBHOOK_DURATION = 130;
const CTA_DURATION = 120;

// Total = sum of scenes - sum of transitions
// 6 scenes, 5 transitions
// 105 + 135 + 150 + 140 + 130 + 120 - (5 * 15) = 780 - 75 = 705

const SFX_WHOOSH = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773056342410_nkqql1zjr5o_sfx_Subtle_digital_whoosh_transiti.mp3";
const SFX_PING = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773056346190_c26fjagmbo_sfx_Soft_digital_notification_ping.mp3";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient background glow that slowly shifts
  const glowX = 30 + Math.sin(frame / fps * 0.3) * 20;
  const glowY = 20 + Math.cos(frame / fps * 0.25) * 15;
  const glow2X = 70 + Math.sin(frame / fps * 0.2 + 1) * 15;
  const glow2Y = 60 + Math.cos(frame / fps * 0.35 + 2) * 20;

  // Compute transition start frames for sfx
  const t1 = INTRO_DURATION - TRANSITION_DURATION;
  const t2 = t1 + PROBLEM_DURATION - TRANSITION_DURATION;
  const t3 = t2 + CODE_DURATION - TRANSITION_DURATION;
  const t4 = t3 + TEST_DURATION - TRANSITION_DURATION;
  const t5 = t4 + WEBHOOK_DURATION - TRANSITION_DURATION;

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ fontFamily, backgroundColor: "#000000" }}>
        {/* Ambient background layers */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,163,255,0.12), transparent 50%), radial-gradient(circle at ${glow2X}% ${glow2Y}%, rgba(0,80,200,0.08), transparent 45%)`,
          }}
        />

        <GridBackground
          cellSize={60}
          color="rgba(0,163,255,0.04)"
          backgroundColor="transparent"
          opacity={0.5}
          fadeEdges
          animate
          velocity={15}
          direction="up"
        />

        <FloatingParticles count={25} color="#00A3FF" seed="resend" />

        {/* Scenes with transitions */}
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={INTRO_DURATION}>
            <IntroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={PROBLEM_DURATION}>
            <ProblemScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={CODE_DURATION}>
            <CodeIntegrationScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={TEST_DURATION}>
            <TestModeScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={WEBHOOK_DURATION}>
            <WebhookScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
          />

          <TransitionSeries.Sequence durationInFrames={CTA_DURATION}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* SFX - whoosh on transitions */}
        <Sequence from={t1}>
          <Audio src={SFX_WHOOSH} volume={0.3} />
        </Sequence>
        <Sequence from={t2}>
          <Audio src={SFX_WHOOSH} volume={0.25} />
        </Sequence>
        <Sequence from={t3}>
          <Audio src={SFX_WHOOSH} volume={0.25} />
        </Sequence>
        <Sequence from={t4}>
          <Audio src={SFX_WHOOSH} volume={0.25} />
        </Sequence>
        <Sequence from={t5}>
          <Audio src={SFX_WHOOSH} volume={0.25} />
        </Sequence>

        {/* Ping on CTA */}
        <Sequence from={t5 + 40}>
          <Audio src={SFX_PING} volume={0.35} />
        </Sequence>

        {/* Subtle vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%)",
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    </>
  );
};
