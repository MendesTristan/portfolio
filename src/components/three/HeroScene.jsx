import { useRef, useMemo, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function randomInSphere(count, radius) {
  const pts = [];
  for (let i = 0; i < count; i++) {
    const r = radius * (0.4 + Math.random() * 0.6);
    const phi = Math.acos(2 * Math.random() - 1);
    const theta = Math.random() * Math.PI * 2;
    pts.push(new THREE.Vector3(
      r * Math.sin(phi) * Math.cos(theta),
      r * Math.sin(phi) * Math.sin(theta),
      r * Math.cos(phi)
    ));
  }
  return pts;
}

function buildEdges(nodes, maxDist) {
  const edges = [];
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      if (nodes[i].distanceTo(nodes[j]) < maxDist) {
        edges.push([nodes[i], nodes[j]]);
      }
    }
  }
  return edges;
}

const NeuralNodes = ({ nodes, radius }) => {
  const ref = useRef();
  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(nodes.length * 3);
    const col = new Float32Array(nodes.length * 3);
    const cyan = new THREE.Color("#c4b5fd");
    const blue = new THREE.Color("#818cf8");
    nodes.forEach((p, i) => {
      pos[i * 3] = p.x;
      pos[i * 3 + 1] = p.y;
      pos[i * 3 + 2] = p.z;
      const t = p.length() / radius;
      const c = cyan.clone().lerp(blue, t * 0.6);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    });
    return { positions: pos, colors: col };
  }, [nodes, radius]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.6 + 0.3 * Math.sin(clock.getElapsedTime() * 1.5);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={nodes.length} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={nodes.length} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        sizeAttenuation
        transparent
        opacity={0.8}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const CoreNodes = ({ nodes }) => {
  const ref = useRef();
  const { positions, colors, count } = useMemo(() => {
    const idxs = [];
    for (let i = 0; i < nodes.length; i += 3) idxs.push(i);
    const pos = new Float32Array(idxs.length * 3);
    const col = new Float32Array(idxs.length * 3);
    const white = new THREE.Color("#ede9fe");
    const cyan = new THREE.Color("#a78bfa");
    idxs.forEach((idx, i) => {
      pos[i * 3] = nodes[idx].x;
      pos[i * 3 + 1] = nodes[idx].y;
      pos[i * 3 + 2] = nodes[idx].z;
      const t = (idx / nodes.length);
      const c = white.clone().lerp(cyan, t);
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    });
    return { positions: pos, colors: col, count: idxs.length };
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.5 + 0.4 * Math.sin(clock.getElapsedTime() * 2 + 1);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={count} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.14}
        sizeAttenuation
        transparent
        opacity={0.7}
        vertexColors
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const NeuralEdges = ({ edges }) => {
  const ref = useRef();
  const geos = useMemo(() =>
    edges.map(([a, b]) => new THREE.BufferGeometry().setFromPoints([a, b])),
  [edges]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((line, i) => {
      line.material.opacity = 0.04 + 0.1 * Math.sin(t * 0.8 + i * 0.3);
    });
  });

  return (
    <group ref={ref}>
      {geos.map((g, i) => (
        <line key={i} geometry={g}>
          <lineBasicMaterial color="#7c3aed" transparent opacity={0.06} blending={THREE.AdditiveBlending} depthWrite={false} />
        </line>
      ))}
    </group>
  );
};

const DataPulses = ({ edges }) => {
  const ref = useRef();
  const count = Math.min(edges.length, 35);
  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const pulseEdges = useMemo(() => edges.slice(0, count), [edges, count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const [a, b] = pulseEdges[i];
      const speed = 0.35 + (i % 5) * 0.06;
      const progress = ((t * speed + i * 0.12) % 1);
      pos.array[i * 3] = a.x + (b.x - a.x) * progress;
      pos.array[i * 3 + 1] = a.y + (b.y - a.y) * progress;
      pos.array[i * 3 + 2] = a.z + (b.z - a.z) * progress;
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#a78bfa"
        size={0.1}
        sizeAttenuation
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const AmbientParticles = () => {
  const ref = useRef();
  const count = 2000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 70;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
    }
    return pos;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.004;
      ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.003) * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#4c1d95"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

const EnergyOrbit = ({ radius = 3.2, speed = 0.08, tilt = 0, color = "#8b5cf6", opacityBase = 0.12 }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * speed;
  });

  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 16, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacityBase} blending={THREE.AdditiveBlending} depthWrite={false} />
    </mesh>
  );
};

const RimRings = () => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.015;
  });

  return (
    <group ref={ref}>
      {[2.8, 3.2, 3.6].map((r, i) => (
        <mesh key={i} rotation={[Math.PI / 2 + i * 0.15, 0, 0]}>
          <ringGeometry args={[r - 0.003, r + 0.003, 128]} />
          <meshBasicMaterial color="#8b5cf6" transparent opacity={0.03 - i * 0.005} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} />
        </mesh>
      ))}
    </group>
  );
};

const HeroScene = ({ mouseX = 0, mouseY = 0 }) => {
  const brain = useRef();
  const R = 2.5;
  const [nodes] = useState(() => randomInSphere(130, R));
  const edges = useMemo(() => buildEdges(nodes, R * 0.62), [nodes]);

  useFrame(({ clock }) => {
    if (!brain.current) return;
    const t = clock.getElapsedTime();
    const breathe = 1 + Math.sin(t * 0.4) * 0.025;
    brain.current.scale.setScalar(breathe);
    brain.current.rotation.y = t * 0.025 + mouseX * 0.8;
    brain.current.rotation.x = Math.sin(t * 0.015) * 0.06 + mouseY * 0.8;
  });

  return (
    <>
      <AmbientParticles />
      <RimRings />
      <EnergyOrbit radius={3.0} speed={0.06} tilt={Math.PI / 4} color="#8b5cf6" opacityBase={0.1} />
      <EnergyOrbit radius={3.4} speed={-0.04} tilt={-Math.PI / 6} color="#6366f1" opacityBase={0.06} />
      <EnergyOrbit radius={3.7} speed={0.03} tilt={Math.PI / 2.5} color="#a78bfa" opacityBase={0.04} />
      <group ref={brain}>
        <NeuralNodes nodes={nodes} radius={R} />
        <CoreNodes nodes={nodes} />
        <NeuralEdges edges={edges} />
        <DataPulses edges={edges} />
      </group>
    </>
  );
};

export default HeroScene;
