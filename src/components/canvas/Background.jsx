import React, { useEffect, useRef, useState } from 'react';
import { extend, useFrame, useThree } from '@react-three/fiber'
import { shaderMaterial, Backdrop } from '@react-three/drei'
import * as THREE from 'three'
import BGFragment from "../shaders/rainbow/fragment.glsl";
import BGVertex from "../shaders/rainbow/vertex.glsl";
import abstractTexture from "/3.jpg"


const BackgroundMaterial = shaderMaterial(
  {
	uTime: 0,
	lightPos: new THREE.Vector3(),
	abstractTexture: new THREE.TextureLoader().load(abstractTexture),
	cameraPosition: new THREE.Vector3(),
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

			 <backgroundMaterial
				ref={backgroundShaderMaterialRef}
				side={THREE.DoubleSide}
				lightPos={lightPos}
				/> 
			{/* <meshBasicMaterial ref={backgroundShaderMaterialRef} color="orange" position={position} /> */}
				</Backdrop>
	</group>
</group>
    
  );
};

export default Background;
