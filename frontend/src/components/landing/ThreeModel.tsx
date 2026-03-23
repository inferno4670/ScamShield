import React, { Suspense, useRef, useEffect, useState, Component, type ReactNode, type ErrorInfo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

// ─── Error Boundary ───────────────────────────────────────────────────────────
interface EBProps { fallback: ReactNode; children: ReactNode }
interface EBState { hasError: boolean }

class WebGLErrorBoundary extends Component<EBProps, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError(): EBState { return { hasError: true }; }
  componentDidCatch(err: Error, info: ErrorInfo) { console.warn('WebGL error boundary caught:', err, info); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

// ─── CSS-only Fallback (no WebGL needed) ──────────────────────────────────────
function CSSFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center relative">
      {/* Glowing orb */}
      <div className="relative w-52 h-52 sm:w-64 sm:h-64 lg:w-72 lg:h-72">
        {/* Core */}
        <div className="absolute inset-8 rounded-full bg-gradient-to-br from-accent/60 to-primary/40 animate-pulse shadow-[0_0_60px_rgba(0,255,170,0.4)]" />
        {/* Ring 1 */}
        <div className="absolute inset-0 rounded-full border-2 border-accent/30 animate-spin" style={{ animationDuration: '8s' }} />
        {/* Ring 2 */}
        <div className="absolute -inset-4 rounded-full border border-primary/20 animate-spin" style={{ animationDuration: '12s', animationDirection: 'reverse' }} />
        {/* Ring 3 */}
        <div className="absolute -inset-8 rounded-full border border-purple-500/15 animate-spin" style={{ animationDuration: '16s' }} />
        {/* Outer glow */}
        <div className="absolute -inset-12 rounded-full bg-accent/5 blur-[40px]" />
        <div className="absolute -inset-16 rounded-full bg-primary/5 blur-[60px]" />
        {/* Particles */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-accent/70 animate-ping"
            style={{
              top: `${20 + Math.sin((i / 6) * Math.PI * 2) * 40}%`,
              left: `${50 + Math.cos((i / 6) * Math.PI * 2) * 40}%`,
              animationDelay: `${i * 0.4}s`,
              animationDuration: '2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── 3D Fallback Geometry ─────────────────────────────────────────────────────
function FallbackShield({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null!);
  const coreRef = useRef<THREE.Mesh>(null!);
  const ringRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.25 + mouse.current.x * 0.4;
      groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.08 + mouse.current.y * 0.2;
    }
    if (ringRef.current) ringRef.current.rotation.z = t * 0.6;
    if (coreRef.current) {
      const s = 1 + Math.sin(t * 1.5) * 0.04;
      coreRef.current.scale.setScalar(s);
      const mat = coreRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(t * 2) * 0.2;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef}>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.7, 64, 64]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={0.7} roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh>
          <sphereGeometry args={[0.95, 32, 32]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.15} roughness={0.05} metalness={1} transparent opacity={0.18} side={THREE.BackSide} />
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <torusGeometry args={[1.5, 0.025, 16, 100]} />
          <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={0.8} roughness={0.1} metalness={0.8} />
        </mesh>
        <mesh rotation={[Math.PI / 4, Math.PI / 3, 0]}>
          <torusGeometry args={[1.8, 0.015, 16, 100]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={0.6} roughness={0.1} metalness={0.8} transparent opacity={0.7} />
        </mesh>
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          const r = 1.3;
          return (
            <mesh key={i} position={[Math.cos(angle) * r, Math.sin(angle * 0.7) * 0.4, Math.sin(angle) * r]}>
              <sphereGeometry args={[0.04, 8, 8]} />
              <meshStandardMaterial color={i % 2 === 0 ? '#00ffaa' : '#a855f7'} emissive={i % 2 === 0 ? '#00ffaa' : '#a855f7'} emissiveIntensity={1.5} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// ─── Camera Rig ───────────────────────────────────────────────────────────────
function CameraRig({ mouse }: { mouse: React.MutableRefObject<{ x: number; y: number }> }) {
  const { camera } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

// ─── WebGL Support Check ──────────────────────────────────────────────────────
function checkWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export const ThreeModel: React.FC = () => {
  const mouse = useRef({ x: 0, y: 0 });
  const [webglOk, setWebglOk] = useState(true);

  useEffect(() => {
    setWebglOk(checkWebGL());
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  if (!webglOk) return <CSSFallback />;

  return (
    <div className="w-full h-full relative">
      <WebGLErrorBoundary fallback={<CSSFallback />}>
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          onCreated={({ gl }) => {
            gl.domElement.addEventListener('webglcontextlost', (e) => {
              e.preventDefault();
              setWebglOk(false);
            });
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#ffffff" />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} color="#00ffaa" />
          <pointLight position={[2, 3, 4]} intensity={2} color="#00ffaa" distance={10} />
          <pointLight position={[-3, -2, 2]} intensity={1.5} color="#a855f7" distance={8} />

          <CameraRig mouse={mouse} />

          <Suspense fallback={null}>
            <Environment preset="city" />
            <FallbackShield mouse={mouse} />
          </Suspense>

          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} autoRotate={false} />
        </Canvas>
      </WebGLErrorBoundary>

      {/* Ambient glow behind canvas */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-accent/10 blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary/10 blur-[60px]" />
      </div>
    </div>
  );
};
