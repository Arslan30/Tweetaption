import { Img, spring, staticFile, useCurrentFrame, interpolate } from "remotion";

export const TweetoLogo: React.FC = () => {
  const frame = useCurrentFrame();

  // Base shaking intensity
  const shakeIntensity = spring({
    fps: 30,
    frame: frame,
    config: {
        damping: 200,
        stiffness: 200,
        mass: 0.5,
    },
  });

  // Additional randomness to the shake for x and y axis
  const shakeX = interpolate(shakeIntensity, [0, 1], [0, 10]);
  const shakeY = interpolate(shakeIntensity, [0, 1], [0, 10]);

  return (
    <div style={{
      transform: `translate(${shakeX * (Math.random() > 0.5 ? -1 : 1)}px, ${shakeY * (Math.random() > 0.5 ? -1 : 1)}px)`
    }}>
      <Img src={staticFile("/logo.png")} />
    </div>
  );
}
