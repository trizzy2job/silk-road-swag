import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import stage from '../assets/Stage.obj';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';

export function SkyBox(props) {
    const { scene } = useThree();
    const loader2 = new OBJLoader();
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

  export const ClickAnimation = (props) => {
    return (
      <mesh visible position={[props.x, -0.95, props.z]} rotation={[-3.1415 / 2, 0, 0]} castShadow>
        <ringBufferGeometry args={[0.75, 1, 32]} />
        <meshBasicMaterial attach="material" color="hotpink" />
      </mesh>
    );
  };

