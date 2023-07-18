import { OBJLoader} from 'three/examples/jsm/loaders/OBJLoader'
import camelSRS from'../assets/Camel.obj'
import {useEffect, useMemo, useState} from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'



export function Camel(props){

  const obj  = useLoader(OBJLoader, camelSRS);
  
  let onLoad = function () {
   
  };
  let onProgress = function () { console.log("onprogress")};
  let onError = function () {
    
  };
  
  const geometry = useMemo(() => {
    
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c;
        g = _c.geometry;
      }
    });
    return g;
  }, []);
 
  // I've used meshPhysicalMaterial because the texture needs lights to be seen properly.
  return (
    <mesh rotation={props.rot}name="Silk Road Swag Camel"castShadow position={props.loc}geometry={geometry} scale={[30,30,30]} >
      <meshStandardMaterial color="purple" opacity="0.9" transparent={true}/>
      
    </mesh>
  )
 }


