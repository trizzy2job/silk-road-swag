import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
export function SkyBox(props) {
    const { scene } = useThree();
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

