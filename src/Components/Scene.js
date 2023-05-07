import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei'

function Box(props) {
  return (
    <mesh {...props}>
      <boxBufferGeometry args={[props.width, props.height, props.depth]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
function Floor(props) {
    
    
    const floorRef = useRef();
  
    const { camera } = useThree();
    const move = (event) => {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObject(floorRef.current);
        if (intersects.length > 0) {
            props.updateLocation(intersects[0].point.x,intersects[0].point.z);
        }
      };
    return (
        <mesh receiveShadow rotation={[-3.1415/2, 0, 0]} position={[0, -1, 0]}
        ref={floorRef}
     
      onClick={move}
      layers={(floorRef.current && floorRef.current.layers.enable(0), [])}>
        <planeBufferGeometry attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial attach="material" color="grey"  />
      </mesh>
    );
  }


function User(props) {
const[userX, setUserX] = useState(0);
const[userZ, setUserY] = useState(0);
function handleClick(x,y){
    setUserX(x);
    setUserY(y);
}
  return (
    <>
        <Box {...props} position={[userX,0,userZ]}/>
        <Floor updateLocation={handleClick}/>
    </>
  );
}

function Scene() {
   
  return (
    <>
    <Canvas style={{ width: '100%', height: window.innerHeight - 50}} >
    
      <Box position={[-20, 0, 0]} width={10} height={10} depth={10} color={'red'} />
      <Box position={[20, 0, 0]} width={10} height={10} depth={10} color={'blue'} />
      <Box position={[0, 0, 20]} width={10} height={10} depth={10} color={'green'} />
      <Box position={[0, 0, -20]} width={10} height={10} depth={10} color={'yellow'} />
      <ambientLight />
      <OrbitControls />
    <User width={1} height={2} depth={0.5} color={'red'} />
  
    </Canvas>
   </>
  );
}

export default Scene;