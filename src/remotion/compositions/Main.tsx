import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, Audio, Artifact } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { loadFont as loadInter } from "@remotion/google-fonts/Inter";
import { GridBackground } from "../library/components/effects/GridBackground";
import { blurDissolve } from "../library/components/layout/transitions/presentations/blurDissolve";
import { flashBlack } from "../library/components/layout/transitions/presentations/flashBlack";
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

const T_DUR = 18; // transition frames

// Scene durations
const INTRO = 110;
const PROBLEM = 135;
const CODE = 155;
const TEST = 145;
const WEBHOOK = 135;
const CTA = 125;

// Total = sum scenes - sum transitions
// 6 scenes, 5 transitions of 18 frames each
// 110+135+155+145+135+125 - 5*18 = 805 - 90 = 715

const SFX_WHOOSH = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773056342410_nkqql1zjr5o_sfx_Subtle_digital_whoosh_transiti.mp3";
const SFX_PING = "https://pub-e3bfc0083b0644b296a7080b21024c5f.r2.dev/sfx/1773056346190_c26fjagmbo_sfx_Soft_digital_notification_ping.mp3";

export const Main: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Ambient background glow that slowly drifts
  const glowX = 30 + Math.sin(frame / fps * 0.3) * 20;
  const glowY = 20 + Math.cos(frame / fps * 0.25) * 15;
  const glow2X = 70 + Math.sin(frame / fps * 0.2 + 1) * 15;
  const glow2Y = 60 + Math.cos(frame / fps * 0.35 + 2) * 20;

  // SFX timing: approximate transition start frames
  const t1 = INTRO - T_DUR;
  const t2 = t1 + PROBLEM - T_DUR;
  const t3 = t2 + CODE - T_DUR;
  const t4 = t3 + TEST - T_DUR;
  const t5 = t4 + WEBHOOK - T_DUR;

  return (
    <>
      {frame === 0 && (
        <Artifact content={Artifact.Thumbnail} filename="thumbnail.jpeg" />
      )}
      <AbsoluteFill style={{ fontFamily, backgroundColor: "#000000" }}>
        {/* Ambient moving glow */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(0,163,255,0.12), transparent 50%), radial-gradient(circle at ${glow2X}% ${glow2Y}%, rgba(0,80,200,0.08), transparent 45%)`,
          }}
        />

        {/* Subtle grid */}
        <GridBackground
          cellSize={60}
          color="rgba(0,163,255,0.035)"
          backgroundColor="transparent"
          opacity={0.45}
          fadeEdges
          animate
          velocity={12}
          direction="up"
        />

        {/* Floating particles */}
        <FloatingParticles count={22} color="#00A3FF" seed="resend" />

        {/* Scenes with varied transitions */}
        <TransitionSeries>
          <TransitionSeries.Sequence durationInFrames={INTRO}>
            <IntroScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          <TransitionSeries.Sequence durationInFrames={PROBLEM}>
            <ProblemScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={flashBlack()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          <TransitionSeries.Sequence durationInFrames={CODE}>
            <CodeIntegrationScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={slide({ direction: "from-right" })}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          <TransitionSeries.Sequence durationInFrames={TEST}>
            <TestModeScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={blurDissolve()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          <TransitionSeries.Sequence durationInFrames={WEBHOOK}>
            <WebhookScene />
          </TransitionSeries.Sequence>

          <TransitionSeries.Transition
            presentation={fade()}
            timing={linearTiming({ durationInFrames: T_DUR })}
          />

          <TransitionSeries.Sequence durationInFrames={CTA}>
            <CTAScene />
          </TransitionSeries.Sequence>
        </TransitionSeries>

        {/* SFX - whoosh on transitions */}
        <Sequence from={t1}>
          <Audio src={SFX_WHOOSH} volume={0.25} />
        </Sequence>
        <Sequence from={t2}>
          <Audio src={SFX_WHOOSH} volume={0.2} />
        </Sequence>
        <Sequence from={t3}>
          <Audio src={SFX_WHOOSH} volume={0.2} />
        </Sequence>
        <Sequence from={t4}>
          <Audio src={SFX_WHOOSH} volume={0.2} />
        </Sequence>
        <Sequence from={t5}>
          <Audio src={SFX_WHOOSH} volume={0.2} />
        </Sequence>

        {/* Ping on CTA button appear */}
        <Sequence from={t5 + 45}>
          <Audio src={SFX_PING} volume={0.3} />
        </Sequence>

        {/* Vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.55) 100%)",
            pointerEvents: "none",
          }}
        />
      </AbsoluteFill>
    </>
  );
};
