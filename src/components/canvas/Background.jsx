import React, { useEffect, useRef, useState } from "react";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, Backdrop, useTexture } from "@react-three/drei";
import * as THREE from "three";
import BGFragment from "../shaders/rainbow/fragment.glsl";
import BGVertex from "../shaders/rainbow/vertex.glsl";
import albedoTexture from "/cartoonrainbow/albedo.jpg";
import displacementTexture from "/cartoonrainbow/displacement.jpg";
import normalTexture from "/cartoonrainbow/normals.jpg";
import roughnessTexture from "/cartoonrainbow/roughness.jpg";

// const textureLoader = new THREE.TextureLoader();

// const BackgroundMaterial = shaderMaterial(
//   {
//     uTime: 0,
//     lightPos: new THREE.Vector3(),
//     albedoTexture: textureLoader.load(albedoTexture),
//     displacementTexture: textureLoader.load(displacementTexture),
//     normalTexture: textureLoader.load(normalTexture),
//     roughnessTexture: textureLoader.load(roughnessTexture),
//     cameraPosition: new THREE.Vector3(),
//   },
//   BGVertex,
//   BGFragment
// );
// extend({ BackgroundMaterial });

const Background = (props) => {



  const [
		albedoTexture,
		displacementTexture,
		normalTexture,
		roughnessTexture,
	] = useTexture([
		"/cartoonrainbow/albedo.jpg",
		"/cartoonrainbow/displacement.jpg",
		"/cartoonrainbow/normals.jpg",
		"/cartoonrainbow/roughness.jpg",
	]);


	// const [albedo, displacement, normal, roughness] = useTexture([
	// 	albedoTexture,
	// 	displacementTexture,
	// 	normalTexture,
	// 	roughnessTexture,
	//   ]);

	//   let a = 1.5
	//   let b = 1.5

	  


// // Set the wrapping mode and repeat amount
// albedo.wrapS = albedo.wrapT = THREE.RepeatWrapping;
// albedo.repeat.set(a, b);

// // Do the same for the other textures
// displacement.wrapS = displacement.wrapT = THREE.RepeatWrapping;
// displacement.repeat.set(a, b);

// normal.wrapS = normal.wrapT = THREE.RepeatWrapping;
// normal.repeat.set(a, b);

// roughness.wrapS = roughness.wrapT = THREE.RepeatWrapping;
// roughness.repeat.set(a, b);

  const { position, scale } = props;

  const camera = useThree((state) => state.camera);
  console.log("camera pos", camera);

  // console.log(femaleVibrantShaderMaterialRef.current)

  // const backgroundShaderMaterialRef = useRef();

  // useFrame((state, delta) => {
  //   backgroundShaderMaterialRef.current.uTime += delta;
  //   backgroundShaderMaterialRef.current.cameraPosition = camera.position;
  //   backgroundShaderMaterialRef.current.u_textCoords = new THREE.Vector2(
  //     position.x,
  //     position.y
  //   );
  // });

  // useEffect(() => {
  //   console.log(
  //     "🚀 ~ file: Background.jsx:56 ~ useFrame ~ rotation:",
  //     backgroundShaderMaterialRef.current
  //   );

  //   console.log(
  //     "🚀 ~ file: Background.jsx:56 ~ useFrame ~ position:",
  //     backgroundShaderMaterialRef.current.position
  //   );
  // }, [backgroundShaderMaterialRef.current]);

  const { lightPos } = { ...props };

  console.log(lightPos);
  console.log(props);

  return (
    <group {...props} dispose={null}>
      <group>
        {/* <Backdrop segments={100}>
          <backgroundMaterial
				ref={backgroundShaderMaterialRef}
				side={THREE.DoubleSide}
				lightPos={lightPos}
				/> 

        </Backdrop> */}

       <Backdrop segments={100}>


        
        {/* <meshStandardMaterial
  ref={backgroundShaderMaterialRef}
  map={albedo}
  displacementMap={displacement}
  normalMap={normal}
  roughnessMap={roughness}
/> */}

  <meshStandardMaterial
                map={albedoTexture}
                map-repeat={[3, 3]}
                map-wrapS={THREE.RepeatWrapping}
                map-wrapT={THREE.RepeatWrapping}
                roughnessMap={roughnessTexture}
                roughnessMap-wrapS={THREE.RepeatWrapping}
                roughnessMap-wrapT={THREE.RepeatWrapping}
                displacementMap={displacementTexture}
                displacementScale={0.03}
                displacementBias={0.03}
                displacementMap-wrapS={THREE.RepeatWrapping}
                displacementMap-wrapT={THREE.RepeatWrapping}
                normalMap={normalTexture}
                normalMap-wrapS={THREE.RepeatWrapping}
                normalMap-wrapT={THREE.RepeatWrapping}
              />
              {/* <meshStandardMaterial color="red" /> */}

{/* <meshBasicMaterial color='red' scale={1.9} position={[0,0,0]} rotation={[0,-Math.PI/2,0]} /> */}
</Backdrop>
      </group>
    </group>
  );
};

export default Background;
