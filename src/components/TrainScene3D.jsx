import React, { useRef, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

/* Central torus knot — the hero centerpiece */
function CentralTorus() {
    const ref = useRef();
    useFrame(({ clock }) => {
        ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.15) * 0.2;
        ref.current.rotation.y = clock.elapsedTime * 0.12;
    });
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh ref={ref}>
                <torusKnotGeometry args={[1.2, 0.35, 256, 32]} />
                <MeshDistortMaterial
                    color="#2563eb"
                    emissive="#1d4ed8"
                    emissiveIntensity={0.15}
                    roughness={0.25}
                    metalness={0.9}
                    distort={0.25}
                    speed={1.5}
                />
            </mesh>
        </Float>
    );
}

/* Orbiting shapes */
function OrbitalShape({ position, color, size, speed, geometry }) {
    const ref = useRef();
    useFrame(({ clock }) => {
        const t = clock.elapsedTime * speed;
        ref.current.rotation.x = t * 0.5;
        ref.current.rotation.z = t * 0.3;
    });

    const Geo = geometry;
    return (
        <Float speed={speed} rotationIntensity={0.6} floatIntensity={1.2}>
            <mesh ref={ref} position={position} scale={size}>
                <Geo />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={0.3}
                    metalness={0.7}
                    roughness={0.3}
                    wireframe
                />
            </mesh>
        </Float>
    );
}

/* Connection lines — represents railway network */
function NetworkLines() {
    const ref = useRef();
    const points = useMemo(() => {
        const pts = [];
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const r = 3 + Math.sin(i * 1.5) * 0.8;
            pts.push(new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle * 0.5) * 1.5, Math.sin(angle) * r));
        }
        pts.push(pts[0].clone());
        return pts;
    }, []);

    const geometry = useMemo(() => {
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [points]);

    useFrame(({ clock }) => {
        if (ref.current) {
            ref.current.rotation.y = clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={ref}>
            <line geometry={geometry}>
                <lineBasicMaterial color="#3b82f6" transparent opacity={0.15} />
            </line>
            {points.slice(0, -1).map((pt, i) => (
                <mesh key={i} position={pt} scale={0.06}>
                    <sphereGeometry args={[1, 12, 12]} />
                    <meshStandardMaterial color="#60a5fa" emissive="#3b82f6" emissiveIntensity={0.5} />
                </mesh>
            ))}
        </group>
    );
}

/* Grid floor */
function Grid() {
    return (
        <gridHelper args={[40, 40, '#1e3a8a', '#0f172a']} position={[0, -3.5, 0]} rotation={[0, 0, 0]} />
    );
}

/* Scene composition */
function Scene() {
    const shapes = [
        { position: [-3.5, 2, -2], color: '#f97316', size: 0.3, speed: 1.2, geometry: () => <dodecahedronGeometry args={[1, 0]} /> },
        { position: [3.5, -1.5, -3], color: '#3b82f6', size: 0.25, speed: 1.8, geometry: () => <icosahedronGeometry args={[1, 0]} /> },
        { position: [-2.5, -2, 1.5], color: '#10b981', size: 0.28, speed: 1.5, geometry: () => <octahedronGeometry args={[1, 0]} /> },
        { position: [4, 1.5, -1], color: '#8b5cf6', size: 0.22, speed: 2, geometry: () => <tetrahedronGeometry args={[1, 0]} /> },
        { position: [-4.5, 0.5, -4], color: '#ec4899', size: 0.2, speed: 1.3, geometry: () => <dodecahedronGeometry args={[1, 0]} /> },
        { position: [2, 3, 2], color: '#06b6d4', size: 0.18, speed: 1.7, geometry: () => <icosahedronGeometry args={[1, 0]} /> },
    ];

    return (
        <>
            <fog attach="fog" args={['#020617', 6, 22]} />
            <ambientLight intensity={0.15} />
            <pointLight position={[5, 5, 5]} intensity={0.6} color="#3b82f6" distance={20} />
            <pointLight position={[-5, -3, -5]} intensity={0.3} color="#f97316" distance={15} />
            <pointLight position={[0, 5, -3]} intensity={0.2} color="#8b5cf6" distance={12} />

            <CentralTorus />
            <NetworkLines />

            {shapes.map((s, i) => (
                <OrbitalShape key={i} position={s.position} color={s.color} size={s.size} speed={s.speed} geometry={s.geometry} />
            ))}

            <Stars radius={80} depth={60} count={1500} factor={3} saturation={0.1} fade speed={0.8} />
            <Grid />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.4}
                maxPolarAngle={Math.PI / 2.2}
                minPolarAngle={Math.PI / 4}
            />
        </>
    );
}

/* Exported canvas component */
export default function TrainScene3D() {
    return (
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
            <Canvas
                camera={{ position: [0, 1, 8], fov: 55 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <Scene />
                </Suspense>
            </Canvas>
        </div>
    );
}
