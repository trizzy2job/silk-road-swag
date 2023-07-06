import { useThree } from '@react-three/fiber';
import  { useRef } from 'react';
import * as THREE from 'three';
import stage from '../assets/Stage.obj';
import { useLoader } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';

import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import camel from '../assets/camel.fbx';
import palmtree from '../assets/palmtree.fbx';

export function Floor(props) {
  const floorRef = useRef();
  const move = (event) => {
    props.updateLocation(event.point.x, event.point.z);
  };

  return (
    <mesh
      receiveShadow={true}
      rotation={[-3.1415/2, 0, 0]}
      position={[0, -1, 0]}
      ref={floorRef}
      onClick={move}
      layers={(floorRef.current && floorRef.current.layers.enable(0), [])}
    >
      <planeBufferGeometry receiveShadow attach="geometry" args={[1000, 1000]} />
      <meshStandardMaterial receiveShadow attach="material" color="black"  />
    </mesh>
  );
}
export function SkyBox(props) {
    const { scene } = useThree();
    const loader2 = new OBJLoader();
    const loader3 = new FBXLoader();

    loader3.load(
      camel,
      function ( object ) {
        object.scale.set(0.005, 0.005, 0.005);
        object.position.set(-12, -1.05, 3.05);

        scene.add( object );}
    )
    loader3.load(
      palmtree,
      function ( object ) {
        object.scale.set(0.005, 0.005, 0.005);
        object.position.set(5, -1, 0.05);

        scene.add( object );}
    )

    loader2.load(
      // resource URL
      stage,
      // called when resource is loaded
      function ( object ) {
        object.scale.set(0.05, 0.05, 0.05);
        object.position.set(-20, -1, 0.05);

        scene.add( object );
    
      },
      // called when loading is in progresses
      function ( xhr ) {
    
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
    
      },
      // called when loading has errors
      function ( error ) {
    
        console.log( 'An error happened' );
    
      }
    );
    const loader = new THREE.CubeTextureLoader();
    // The CubeTextureLoader load method takes an array of urls representing all 6 sides of the cube.
    const texture = loader.load(props.urls);
  
    // Set the scene background property to the resulting texture.
    scene.background = texture;
    return null;
  }
  
  export function Box(props) {
    return (
      <mesh castShadow={true} {...props} rotation={[0, props.rotation, 0]}>
        <boxBufferGeometry args={[props.width, props.height, props.depth]} />
        <meshStandardMaterial color={props.color} />
      </mesh>
    );
  }
  export function Camel(props) {
    const { scene } = useThree();

    const camelModel = useLoader(FBXLoader, camel);
    camelModel.position.set(props.position)
    camelModel.rotation.set(props.rotation)
    camelModel.scale.set(props.scale)
    scene.add(camelModel)
  
    return (
null    );
  }
  
  export function PalmTree(props) {
    const palmTreeModel = useLoader(FBXLoader, palmtree);
  
    return (
      <primitive object={palmTreeModel} castShadow={true} receiveShadow={true} {...props} />
    );
  }
  export const ClickAnimation = (props) => {
    return (
      <mesh visible position={[props.x, -0.95, props.z]} rotation={[-3.1415 / 2, 0, 0]} castShadow>
        <ringBufferGeometry args={[0.75, 1, 32]} />
        <meshBasicMaterial attach="material" color="hotpink" />
      </mesh>
    );
  };

