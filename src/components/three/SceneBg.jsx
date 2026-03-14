import { Suspense, Component } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleField from "./ParticleField";
import FloatingGeometry from "./FloatingGeometry";

class SceneErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const SceneBg = ({ mouseX = 0, mouseY = 0, variant = "particles" }) => (
  <div className="absolute inset-0 pointer-events-none opacity-35 hidden md:block">
    <SceneErrorBoundary>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 1.2]}
        gl={{ antialias: false, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          {variant === "particles" && <ParticleField mouseX={mouseX} mouseY={mouseY} />}
          {variant === "geometry" && <FloatingGeometry mouseX={mouseX} mouseY={mouseY} />}
          {variant === "both" && (
            <>
              <ParticleField count={150} mouseX={mouseX} mouseY={mouseY} />
              <FloatingGeometry mouseX={mouseX} mouseY={mouseY} />
            </>
          )}
        </Suspense>
      </Canvas>
    </SceneErrorBoundary>
  </div>
);

export default SceneBg;
