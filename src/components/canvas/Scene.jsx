import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls, OrbitControls, RandomizedLight, AdaptiveDpr } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Head from './head/Head'

export default function Scene() {
  return (
    <Canvas  mode='concurrent' >
      <AdaptiveDpr pixelated />
      <Stage intensity={0.0} >
        <PresentationControls>
        <Head />
        <OrbitControls />

        </PresentationControls>
        <RandomizedLight amount={4} frames={20} position={[5, 5, 10]} />
      </Stage> 
      <Perf />
    </Canvas>
  );
}