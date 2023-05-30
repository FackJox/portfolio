import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls, OrbitControls } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Head from './head/Head'

export default function Scene() {
  return (
    <Canvas>
      <Stage>
        <PresentationControls>
        <Head />
        <OrbitControls />

        </PresentationControls>
      </Stage> 
      <Perf />
    </Canvas>
  );
}