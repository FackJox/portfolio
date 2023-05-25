import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls } from '@react-three/drei';

import Head from './head/Head'

export default function Scene() {
  return (
    <Canvas>
      <Stage>
        <PresentationControls>
        <Head />

        </PresentationControls>
      </Stage>
    </Canvas>
  );
}