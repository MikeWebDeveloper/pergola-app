import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Loader, Bounds } from '@react-three/drei';
import PergolaModel from './PergolaModel'; // Import the new component
import { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

export default function Pergola3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null); 

  return (
    <>
      <Canvas shadows camera={{ position: [5, 5, 5], fov: 60 }}> {/* Adjusted initial camera settings */}
        <ambientLight intensity={1.5} /> {/* Increased intensity */}
        <directionalLight
          position={[10, 20, 15]}
          intensity={2.5} /* Increased intensity */
          castShadow
          shadow-mapSize-width={1024} // default
          shadow-mapSize-height={1024} // default
          shadow-camera-near={0.5} // default
          shadow-camera-far={100} // Increased far clipping plane
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <ContactShadows
          position={[0, -0.5, 0]} // Positioned below the pergola
          opacity={0.75}
          scale={10}
          blur={1.5}
          far={0.8}
        />
        <Environment preset="city" />

        <Suspense fallback={null}>
          <Bounds fit clip observe>
            <PergolaModel />
            <meshStandardMaterial color="hotpink" /> {/* Add a visible default material */}
          </Bounds>
        </Suspense>

        <OrbitControls ref={controlsRef} makeDefault />
      </Canvas>
      <Loader />
    </>
  );
} 