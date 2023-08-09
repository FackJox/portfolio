import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import BGFragment from "../shaders/fragment.glsl";
import BGVertex from "../shaders/vertex.glsl";


const BackgroundMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),// [gl.canvas.width, gl.canvas.height]
    u_mouse: new THREE.Vector4(), 
    },
  BGVertex,
  BGFragment
)
extend({ BackgroundMaterial })


const Background = () => {
    const backgroundMaterialRef = useRef();
 

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const factor = 0.15;
    const umouse = [mousePosition.x, mousePosition.y, 0];
    const tmouse = new THREE.Vector4(umouse)
    
    tmouse[0] = tmouse[0] - (tmouse[0] - umouse[0]) * factor;
    tmouse[1] = tmouse[1] - (tmouse[1] - umouse[1]) * factor;
    tmouse[2] = mousePosition.drag ? 1 : 0;
      

    useEffect(() => {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  
    useEffect(() => {
      const handleWindowResize = () => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handleWindowResize);
  
      // Cleanup function to remove the event listener
      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, []); // Empty dependency array so the effect runs once on mount and cleans up on unmount
  
    

    let backgroundUniforms = {
      u_time: 0,
      u_mouse: tmouse,
      u_resolution: [windowSize.width, windowSize.height]
    };




  useFrame((state, delta) => {
    backgroundMaterialRef.current.u_time += delta;
    
    // console.log(maleShaderMaterialRef.current.iGlobalTime)
});


  return (
    	<mesh
					castShadow
					receiveShadow
					// material={materials.bubuaiStandardSurface1SG}
				>
        <planeGeometry args={[7, 3.94, 1, 1]} />

					<backgroundMaterial
						ref={backgroundMaterialRef}
						side={THREE.DoubleSide}
                        />
				</mesh>
    
  );
};

export default Background;
