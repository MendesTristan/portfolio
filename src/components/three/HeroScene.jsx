import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── Neural Network: nodes in 3D space connected by glowing edges ── */

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

/* ── Glowing Nodes ── */
const NeuralNodes = ({ nodes }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const a = new Float32Array(nodes.length * 3);
    nodes.forEach((p, i) => { a[i * 3] = p.x; a[i * 3 + 1] = p.y; a[i * 3 + 2] = p.z; });
    return a;
  }, [nodes]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const mat = ref.current.material;
    mat.opacity = 0.6 + 0.3 * Math.sin(clock.getElapsedTime() * 1.5);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={nodes.length} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#c4b5fd"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Bright core nodes (larger, fewer) ── */
const CoreNodes = ({ nodes }) => {
  const ref = useRef();
  const coreIdxs = useMemo(() => {
    const idxs = [];
    for (let i = 0; i < nodes.length; i += 4) idxs.push(i);
    return idxs;
  }, [nodes]);

  const positions = useMemo(() => {
    const a = new Float32Array(coreIdxs.length * 3);
    coreIdxs.forEach((idx, i) => {
      a[i * 3] = nodes[idx].x;
      a[i * 3 + 1] = nodes[idx].y;
      a[i * 3 + 2] = nodes[idx].z;
    });
    return a;
  }, [nodes, coreIdxs]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.material.opacity = 0.5 + 0.4 * Math.sin(clock.getElapsedTime() * 2 + 1);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={coreIdxs.length} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#ddd6fe"
        size={0.12}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Animated Edges with pulsing opacity ── */
const NeuralEdges = ({ edges }) => {
  const ref = useRef();

  const geos = useMemo(() =>
    edges.map(([a, b]) => new THREE.BufferGeometry().setFromPoints([a, b])),
  [edges]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.children.forEach((line, i) => {
      line.material.opacity = 0.04 + 0.08 * Math.sin(t * 0.8 + i * 0.3);
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

/* ── Data stream: traveling pulses along edges ── */
const DataPulses = ({ edges }) => {
  const ref = useRef();
  const count = Math.min(edges.length, 20);

  const positions = useMemo(() => new Float32Array(count * 3), [count]);
  const pulseEdges = useMemo(() => edges.slice(0, count), [edges, count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    const pos = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const [a, b] = pulseEdges[i];
      const progress = ((t * 0.4 + i * 0.15) % 1);
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
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Ambient floating particles (depth) ── */
const AmbientParticles = () => {
  const ref = useRef();
  const count = 1500;
  const positions = useMemo(() => {
    const a = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      a[i * 3] = (Math.random() - 0.5) * 60;
      a[i * 3 + 1] = (Math.random() - 0.5) * 40;
      a[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return a;
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.005;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        color="#6d28d9"
        size={0.02}
        sizeAttenuation
        transparent
        opacity={0.35}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

/* ── Rim light rings ── */
const RimRings = () => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * 0.02;
    }
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

/* ── Main Scene ── */
const HeroScene = ({ mouseX = 0, mouseY = 0 }) => {
  const brain = useRef();
  const R = 2.5;

  const nodes = useMemo(() => randomInSphere(90, R), []);
  const edges = useMemo(() => buildEdges(nodes, R * 0.65), [nodes]);

  useFrame(({ clock }) => {
    if (!brain.current) return;
    const t = clock.getElapsedTime();
    brain.current.rotation.y = t * 0.03 + mouseX * 0.8;
    brain.current.rotation.x = Math.sin(t * 0.015) * 0.06 + mouseY * 0.8;
  });

  return (
    <>
      <AmbientParticles />
      <RimRings />

      <group ref={brain}>
        <NeuralNodes nodes={nodes} />
        <CoreNodes nodes={nodes} />
        <NeuralEdges edges={edges} />
        <DataPulses edges={edges} />
      </group>
    </>
  );
};

export default HeroScene;
