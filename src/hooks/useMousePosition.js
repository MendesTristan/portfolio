import { useState, useEffect } from "react";

export default function useMousePosition(sensitivity = 0.02) {
  const [pos, setPos] = useState({ x: 0, y: 0, cx: 0, cy: 0 });

  useEffect(() => {
    const onMove = (e) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * sensitivity,
        y: (e.clientY / window.innerHeight - 0.5) * sensitivity,
        cx: e.clientX,
        cy: e.clientY,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [sensitivity]);

  return pos;
}
