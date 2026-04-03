import { spring, useCurrentFrame, interpolate } from "remotion";

export const ClosingMark: React.FC = () => {
  const frame = useCurrentFrame();

  const shakeIntensity = spring({
    fps: 30,
    frame: frame,
    config: {
        damping: 200,
        stiffness: 200,
        mass: 0.5,
    },
  });

  const shakeX = interpolate(shakeIntensity, [0, 1], [0, 10]);
  const shakeY = interpolate(shakeIntensity, [0, 1], [0, 10]);

  return (
    <div style={{
      transform: `translate(${shakeX * (Math.random() > 0.5 ? -1 : 1)}px, ${shakeY * (Math.random() > 0.5 ? -1 : 1)}px)`,
      width: "60%",
      height: "6px",
      padding: "40px 20px",
      backgroundColor: "#f59d0c",
      borderRadius: "999px",
    }}>
    </div>
  );
}
