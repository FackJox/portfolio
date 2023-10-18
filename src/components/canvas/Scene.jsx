import React, { useTransition, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stage, PresentationControls, OrbitControls, OrthographicCamera, AdaptiveDpr, Environment, AccumulativeShadows, Float, View, Center } from '@react-three/drei';
import { Perf } from 'r3f-perf';
import Head from './Head'
import Background from '../canvas/Background'

import BackgroundShaders from './BackgroundShaders'
import BackgroundPlane from './BackgroundPlane'

import { suspend } from 'suspend-react';
import useRefs from 'react-use-refs'
import warehouse from '@pmndrs/assets/hdri/warehouse.exr'

export default function Scene() {
  const [ref, view1, view2] = useRefs()
  // const [warehouse, setWarehouse] = useState(null);
  // const [isPending, startWarehouseTransition] = useTransition();

  // useEffect(() => {
  //   startWarehouseTransition(() => {
  //     setWarehouse(suspend(import('@pmndrs/assets/hdri/warehouse.exr')).default);
  //   });
  // }, [startWarehouseTransition]);

  return (

    <div ref={ref} className="container">
    <div className="view1" ref={view1} />
    <div className="view2" ref={view2} />
    <Canvas eventSource={ref} className="canvas"
       dpr={window.devicePixelRatio}
       onCreated={({ gl }) => {
         gl.setClearColor(0xFF0000, 0);
         gl.autoClear = false;
         gl.clearDepth()
       }}
       gl={{ antialias: true, alpha: true }}
       camera={{ fov: 75}}
       >
      <View index={2} track={view1}>
      <AdaptiveDpr pixelated />


        <PresentationControls
        config={{ mass: 2, tension: 500 }}
        snap={{ mass: 4, tension: 1500 }}
        rotation={[0, 0.3, 0]}
        polar={[-Math.PI / 3, Math.PI / 3]}
        // azimuth={[-Math.PI / 1.4, Math.PI / 2]}
        >
          <Float>
     
       <Center >
       <group position={[0,0,0]} rotation={[0, -45 * Math.PI * 180, 100 * Math.PI * 180]} >

      <mesh>
        <boxGeometry args={[3, 3, 3]} />
        <meshBasicMaterial color="orange" transparent opacity={0.0} />      
        </mesh>
           <Head  scale={0.028} position={[0,-0.5,0]} />

       </group>
       </Center>
          </Float>
        </PresentationControls>
        <Environment files={warehouse} />
      <Perf />
        {/* <RandomizedLight amount={4} frames={20} position={[5, 5, 10]} intensity={0.1}/> */}
      </View>



      <View index={2} track={view2}>
          {/* <color attach="background" args={['#d6edf3']} /> */}
          {/* <OrthographicCamera makeDefault position={[0, 0, 5]} zoom={80} /> */}
        
        {/* <Background scale={1000} position={[0,-150, 50]} /> */}
        <BackgroundPlane scale={0.15} position={[0,0, 0]} rotation={[0, 90 * Math.PI * 180, 90 * Math.PI * 180]} />
{/* <OrbitControls /> */}
        {/* <BackgroundPlane scale={1000} position={[0,-100, 100]} /> */}
        <ambientLight intensity={2.4} />

        </View>
    </Canvas>
    </div>
    
  );
}