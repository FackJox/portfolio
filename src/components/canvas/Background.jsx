import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial, Backdrop } from '@react-three/drei'
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


const Background = (props) => {
	const { position, scale } = props
	
	const camera = useThree((state) => state.camera);
	console.log("camera pos", camera);


		// console.log(femaleVibrantShaderMaterialRef.current)

		const backgroundShaderMaterialRef = useRef();


	useFrame((state, delta) => {
		backgroundShaderMaterialRef.current.uTime += delta;
		backgroundShaderMaterialRef.current.cameraPosition = camera.position;
	});

	useEffect(() => {
		console.log("🚀 ~ file: Background.jsx:56 ~ useFrame ~ rotation:", backgroundShaderMaterialRef.current)

		console.log("🚀 ~ file: Background.jsx:56 ~ useFrame ~ position:", backgroundShaderMaterialRef.current.position)
	},[backgroundShaderMaterialRef.current])
	const {lightPos}  = {...props}

	console.log(lightPos)
	console.log(props)


  return (
	<group
	{...props}
	dispose={null}
>
	<group
	
	>
	
		
		<Backdrop>

			 {/* <backgroundShaderMaterial
				ref={backgroundShaderMaterialRef}
				side={THREE.DoubleSide}
				lightPos={lightPos}
				/>  */}
			<meshBasicMaterial ref={backgroundShaderMaterialRef} color="orange" position={position} />
				</Backdrop>
	</group>
</group>
    
  );
};

export default Background;
