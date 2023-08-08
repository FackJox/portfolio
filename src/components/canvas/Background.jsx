import React, { useEffect, useRef } from 'react';
import { extend } from '@react-three/fiber'
import { shaderMaterial } from '@react-three/drei'
import * as THREE from 'three'
import BGFragment from "../shaders/fragment.glsl";
import BGVertex from "../shaders/vertex.glsl";


const BackgroundShaderMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),// [gl.canvas.width, gl.canvas.height]
    u_mouse: new THREE.Vector4(), 
    },
  BGVertex,
  BGFragment
)
extend({ BackgroundShaderMaterial })


const Background = () => {
    const backgroundMaterialRef = useRef();
 

    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const factor = 0.15;
    const umouse = [mousePosition.x, mousePosition.y, 0];

    useEffect(() => {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);
    

    const tmouse = new THREE.Vector4((tmouse[0] - (tmouse[0] - umouse[0]) * factor),(tmouse[1] - (tmouse[1] - umouse[1]) * factor),(mousePosition.drag ? 1 : 0))
  
  
    let backgroundUniforms = {
      u_time: time,
      u_mouse: tmouse,
      u_resolution: [gl.canvas.width, gl.canvas.height]
    };




  useFrame((state, delta) => {
    backgroundMaterialRef.current.u_time += delta;
    
    // console.log(maleShaderMaterialRef.current.iGlobalTime)
});


  return (
    <div className="h-full w-full flex items-center bg-gray-800 overflow-hidden">
    	<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_2.geometry}
					// material={materials.bubuaiStandardSurface1SG}
				>
					<backgroundMaterial
						ref={backgroundMaterialRef}
						side={THREE.DoubleSide}
						uMouse={uMouse}
                        />
				</mesh>
    
    </div>
  );
};

export default Background;
