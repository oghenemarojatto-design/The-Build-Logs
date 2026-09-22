import { Line } from "@react-three/drei";
import { useMemo } from "react";

export default function Connections() {
  const lines = useMemo(() => {
    const result: {
      start: [number, number, number];
      end: [number, number, number];
    }[] = [];

    for (let i = 0; i < 180; i++) {
      const theta1 = Math.random() * Math.PI * 2;
      const phi1 = Math.random() * Math.PI;

      const theta2 = theta1 + (Math.random() - 0.5) * 0.35;
      const phi2 = phi1 + (Math.random() - 0.5) * 0.35;

      const r = 1.23;

      const start: [number, number, number] = [
        r * Math.sin(phi1) * Math.cos(theta1),
        r * Math.cos(phi1),
        r * Math.sin(phi1) * Math.sin(theta1),
      ];

      const end: [number, number, number] = [
        r * Math.sin(phi2) * Math.cos(theta2),
        r * Math.cos(phi2),
        r * Math.sin(phi2) * Math.sin(theta2),
      ];

      result.push({ start, end });
    }

    return result;
  }, []);

  return (
    <>
      {lines.map((line, index) => (
        <Line
          key={index}
          points={[line.start, line.end]}
          color="#60a5fa"
          lineWidth={0.4}
          transparent
          opacity={0.55}
        />
      ))}
    </>
  );
}