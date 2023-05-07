import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { OrbitControls, Text} from '@react-three/drei'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
const ClickAnimation = (props) =>{
    return(
        <mesh
         visible
         position={[props.x, -0.95, props.z]}
         rotation={[-3.1415/2, 0, 0]}
         castShadow>
            <ringBufferGeometry args={[0.75, 1, 32]} />
            <meshBasicMaterial attach="material" color="hotpink" />
      </mesh>
    )
}
function Box(props) {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const meshRef = useRef();
    // useEffect(()=>{
    //     meshRef.current.lookAt(props.lookAt);
    // },[props.lookAt])
    
  return (
    <mesh castShadow={true} ref={meshRef} {...props} rotation={[0, props.rotation, 0]}>
      <boxBufferGeometry args={[props.width, props.height, props.depth]} />
      <meshStandardMaterial color={props.color} />
    </mesh>
  );
}
function Floor(props) {
    
    const { left, top } = props.can.current.getBoundingClientRect();
    const floorRef = useRef();
  
    const { camera } = useThree();
    const move = (event) => {
        console.log(event.point.x);
       
        props.updateLocation(event.point.x,event.point.z);

      
      };
    return (
        <mesh receiveShadow={true} rotation={[-3.1415/2, 0, 0]} position={[0, -1, 0]}
        ref={floorRef}
     
      onClick={move}
      layers={(floorRef.current && floorRef.current.layers.enable(0), [])}>
        <planeBufferGeometry receiveShadow attach="geometry" args={[1000, 1000]} />
        <meshStandardMaterial receiveShadow attach="material" color="grey"  />
      </mesh>
    );
  }


function User(props) {
// const fbx = useLoader(FBXLoader, 'assets/character.fbx');
const meshRef = useRef();
const[userX, setUserX] = useState(0);
const[userZ, setUserZ] = useState(0);
const[targetX, setTargetX] = useState(0);
const[targetZ, setTargetZ] = useState(0);
const[moving, setMoving] = useState(false);
const[facing, setFacing] = useState(3.1415/3);
function handleClick(x,z){
    // controlsRef.current.target.set(x, 0, y);
    // controlsRef.current.update();
   
    setTargetX(x);
    setTargetZ(z);
    setFacing(Math.atan((x-userX)/(z-userZ)));
    setMoving(true);
}
useFrame (({camera})=>{
    if (meshRef.current) {
        meshRef.current.lookAt(camera.position);
      }
    if(moving){
        const diffX = targetX -userX;
        const diffY = targetZ -userZ;
        var length = 10 * Math.sqrt(diffX*diffX+diffY*diffY); //calculating length
        if (length < 0.5){
            setMoving(false);
        }
        console.log(length);
       
        setUserX(userX+diffX/length);
        setUserZ(userZ+diffY/length);
        props.cameraHandler(userX+diffX/length,userZ+diffY/length);
    }
    else{
       
        console.log("arrived");
    }
})
  return (
    <>
    {/* <primitive object={fbx} /> */}
        <Box {...props} position={[userX,0,userZ]}  rotation ={facing}/>
        <Floor updateLocation={handleClick} can={props.can}/>
        <mesh ref={meshRef} position={[userX, 2, userZ]}>
            <Text
             // set the position of the text
            fontSize={1} // set the font size
            color="white" // set the color of the text
            anchorX="center" // set the horizontal alignment
            anchorY="middle" // set the vertical alignment
        >
            T-Mobile
        </Text>
      </mesh>
        {moving == true? 
        <ClickAnimation x = {targetX} z ={targetZ}/>:
        null
        }
    </>
  );
}

function Scene() {
    const cameraRef = useRef();
  const controlsRef = useRef();
    const canvasRef = useRef();

    function cameraHandle(x,z){
        controlsRef.current.target.set(x, 0.5, z);
        controlsRef.current.maxPolarAngle = Math.PI / 1.9;
        controlsRef.current.minPolarAngle =  Math.PI / 9 ;
    }
  return (
    <>
    <Canvas shadowMap shadows ref={canvasRef} style={{ width: '100%', height: window.innerHeight - 50}} >
    
      <Box position={[-20, 0, 0]} width={10} height={10} depth={10} color={'red'} rotation = {0}/>
      <Box position={[20, 0, 0]} width={10} height={10} depth={10} color={'blue'} rotation = {0}/>
      <Box position={[0, 0, 20]} width={10} height={10} depth={10} color={'green'} rotation = {0}/>
      <Box position={[0, 0, -20]} width={10} height={10} depth={10} color={'yellow'} rotation = {0}/>
      <directionalLight
      color="white"
      intensity={1.5}
      position={[15, 7, 40]}  // position the light above the scene
    
      shadow-mapSize-width={512}  // set the shadow map size
      shadow-mapSize-height={512}
    />
     <ambientLight intensity={0.05} color="white" />
      <OrbitControls ref={controlsRef} args={[cameraRef.current]} />
      <User width={1} height={2} depth={0.5} color={'red'} can={canvasRef} cameraHandler={cameraHandle}/>
  
    </Canvas>
   </>
  );
}

export default Scene;