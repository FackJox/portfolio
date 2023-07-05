import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls, OrbitControls, RandomizedLight, AdaptiveDpr, Environment, AccumulativeShadows } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Head from './head/Head'
import { suspend } from 'suspend-react';
const warehouse = import('@pmndrs/assets/hdri/warehouse.exr')

export default function Scene() {
  // console.log("warehouse", warehouse)
  return (
    <Canvas  mode='concurrent' >
      <AdaptiveDpr pixelated />
      <Stage intensity={0.5} environment={null}>



        <PresentationControls>
        <Head />
        <OrbitControls />
        </PresentationControls>
        {/* <RandomizedLight amount={4} frames={20} position={[5, 5, 10]} intensity={0.1}/> */}
      <Environment files={suspend(warehouse).default} />
      </Stage> 
      <Perf />
    </Canvas>
  );
}