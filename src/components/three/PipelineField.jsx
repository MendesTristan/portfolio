import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PIPE_COLORS = [
  new THREE.Color("#8b5cf6"),
  new THREE.Color("#06b6d4"),
  new THREE.Color("#10b981"),
  new THREE.Color("#f59e0b"),
  new THREE.Color("#ec4899"),
];

const PIPES = 5;

const PipelineField = ({ count = 600, mouseX = 0, mouseY = 0 }) => {
  const ref = useRef();

  const { positions, colors, speeds, baseY } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const spd = new Float32Array(count);
    const bY = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const pipe = i % PIPES;

      pos[i * 3] = (Math.random() - 0.5) * 22;
      pos[i * 3 + 1] = -3.5 + pipe * 1.7 + (Math.random() - 0.5) * 0.25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;

      const c = PIPE_COLORS[pipe];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      spd[i] = 0.015 + Math.random() * 0.04;
      bY[i] = pos[i * 3 + 1];
    }

    return { positions: pos, colors: col, speeds: spd, baseY: bY };
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const arr = ref.current.geometry.attributes.position.array;
    const t = clock.getElapsedTime();

    for (let i = 0; i < count; i++) {
      arr[i * 3] += speeds[i];
      if (arr[i * 3] > 11) arr[i * 3] = -11;
      arr[i * 3 + 1] = baseY[i] + Math.sin(t * 1.8 + i * 0.15) * 0.06;
    }

    ref.current.geometry.attributes.position.needsUpdate = true;
    ref.current.rotation.y = t * 0.004 + mouseX * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.003) * 0.02 + mouseY * 0.15;
    ref.current.material.opacity = 0.5 + 0.12 * Math.sin(t * 0.4);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        transparent
        opacity={0.55}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export default PipelineField;
