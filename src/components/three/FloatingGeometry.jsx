import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

const shapes = [
  { pos: [-3, 0.8, -4], scale: 0.35, speed: 0.25, type: "box" },
  { pos: [3.2, -0.6, -5], scale: 0.28, speed: 0.18, type: "octahedron" },
  { pos: [-1.8, -1.2, -3], scale: 0.22, speed: 0.32, type: "tetrahedron" },
  { pos: [2, 1.2, -3.5], scale: 0.3, speed: 0.2, type: "box" },
  { pos: [-2.8, -0.3, -6], scale: 0.18, speed: 0.28, type: "octahedron" },
  { pos: [1.5, -1.5, -4.5], scale: 0.24, speed: 0.22, type: "tetrahedron" },
];

const geometries = {
  box: <boxGeometry args={[1, 1, 1]} />,
  octahedron: <octahedronGeometry args={[1]} />,
  tetrahedron: <tetrahedronGeometry args={[1]} />,
};

const Shape = ({ position, scale, speed, type }) => {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * speed;
    ref.current.rotation.z = t * speed * 0.6;
    ref.current.position.y = position[1] + Math.sin(t * 0.8 + position[0]) * 0.25;
  });

  return (
    <mesh ref={ref} position={position} scale={scale}>
      {geometries[type]}
      <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.12} />
    </mesh>
  );
};

const FloatingGeometry = ({ mouseX = 0, mouseY = 0 }) => {
  const group = useRef();

  useFrame(() => {
    if (!group.current) return;
    group.current.rotation.y += 0.001 + mouseX * 0.2;
    group.current.rotation.x = mouseY * 0.2;
  });

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <Shape key={i} {...s} />
      ))}
    </group>
  );
};

export default FloatingGeometry;
